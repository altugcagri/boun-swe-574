import React, { Component } from "react";
import { Row, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageHeader from "components/partials/page-header";
import { WikiLabels } from "components/wiki";
import axios from "axios";
import toast from "toasted-notes";
import { resolveEndpoint } from "functions/helpers";
import Loading from "components/loading";
import page_banner from "assets/images/handcrafted.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import WOW from "wow.js";
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

class Glossary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topics: [],
            input: "",
            loading: true
        };
        this.loadTopicList = this.loadTopicList.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    loadTopicList() {
        let url = resolveEndpoint("getAllTopics", []);

        axios
            .get(url)
            .then(res => {
                if (this.props.user) {
                    let filteredTopics = res.data.filter(
                        obj => obj.createdBy !== this.props.user.id
                    );
                    this.setState({
                        topics: filteredTopics,
                        loading: false
                    });
                } else {
                    this.setState({
                        topics: res.data,
                        loading: false
                    });
                }
            })
            .catch(err => {
                toast.notify("Something went wrong!", {
                    position: "top-right"
                });
                console.log(err);
            });
    }

    handleSearch(e) {
        this.setState({
            input: e.target.value
        });
    }

    componentDidMount() {
        const wow = new WOW();
        let vm = this;
        wow.init();
        setTimeout(function () {
            changePage(false, "pages", vm.props.user);
        }, 300)
        vm.loadTopicList();
    }

    render() {
        const { topics, input, loading } = this.state;

        return (
            <React.Fragment>
                {loading ? (
                    <Loading />
                ) : (
                        <React.Fragment>
                            <PageHeader
                                title="Explore"
                                bg={page_banner}
                                intro="To boldly go where no man has gone before!"
                                className="bespoke-glossary-header"
                            ></PageHeader>
                            <div className=" minHeightContent bespoke-glossary-container">
                                <div className="container">
                                    <div className="row  mt-5 mb-5">
                                        <div className="col-md-12 bespoke-glossary-search">
                                            <InputGroup>
                                                <FontAwesomeIcon icon={faSearch} />
                                                <input
                                                    value={input}
                                                    placeholder="Search "
                                                    className="form-control searchInput"
                                                    type="text"
                                                    onChange={this.handleSearch}
                                                />
                                            </InputGroup>
                                        </div>
                                    </div>
                                    {topics.length === 0 && (
                                        <div className="mt-5 text-center bespoke-nothing-to-show">
                                            Nothing to show
                                    </div>
                                    )}
                                    <div className="col-md-12 mb-5">
                                        {topics
                                            .filter(
                                                topic =>
                                                    input === "" ||
                                                    topic.title
                                                        .toLowerCase()
                                                        .indexOf(input) > -1
                                            )
                                            .map((topic, topicIndex) => {
                                                return (
                                                    <Row
                                                        className="mb-3"
                                                        key={topicIndex}
                                                    >
                                                        <div
                                                            className={`card mb-5 wow fadeIn bespoke-glossary-topic-${topic.id}`}
                                                            data-wow-delay={`0.${topicIndex +
                                                                1}s`}
                                                            style={{
                                                                minWidth: "100%"
                                                            }}
                                                        >
                                                            <div className="row no-gutters ">
                                                                <div className="col-md-5">
                                                                    <div className="clear p-4">
                                                                        <img
                                                                            src={
                                                                                topic.imageUrl
                                                                            }
                                                                            className="img-fluid fullWidth mb-4"
                                                                            alt={
                                                                                topic.title
                                                                            }
                                                                            id={`${topic.id}-${topic.imageUrl}`}
                                                                        />
                                                                        <Link
                                                                            className="btn btn-orange fullWidth bespoke-link-to-topic"
                                                                            to={`/topic/preview/${topic.id}`}
                                                                        >
                                                                            Details
                                                                    </Link>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-7">
                                                                    <div className="card-body text-left">
                                                                        <h5 className="card-title text-info serif font-24 text-justify mb-1 bespoke-topic-title">
                                                                            {
                                                                                topic.title
                                                                            }{" "}
                                                                        </h5>
                                                                        <small className="text-left bespoke-topic-author">
                                                                            <strong>
                                                                                by{" "}
                                                                            </strong>{" "}
                                                                            @
                                                                            {
                                                                                this.props.user ? (
                                                                                    <Link
                                                                                        to={`/profile/${topic.createdBy}`}
                                                                                    >
                                                                                        {
                                                                                            topic.createdByName
                                                                                        }{" "}
                                                                                    </Link>
                                                                                ) : (<React.Fragment>{topic.createdByName}</React.Fragment>)
                                                                            }


                                                                        </small>
                                                                        <hr />
                                                                        <p className="card-text text-justify bespoke-topic-description">
                                                                            {
                                                                                topic.description
                                                                            }
                                                                        </p>
                                                                        <hr />
                                                                        <WikiLabels
                                                                            wikis={
                                                                                topic.wikiData
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Row>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    )}
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps)(Glossary);
