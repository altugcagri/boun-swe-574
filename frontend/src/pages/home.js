import React from "react";
import { Link } from "react-router-dom";
import { Row } from "react-bootstrap";
import { WikiLabels } from "components/wiki";
import page_banner from "assets/images/banner_1.jpg";
import activityStream from "activitystrea.ms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import axios from "axios";
import toast from "toasted-notes";

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
        //let url = resolveEndpoint('getActivities', []);

        let url = "dummy/homepage.json";

        axios
            .get(url)
            .then(res => {
                this.setState({
                    activities: res.data.activities,
                    latestTopics: res.data.latestTopics,
                    interestTopics: res.data.interestTopics,
                    continueTopic: res.data.continueTopic,
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
        this.loadHomepage();
        /* activityStream.object()
			.name('baz')
			.content(activityStream.langmap().set('en', 'bar').set('fr', 'foo'))
			.publishedNow()
			.prettyWrite((err, doc) => {
				if (err) throw err;
				console.log(doc);
			}); */

        activityStream
            .add()
            .summary("Martin added an article to his blog")
            .actor(
                activityStream
                    .person()
                    .set("name", "Martin Smith")
                    .set("url", "http://example.org/martin")
                    .image(
                        activityStream
                            .link()
                            .set("href", "http://example.org/martin/image.jpg")
                            .set("mediaType", "image/jpeg")
                    )
                    .id("http://www.test.example/martin")
            )
            .object(
                activityStream
                    .article()
                    .id("http://www.test.example/blog/abc123/xyz")
                    .set("name", "Why I love Activity Streams")
                    .set("url", "http://example.org/blog/2011/02/entry")
            )
            .set("url", "http://example.org/blog/2011/02/entry")
            .target(
                activityStream.orderedCollection().set("name", "Martin's Blog")
            )
            .publishedNow()
            .prettyWrite((err, doc) => {
                if (err) throw err;
                //console.log(doc);
            });
    }
    render() {
        let {
            activities,
            latestTopics,
            interestTopics,
            continueTopic
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
                            <div className="col-md-12 serif">
                                <h2
                                    className="serif wow fadeIn"
                                    data-wow-delay="0.2s"
                                >
                                    Tailor-made content.
                                </h2>
                                <p className="wow fadeIn" data-wow-delay="0.3s">
                                    Bespoke is an open source learning space
                                    built just for you. <br />
                                    Here, you can learn from others, and share
                                    what you know.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container bespoke-home-container">
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
                                                    className={`mb-1 wow fadeIn bespoke-latest-${idx}`}
                                                    data-wow-delay={`0.1s`}
                                                    style={{ minWidth: "100%" }}
                                                >
                                                    <div className="row no-gutters ">
                                                        <div className="col-md-4">
                                                            <div className="clear pt-4 pr-4 pl-3">
                                                                <img
                                                                    src={
                                                                        latestTopic.image
                                                                    }
                                                                    className="img-fluid fullWidth mb-4"
                                                                    alt={
                                                                        latestTopic.title
                                                                    }
                                                                    id={`${latestTopic.id}-${latestTopic.image}`}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <div className="card-body text-left">
                                                                <h5 className="card-title text-info serif font-24 text-justify mb-1">
                                                                    <Link
                                                                        to={`/topic/preview/${latestTopic.id}`}
                                                                    >
                                                                        {
                                                                            latestTopic.title
                                                                        }
                                                                    </Link>
                                                                </h5>
                                                                <small className="text-right">
                                                                    {
                                                                        latestTopic.date
                                                                    }
                                                                    <strong>
                                                                        {" "}
                                                                        - by -{" "}
                                                                    </strong>{" "}
                                                                    {
                                                                        <Link
                                                                            to={`/profile/${latestTopic.author}`}
                                                                        >
                                                                            {
                                                                                latestTopic.author
                                                                            }
                                                                        </Link>
                                                                    }
                                                                </small>
                                                                <p>
                                                                    {
                                                                        latestTopic.caption
                                                                    }
                                                                </p>
                                                                <WikiLabels
                                                                    wikis={
                                                                        latestTopic.wikis
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
                                                    className={`mb-1 wow fadeIn bespoke-latest-${idx}`}
                                                    data-wow-delay={`0.1s`}
                                                    style={{ minWidth: "100%" }}
                                                >
                                                    <div className="row no-gutters ">
                                                        <div className="col-md-4">
                                                            <div className="clear pt-4 pr-4 pl-3">
                                                                <img
                                                                    src={
                                                                        interestTopic.image
                                                                    }
                                                                    className="img-fluid fullWidth mb-4"
                                                                    alt={
                                                                        interestTopic.title
                                                                    }
                                                                    id={`${interestTopic.id}-${interestTopic.image}`}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <div className="card-body text-left">
                                                                <h5 className="card-title text-info serif font-24 text-justify mb-1">
                                                                    <Link
                                                                        to={`/topic/preview/${interestTopic.id}`}
                                                                    >
                                                                        {
                                                                            interestTopic.title
                                                                        }
                                                                    </Link>
                                                                </h5>
                                                                <small className="text-right">
                                                                    {
                                                                        interestTopic.date
                                                                    }
                                                                    <strong>
                                                                        - by -
                                                                    </strong>
                                                                    {
                                                                        <Link
                                                                            to={`/profile/${interestTopic.author}`}
                                                                        >
                                                                            {
                                                                                interestTopic.author
                                                                            }
                                                                        </Link>
                                                                    }
                                                                </small>
                                                                <p>
                                                                    {
                                                                        interestTopic.caption
                                                                    }
                                                                </p>
                                                                <WikiLabels
                                                                    wikis={
                                                                        interestTopic.wikis
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
                                    <h2 className="serif font-30">
                                        Continue learning.
                                    </h2>
                                    <hr />
                                    <div className="sidebar clear">
                                        <img
                                            src={continueTopic.image}
                                            className="img-fluid fullWidth mb-4"
                                            alt={continueTopic.title}
                                            id={`${continueTopic.id}-${continueTopic.image}`}
                                        />
                                        <h5 className="card-title text-info serif font-24 text-justify mb-1">
                                            <Link
                                                to={`/topic/preview/${continueTopic.id}`}
                                            >
                                                {continueTopic.title}{" "}
                                            </Link>
                                        </h5>
                                        <small className="text-right">
                                            {continueTopic.date}{" "}
                                            <strong>by </strong>{" "}
                                            {continueTopic.author}{" "}
                                        </small>
                                        <p>{continueTopic.caption}</p>
                                        <WikiLabels
                                            wikis={continueTopic.wikis}
                                        />
                                    </div>
                                    <div className="mt-5 bespoke-home-activities">
                                        <h2 className="serif font-30">
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
                </div>
                <div className="sectionPadding preFooter bespoke-pre-footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10 offset-md-1 text-center">
                                <h3
                                    className="serif wow fadeIn"
                                    data-wow-delay="0.7s"
                                    style={{ fontSize: "34px" }}
                                >
                                    About Bespoke
                                </h3>
                                <br />
                                <p className="wow fadeIn" data-wow-delay="0.9s">
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
