import React, { Component } from "react";
import { REQUEST_HEADERS } from "../constants";
import axios from "axios";
import toast from "toasted-notes";
import { followUser } from "util/APIUtils";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { resolveEndpoint } from "functions/helpers";
import PageHeader from "../components/PageHeader";
import { WikiLabels } from "../components/wiki";
//import { resolveEndpoint } from "../util/Helpers";
// Deps
import { connect } from "react-redux";

import Loading from "../components/loading";
import page_banner from "assets/images/my-topics.jpeg";
import WOW from "wow.js";

const mapStateToProps = state => {
    return {
        currentPage: state.generic.currentPage,
        user: state.user.user,
        unreadMessageCount: state.user.unreadMessageCount
    };
};

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: false,
            input: "",
            loading: true
        };
        this.loadProfile = this.loadProfile.bind(this);
        this.handleFollowUser = this.handleFollowUser.bind(this);
    }

    handleFollowUser() {
        const followData = {
            title: this.state.title,
            description: this.state.description,
            wikiData: this.state.selectedWikis,
            imageUrl: this.state.imageUrl
        };

        followUser(followData)
            .then(response => {
                toast.notify("You're now following this user", {
                    position: "top-right"
                });
            })
            .catch(error => {
                this.setState({ loading: false });
                toast.notify("Something went wrong!", {
                    position: "top-right"
                });
            });
    }

    loadProfile() {
        let url = resolveEndpoint("getProfile", [
            { slug1: this.props.match.params.profile }
        ]);

        axios
            .get(url, REQUEST_HEADERS)
            .then(res => {
                this.setState({
                    profile: res.data,
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
        this.loadProfile();
        const wow = new WOW();
        wow.init();
    }

    render() {
        const { profile, loading } = this.state;
        let user = this.props.user;

        return (
            <React.Fragment>
                {loading && profile ? (
                    <Loading />
                ) : (
                        <React.Fragment>
                            <PageHeader
                                title={profile.name}
                                bg={page_banner}
                                intro="Profile"
                                className="bespoke-profile-header"
                            />
                            {profile && (
                                <React.Fragment>
                                    <div className="sectionPadding minHeightContent bespoke-profile-container">
                                        <div className="container">
                                            {user && (
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <Button
                                                            onClick={
                                                                profile.currentUserIsAlreadyFollowing
                                                                    ? false
                                                                    : this
                                                                        .handleFollowUser
                                                            }
                                                            className="btn btn-success fullWidth"
                                                        >
                                                            {profile.currentUserIsAlreadyFollowing ? (
                                                                <span className="bespoke-profile-follow-btn">
                                                                    <FontAwesomeIcon
                                                                        icon={
                                                                            faCheck
                                                                        }
                                                                    />{" "}
                                                                    Your are
                                                                    following
                                                                    {profile.name}
                                                                </span>
                                                            ) : (
                                                                    <span className="bespoke-profile-follow-btn">
                                                                        <FontAwesomeIcon
                                                                            icon={
                                                                                faPlus
                                                                            }
                                                                        />{" "}
                                                                        Follow {profile.name}
                                                                    </span>
                                                                )}
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="row mt-5 bespoke-profile-topics">
                                                {profile.topics.map(
                                                    (topic, topicIndex) => {
                                                        return (
                                                            <div
                                                                className={`col-md-4 wow fadeIn bespoke-profile-topic-${topicIndex}`}
                                                                data-wow-delay={`0.${topicIndex +
                                                                    1}s`}
                                                                key={topicIndex}
                                                            >
                                                                <div
                                                                    className="card"
                                                                    style={{
                                                                        padding:
                                                                            "20px"
                                                                    }}
                                                                >
                                                                    <div className="card-bod minWiki">
                                                                        <div className="maxCaption">
                                                                            <img
                                                                                src={
                                                                                    topic.imageUrl
                                                                                }
                                                                                className="img-fluid mb-2"
                                                                                alt={
                                                                                    topic.title
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <h4 className="serif font-24 bespoke-topic-title">
                                                                            {
                                                                                topic.title
                                                                            }
                                                                        </h4>
                                                                        <div className="topicCaption bespoke-topic-caption">
                                                                            {
                                                                                topic.description
                                                                            }
                                                                        </div>
                                                                        <br />
                                                                        <WikiLabels
                                                                            wikis={
                                                                                topic.wikiData
                                                                            }
                                                                        />
                                                                        <hr />
                                                                        <Link
                                                                            className="btn btn-sm fullWidth btn-orange bespoke-topic-detail-link"
                                                                            to={`/topic/${topic.id}`}
                                                                        >
                                                                            Details
                                                                    </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    )}
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps)(Profile);
