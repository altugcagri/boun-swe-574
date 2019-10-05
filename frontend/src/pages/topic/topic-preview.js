import React, { Component } from 'react';
import { REQUEST_HEADERS } from "../constants";
import axios from "axios";
import { Row, Tab, Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import PageHeader from "../components/PageHeader";
import toast from "toasted-notes";
import { PathNavigator } from "../components/LearningPath";
import { resolveEndpoint } from "../util/Helpers";
import Loading from '../components/Loading';
import { WikiLabels } from "../components/Wiki";
import seperator from "../img/seperator.png"

class TopicPreview extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            topic: {
                contentList: []
            },
            enrolled: [],
            activeTab: '',
            resolved: false,
            loading: true
        };
        this.loadTopicById = this.loadTopicById.bind(this);
        this.getEnrolledTopicsByUserId = this.getEnrolledTopicsByUserId.bind(this);
        this.search = this.search.bind(this);
    }

    enrollUserToTopic(topicId) {

        let url = resolveEndpoint('enrollToTopic', []);
        let reqObj = {
            topicId: topicId,
            username: this.props.currentUser.username
        }

        this.setState({ loading: true })
        axios.post(url, reqObj, REQUEST_HEADERS)
            .then(res => {
                toast.notify("Enrolled successfully.", { position: "top-right" });
                this.props.history.push(`/topic/view/${topicId}`)
            }).catch(err => {
                this.setState({ loading: false })
                toast.notify("Something went wrong!", { position: "top-right" });
                console.log(err)
            });
    }

    loadTopicById() {
        let url = resolveEndpoint('getTopicById', [{ "slug1": this.props.match.params.topicId }]);

        axios.get(url, REQUEST_HEADERS)
            .then(res => {
                this.setState({
                    topic: res.data,
                    activeTab: res.data.contentList.length > 0 ? res.data.contentList[0].id : ''
                })
                this.getEnrolledTopicsByUserId();
            }).catch(err => {
                toast.notify("Something went wrong!", { position: "top-right" });
                console.log(err)
            });
    }

    getEnrolledTopicsByUserId() {
        let url = resolveEndpoint('getEnrolledTopicsByUserId', [{ "slug1": this.props.currentUser.id }]);

        axios.get(url, REQUEST_HEADERS)
            .then(res => {
                this.setState({
                    enrolled: res.data
                })
                if (this._isMounted) {
                    this.resolveEnrollment()
                }

            }).catch(err => {
                toast.notify("Something went wrong!", { position: "top-right" });
                console.log(err)
            });
    }

    componentDidMount() {
        this._isMounted = true;
        this.loadTopicById();
    }

    componentWillUnmount() {
        this._isMounted = false;

    }

    search(topicId, enrolled) {
        for (var i = 0; i < enrolled.length; i++) {
            if (enrolled[i].id === topicId) {
                return true;
            }
        }
    }

    resolveEnrollment() {
        const { topic, enrolled } = this.state;
        const result = this.search(topic.id, enrolled);
        if (result === true) {
            toast.notify("Welcome back!", { position: "top-right" });
            this.props.history.push(`/topic/view/${topic.id}`)
        }
        if (this._isMounted) {
            this.setState({
                resolved: true,
                loading: false
            })
        }

    }

    render() {

        const { topic, activeTab, resolved, loading } = this.state;

        return (

            <React.Fragment>
                {loading ? <Loading /> : (
                    <React.Fragment>
                        {resolved && (
                            <div>
                                <PageHeader title={topic.title} bg={topic.imageUrl} intro="Tip: a topic is just a start. It is in your own hands to master a topic. If you have another perspective, share it!">
                                    <Link to={`/explore`} className="breadcrumbLink">
                                        <span>Explore</span>
                                    </Link>
                                </PageHeader>

                                <div className="bg-alt sectionPadding text-left">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <h3 className="serif">About {topic.title}</h3>
                                                <p>
                                                    {topic.description}
                                                </p>
                                                <Button
                                                    className="btn btn-success btn-sm"
                                                    variant="primary"
                                                    onClick={() => this.enrollUserToTopic(topic.id)}>
                                                    <FontAwesomeIcon icon={faUserPlus} /> Enroll To This Topic
                                                </Button>

                                            </div>
                                            <div className="col-md-4" style={{ borderLeft: '1px solid #cdcdcd' }}>
                                                <h3 className="serif">Wiki</h3>
                                                <WikiLabels wikis={topic.wikiData} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-5"><img src={seperator} className="wow fadeIn" data-wow-delay="0.3s" alt="" width="100" /></div>

                                <div className="sectionPadding minHeightContent">
                                    <div className="container">
                                        <div className="row col-md-12 text-left">
                                            <h4>
                                                Learning <strong>Path</strong>
                                            </h4>
                                        </div>
                                    </div>
                                    {
                                        activeTab && (
                                            <Tab.Container id="list-group-tabs-example">
                                                <div className="container mt-5 text-left" >
                                                    <Row>
                                                        <PathNavigator contents={topic.contentList} preview={true} />
                                                    </Row>
                                                </div>
                                            </Tab.Container>
                                        )
                                    }

                                </div>
                            </div>
                        )}
                    </React.Fragment>
                )}
            </React.Fragment>
        )
    }
}

export default withRouter(TopicPreview);