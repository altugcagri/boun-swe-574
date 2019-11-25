import React, { Component } from "react";
import { REQUEST_HEADERS } from "../../constants";
import axios from "axios";
import toast from "toasted-notes";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { WikiLabels } from "../../components/wiki";
import { resolveEndpoint } from "../../util/Helpers";
import Loading from "../../components/loading";
import page_banner from "../../img/study.jpeg";
// Deps
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        currentPage: state.generic.currentPage,
        user: state.user.user,
        unreadMessageCount: state.user.unreadMessageCount
    };
};

class UserEnrolledTopicList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topics: [],
            input: "",
            loading: true
        };
        this.loadUserEnrolledTopics = this.loadUserEnrolledTopics.bind(this);
    }

    loadUserEnrolledTopics() {
        let url = resolveEndpoint("getEnrolledTopicsByUserId", [
            { slug1: this.props.user.id }
        ]);

        axios
            .get(url, REQUEST_HEADERS)
            .then(res => {
                this.setState({
                    topics: res.data,
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

    componentDidMount() {
        let vm = this;
        setTimeout(function () {
            vm.loadUserEnrolledTopics();
        }, 500);
    }

    render() {
        const { topics, loading } = this.state;

        return (
            <React.Fragment>
                {loading ? (
                    <Loading />
                ) : (
                        <React.Fragment>
                            <PageHeader
                                title="Topics I Follow"
                                bg={page_banner}
                                intro="Your own collection of interest."
                                className="bespoke-user-enrollment-header"
                            />

                            <div className="container minHeightContent bespoke-user-enrollment-container">
                                {topics.length === 0 && (
                                    <div className="mt-5 text-center">
                                        Nothing to show
                                </div>
                                )}
                                <div className="row mt-5">
                                    {topics.map((topic, topicIndex) => {
                                        return (
                                            <div
                                                className={`col-md-4 bespoke-user-enrollment-topic${topicIndex}`}
                                                key={topicIndex}
                                            >
                                                <div
                                                    className="card"
                                                    style={{ padding: "20px" }}
                                                >
                                                    <div className="card-bod minWiki">
                                                        <div className="maxCaption">
                                                            <img
                                                                src={topic.imageUrl}
                                                                className="img-fluid mb-2"
                                                                alt={topic.title}
                                                                id={`${topic.id}-${topic.imageUrl}`}
                                                            />
                                                        </div>
                                                        <h4 className="serif font-24">
                                                            {topic.title}
                                                        </h4>
                                                        <div className="topicCaption mb-3">
                                                            {topic.description}
                                                        </div>
                                                        <br />
                                                        <WikiLabels
                                                            wikis={topic.wikiData}
                                                        />
                                                        <hr />
                                                        <Link
                                                            className="btn btn-sm fullWidth btn-orange"
                                                            to={`/topic/view/${topic.id}`}
                                                        >
                                                            Details
                                                    </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </React.Fragment>
                    )}
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps)(UserEnrolledTopicList);
