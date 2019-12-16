import React from "react";
import { Link } from "react-router-dom";
import { Row } from "react-bootstrap";
import { WikiLabels } from "components/wiki";
import page_banner from "assets/images/banner_1.jpg";
import Loading from "../components/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { resolveEndpoint } from "functions/helpers";
import { REQUEST_HEADERS } from "../constants";
import axios from "axios";
import toast from "toasted-notes";
import { changePage } from "controllers/navigator"

const mapStateToProps = state => {
    return {
        currentPage: state.generic.currentPage,
        user: state.user.user,
        unreadMessageCount: state.user.unreadMessageCount
    };
};

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: [],
            latestTopics: [],
            interestTopics: [],
            continueTopic: false,
            loading: true
        };
        this.loadHomepage = this.loadHomepage.bind(this);
    }

    loadHomepage() {
        if (this.props.user) {
            let url = resolveEndpoint('getHomepage', []);

            //let url = "dummy/homepage.json";

            axios
                .get(url, REQUEST_HEADERS)
                .then(res => {
                    this.setState({
                        activities: res.data.activities,
                        latestTopics: res.data.lastAddedTopics,
                        interestTopics: res.data.recommendedTopics,
                        continueTopic: res.data.lastEnrolledTopic,
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
    }

    componentDidMount() {
        let vm = this;

        setTimeout(function () {
            changePage(false, "pages", vm.props.user);
            vm.loadHomepage();
        }, 300)
    }
    render() {
        let {
            activities,
            latestTopics,
            interestTopics,
            continueTopic,
            loading
        } = this.state;
        let user = this.props.user;
        return (
            <React.Fragment>
                <div
                    className="pageHeader bespoke-home-page-header  text-left"
                    style={{ backgroundImage: `url(${page_banner})` }}
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 serif">
                                <h2
                                    className="serif wow fadeIn bespoke-header-h2"
                                    data-wow-delay="0.2s"
                                >
                                    Tailor-made content.
                                </h2>
                                <p className="wow fadeIn bespoke-header-p" data-wow-delay="0.3s">
                                    Bespoke is an open source learning space
                                    built just for you.
                                    Here, you can learn from others, and share
                                    what you know.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    user && (
                        <div className="container bespoke-home-container">
                            {
                                loading ? (<Loading />) : (
                                    <Row>
                                        <div className="col-md-8 mt-5 mb-5">
                                            <h2 className="serif font-30 besoke-latest-header">Latest.</h2>
                                            <hr />
                                            {latestTopics &&
                                                latestTopics.map((latestTopic, idx) => {
                                                    return (
                                                        <React.Fragment key={idx}>
                                                            {" "}
                                                            <Row>
                                                                <div
                                                                    className={`mb-1 wow fadeIn bespoke-latest-${latestTopic.id}`}
                                                                    data-wow-delay={`0.1s`}
                                                                    style={{ minWidth: "100%" }}
                                                                >
                                                                    <div className="row no-gutters ">
                                                                        <div className="col-md-4">
                                                                            <div className="clear pt-4 pr-4 pl-3">
                                                                                <img
                                                                                    src={
                                                                                        latestTopic.imageUrl
                                                                                    }
                                                                                    className="img-fluid fullWidth mb-4"
                                                                                    alt={
                                                                                        latestTopic.title
                                                                                    }
                                                                                    id={`${latestTopic.id}-${latestTopic.imageUrl}`}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-8">
                                                                            <div className="card-body text-left">
                                                                                <h5 className="card-title text-info serif font-24 text-justify mb-1">
                                                                                    <Link
                                                                                        to={`/topic/preview/${latestTopic.id}`}
                                                                                        className={`bespoke-latest-title-${latestTopic.id}`}
                                                                                    >
                                                                                        {
                                                                                            latestTopic.title
                                                                                        }
                                                                                    </Link>
                                                                                </h5>
                                                                                <small className="text-right">
                                                                                    {
                                                                                        latestTopic.creationDateTime
                                                                                    }
                                                                                    <strong>
                                                                                        {" "}
                                                                                        - by -{" "}
                                                                                    </strong>{" "}
                                                                                    {
                                                                                        this.props.user ? (
                                                                                            <Link
                                                                                                to={`/profile/${latestTopic.createdBy}`}

                                                                                            >
                                                                                                {
                                                                                                    latestTopic.createdByName
                                                                                                }
                                                                                            </Link>
                                                                                        ) : (<React.Fragment>{latestTopic.createdByName}</React.Fragment>)

                                                                                    }
                                                                                </small>
                                                                                <p className={`bespoke-latest-caption${latestTopic.id}`}>
                                                                                    {
                                                                                        latestTopic.description
                                                                                    }
                                                                                </p>
                                                                                <WikiLabels
                                                                                    wikis={
                                                                                        latestTopic.wikiData
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Row>
                                                        </React.Fragment>
                                                    );
                                                })}
                                            <Link
                                                className="btn btn-orange fullWidth besoke-home-explore-button"
                                                to={`/explore`}
                                            >
                                                Explore all topics
                            </Link>
                                            <div style={{ height: "100px" }}></div>
                                            <h2 className="serif font-30 besoke-interested-header">
                                                You might be interested.
                            </h2>
                                            <hr />
                                            {interestTopics &&
                                                interestTopics.map((interestTopic, idx) => {
                                                    return (
                                                        <React.Fragment key={idx}>
                                                            {" "}
                                                            <Row>
                                                                <div
                                                                    className={`mb-1 wow fadeIn bespoke-interested-${interestTopic.id}`}
                                                                    data-wow-delay={`0.1s`}
                                                                    style={{ minWidth: "100%" }}
                                                                >
                                                                    <div className="row no-gutters ">
                                                                        <div className="col-md-4">
                                                                            <div className="clear pt-4 pr-4 pl-3">
                                                                                <img
                                                                                    src={
                                                                                        interestTopic.imageUrl
                                                                                    }
                                                                                    className="img-fluid fullWidth mb-4"
                                                                                    alt={
                                                                                        interestTopic.title
                                                                                    }
                                                                                    id={`${interestTopic.id}-${interestTopic.imageUrl}`}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-8">
                                                                            <div className="card-body text-left">
                                                                                <h5 className="card-title text-info serif font-24 text-justify mb-1">
                                                                                    <Link
                                                                                        to={`/topic/preview/${interestTopic.id}`}
                                                                                        className={`bespoke-interest-title-${interestTopic.id}`}
                                                                                    >
                                                                                        {
                                                                                            interestTopic.title
                                                                                        }
                                                                                    </Link>
                                                                                </h5>
                                                                                <small className="text-right">
                                                                                    {
                                                                                        interestTopic.creationDateTime
                                                                                    }
                                                                                    <strong>
                                                                                        - by -
                                                                    </strong>
                                                                                    {
                                                                                        this.props.user ? (
                                                                                            <Link
                                                                                                to={`/profile/${interestTopic.createdBy}`}
                                                                                            >
                                                                                                {
                                                                                                    interestTopic.createdByName
                                                                                                }
                                                                                            </Link>
                                                                                        ) : (<React.Fragment>{interestTopic.createdByName}</React.Fragment>)

                                                                                    }
                                                                                </small>
                                                                                <p className={`bespoke-interest-caption-${interestTopic.id}`}>
                                                                                    {
                                                                                        interestTopic.description
                                                                                    }
                                                                                </p>
                                                                                <WikiLabels
                                                                                    wikis={
                                                                                        interestTopic.wikiData
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Row>
                                                        </React.Fragment>
                                                    );
                                                })}
                                        </div>
                                        <div className="col-md-4 mt-5 mb-5 bespoke-home-continue">
                                            {user && continueTopic && (
                                                <React.Fragment>
                                                    <h2 className="serif font-30 bespoke-home-continue-h2">
                                                        Continue learning.
                                    </h2>
                                                    <hr />
                                                    <div className="sidebar clear">
                                                        <img
                                                            src={continueTopic.imageUrl}
                                                            className="img-fluid fullWidth mb-4"
                                                            alt={continueTopic.title}
                                                            id={`${continueTopic.id}-${continueTopic.imageUrl}`}
                                                        />
                                                        <h5 className="card-title text-info serif font-24 text-justify mb-1">
                                                            <Link
                                                                to={`/topic/preview/${continueTopic.id}`}
                                                                className={`bespoke-home-continue-title${continueTopic.id}`}
                                                            >
                                                                {continueTopic.title}{" "}
                                                            </Link>
                                                        </h5>
                                                        <small className="text-right">
                                                            {continueTopic.creationDateTime}{" "}
                                                            <strong>by </strong>{" "}
                                                            {continueTopic.createdByName}{" "}
                                                        </small>
                                                        <p className={`bespoke-home-continue-caption${continueTopic.id}`}>{continueTopic.description}</p>
                                                        <WikiLabels
                                                            wikis={continueTopic.wikiData}
                                                        />
                                                    </div>
                                                    <div className="mt-5 bespoke-home-activities">
                                                        <h2 className="serif font-30 bespoke-home-activities-title">
                                                            From your circle.
                                        </h2>
                                                        <hr />
                                                        <div className="sidebar clear">
                                                            <ul>
                                                                {activities &&
                                                                    activities.map(
                                                                        (activity, idx) => {
                                                                            return (
                                                                                <React.Fragment
                                                                                    key={idx}
                                                                                >
                                                                                    <li className={`bespoke-home-activity-${idx}`}>
                                                                                        <FontAwesomeIcon
                                                                                            icon={
                                                                                                faInfoCircle
                                                                                            }
                                                                                        />{" "}
                                                                                        <Link
                                                                                            to={
                                                                                                activity.link
                                                                                            }
                                                                                            className={`bespoke-home-activity-link-${idx}`}
                                                                                        >
                                                                                            {
                                                                                                activity.text
                                                                                            }
                                                                                        </Link>
                                                                                    </li>
                                                                                </React.Fragment>
                                                                            );
                                                                        }
                                                                    )}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            )}
                                        </div>
                                    </Row>
                                )
                            }

                        </div>
                    )
                }

                <div className="sectionPadding preFooter bespoke-pre-footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10 offset-md-1 text-center">
                                <h3
                                    className="serif wow fadeIn bespoke-pre-footer-h3"
                                    data-wow-delay="0.7s"
                                    style={{ fontSize: "34px" }}
                                >
                                    About Bespoke
                                </h3>
                                <br />
                                <p className="wow fadeIn bespoke-pre-footer-p" data-wow-delay="0.9s">
                                    Bespoke is an open source project built in
                                    Bogazici University in 2019.
                                    <br />
                                    Here in Bespoke, we believe in knowledge. We
                                    also know how frustrating it is to follow
                                    online videos, toggle between many different
                                    e-learning platforms, etc.
                                    <br />
                                    <br />
                                    That's why Bespoke is not just an e-learning
                                    platform, but a{" "}
                                    <strong>self-learning</strong> platform.
                                    <br />
                                    <br />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps)(Home);
