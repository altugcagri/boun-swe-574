import React, { Component } from "react";
import { REQUEST_HEADERS } from "../../constants";
import axios from "axios";
import toast from "toasted-notes";
import { Row, Tab, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faEdit,
    faEye,
    faCheck,
    faCogs
} from "@fortawesome/free-solid-svg-icons";
import PageHeader from "../../components/PageHeader";
import { PathNavigator, PathTabs } from "../../components/learning-path";
import { resolveEndpoint } from "../../util/Helpers";
import Loading from "../../components/loading";
import { WikiLabels } from "../../components/wiki";
import seperator from "assets/images/seperator.png";
import { changePage } from "controllers/navigator"
// Deps
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        currentPage: state.generic.currentPage,
        user: state.user.user,
        unreadMessageCount: state.user.unreadMessageCount
    };
};

class Topic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topic: {
                contentList: []
            },
            activeTab: "",
            loading: true,
            achieved: false
        };
        this.loadTopicById = this.loadTopicById.bind(this);
        this.togglePublish = this.togglePublish.bind(this);
        this.setAchieved = this.setAchieved.bind(this);
    }

    setAchieved(status) {
        this.setState({ achieved: status });
    }

    loadTopicById() {
        let url = resolveEndpoint("getTopicById", [
            { slug1: this.props.match.params.topicId }
        ]);
        axios
            .get(url, REQUEST_HEADERS)
            .then(res => {
                this.setAchieved(true);
                for (let k = 0; k < res.data.contentList.length; k++) {
                    let url = resolveEndpoint("getQuestionsByContentId", [
                        { slug1: res.data.contentList[k].id }
                    ]);

                    axios
                        .get(url, REQUEST_HEADERS)
                        .then(res => {
                            for (
                                let i = 0;
                                i < res.data.questions.length;
                                i++
                            ) {
                                if (res.data.questions[i].userAnswer === null) {
                                    this.setAchieved(false);
                                }
                            }
                            this.setState({
                                content: res.data,
                                loading: false
                            });
                        })
                        .catch(err => {
                            toast.notify("Something went wrong!", {
                                position: "top-right"
                            });
                            console.log(err);
                        });
                }
                this.setState({
                    topic: res.data,
                    activeTab:
                        res.data.contentList.length > 0
                            ? res.data.contentList[0].id
                            : "",
                    loading: false
                });
            })
            .catch(err => {
                toast.notify("Something went wrong!", {
                    position: "top-right"
                });
                console.log(err);
            });
    }

    togglePublish(topicId, publish) {
        let url = resolveEndpoint("toggleTopicPublish", []);
        let reqObj = {
            topicId: topicId,
            publish: publish
        };

        this.setState({ loading: true });

        axios
            .post(url, reqObj, REQUEST_HEADERS)
            .then(res => {
                this.setState({ loading: false });
                toast.notify("Status changed.", { position: "top-right" });
                this.loadTopicById();
            })
            .catch(err => {
                this.setState({ loading: false });
                toast.notify(
                    <span className="text-danger">
                        {err.response.data.message}
                    </span>,
                    { position: "top-right" }
                );
            });
    }

    componentDidMount() {
        let vm = this;
        vm.loadTopicById();
        setTimeout(function () {
            changePage(false, "pages", vm.props.user);
        }, 300)
    }

    render() {
        const { topic, activeTab, loading, achieved } = this.state;
        const editable = topic && topic.createdBy === this.props.user.id;
        let user = this.props.user;
        return (
            <React.Fragment>
                {loading ? (
                    <Loading />
                ) : (
                        <React.Fragment>
                            <PageHeader
                                title={topic.title}
                                bg={topic.imageUrl}
                                intro="Tip: a topic is just a start. It is in your own hands to master a topic. If you have another perspective, share it!"
                                className="bespoke-topic-header"
                            >
                                {editable ? (
                                    <Link
                                        className="breadcrumbLink bespoke-topic-breadcdumbLink"
                                        to={`/`}
                                    >
                                        <span className="bespoke-topic-breadcdumbLink-span">My Topics</span>
                                    </Link>
                                ) : (
                                        <Link
                                            to={`/explore`}
                                            className="breadcrumbLink bespoke-topic-breadcdumbLink"
                                        >
                                            <span className="bespoke-topic-breadcdumbLink-span">Explore</span>
                                        </Link>
                                    )}
                            </PageHeader>

                            <div className="bg-alt sectionPadding text-left">
                                <div className="container bespoke-topic-container">
                                    <div className="row">
                                        <div className="col-md-8 ">
                                            <h3 className="serif bespoke-topic-title">
                                                About {topic.title}
                                            </h3>
                                            {!editable && user && (
                                                <React.Fragment>
                                                    {achieved ? (
                                                        <div style={{ display: 'none' }}>
                                                            <span className="badge badge-pill badge-success font-14 bespoke-topic-status">
                                                                <FontAwesomeIcon
                                                                    icon={faCheck}
                                                                />{" "}
                                                                Completed
                                                        </span>
                                                            <br />
                                                            <br />
                                                        </div>
                                                    ) : (
                                                            <div>
                                                                <span className="badge badge-pill badge-warning font-14 bespoke-topic-status">
                                                                    <FontAwesomeIcon
                                                                        icon={faCogs}
                                                                    />{" "}
                                                                    Ongoing
                                                        </span>
                                                                <br />
                                                                <br />
                                                            </div>
                                                        )}
                                                </React.Fragment>
                                            )}
                                            <p className="bespoke-topic-description">{topic.description}</p>

                                            {editable && (
                                                <Link
                                                    className="btn btn-primary inlineBtn bespoke-topic-edit-button"
                                                    to={`/topic/${topic.id}/edit`}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faEdit}
                                                    />{" "}
                                                    Edit This Topic
                                            </Link>
                                            )}

                                            {editable && (
                                                <Button
                                                    className="btn ml-2 inlineBtn bespoke-topic-publish-button"
                                                    variant={
                                                        topic.published
                                                            ? "danger"
                                                            : "warning"
                                                    }
                                                    onClick={() =>
                                                        this.togglePublish(
                                                            topic.id,
                                                            !topic.published
                                                        )
                                                    }
                                                >
                                                    <FontAwesomeIcon icon={faEye} />{" "}
                                                    {topic.published
                                                        ? "Unpublish"
                                                        : "Publish This Topic"}
                                                </Button>
                                            )}
                                        </div>
                                        <div
                                            className="col-md-4"
                                            style={{
                                                borderLeft: "1px solid #cdcdcd"
                                            }}
                                        >
                                            <h3 className="serif bespoke-topic-button-wiki">Wiki</h3>
                                            <WikiLabels wikis={topic.wikiData} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-5">
                                <img
                                    src={seperator}
                                    className="wow fadeIn"
                                    data-wow-delay="0.3s"
                                    alt=""
                                    width="100"
                                />
                            </div>

                            <div className="sectionPadding minHeightContent bespoke-topic-learning-path">
                                <div className="container">
                                    <div className="row col-md-12 text-left">
                                        <h4 className="bespoke-topic-learning-path-title">
                                            Learning <strong>Path</strong>
                                            {editable && (
                                                <Link
                                                    className="btn btn-success btn-sm ml-2 inlineBtn bespoke-topic-learning-path-add-new"
                                                    to={`/topic/${topic.id}/content`}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faPlus}
                                                    />
                                                </Link>
                                            )}
                                        </h4>
                                    </div>
                                </div>
                                {activeTab && (
                                    <Tab.Container
                                        id="list-group-tabs-example"
                                        defaultActiveKey={activeTab}
                                    >
                                        <div className="container mt-5 text-left">
                                            <Row>
                                                <PathNavigator
                                                    contents={topic.contentList}
                                                    linkable={!editable}
                                                />
                                                {editable && (
                                                    <PathTabs
                                                        contents={topic.contentList}
                                                        editable={editable}
                                                        handleRefresh={() =>
                                                            this.loadTopicById()
                                                        }
                                                    />
                                                )}
                                            </Row>
                                        </div>
                                    </Tab.Container>
                                )}
                            </div>
                        </React.Fragment>
                    )}
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps)(Topic);
