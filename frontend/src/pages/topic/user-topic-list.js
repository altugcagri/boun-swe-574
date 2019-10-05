import React, { Component } from 'react';
import { REQUEST_HEADERS } from "../constants";
import axios from "axios";
import toast from "toasted-notes";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import PageHeader from "../components/PageHeader";
import { WikiLabels } from "../components/Wiki";
import { resolveEndpoint } from "../util/Helpers";
import Loading from '../components/Loading';
import page_banner from "../img/my-topics.jpeg"
import WOW from "wow.js";

class UserCreatedTopicList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topics: [],
            input: '',
            loading: true
        };
        this.loadUserCreatedTopics = this.loadUserCreatedTopics.bind(this);
        this.handleDeleteTopicById = this.handleDeleteTopicById.bind(this);
    }

    loadUserCreatedTopics() {
        let url = resolveEndpoint('getTopicsByUserId', [{ "slug1": this.props.currentUser.username }]);

        axios.get(url, REQUEST_HEADERS).then(res => {
            this.setState({
                topics: res.data,
                loading: false
            })
        }).catch(err => {
            toast.notify("Something went wrong!", { position: "top-right" });
            console.log(err)
        });
    }

    handleDeleteTopicById(topicIdToDelete) {
        let url = resolveEndpoint('deleteTopicById', [{ "slug1": topicIdToDelete }]);

        axios.delete(url, REQUEST_HEADERS)
            .then(res => {
                this.loadUserCreatedTopics()
            }).catch(err => {
                toast.notify("Something went wrong!", { position: "top-right" });
                console.log(err)
            });

    }

    componentDidMount() {
        this.loadUserCreatedTopics();
        const wow = new WOW();
        wow.init();
    }

    render() {

        const { topics, loading } = this.state;

        return (
            <React.Fragment>
                {loading ? <Loading /> : (
                    <React.Fragment>
                        <PageHeader title="My Topics" bg={page_banner} intro="Be the mentor you once needed. Share what's on your mind & help others to grow." />

                        <div className="sectionPadding minHeightContent">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-4">
                                        <Link to="/topic/new" className="btn btn-success fullWidth">
                                            <FontAwesomeIcon icon={faPlus} /> Create a Topic
                                        </Link>
                                    </div>
                                </div>

                                <div className="row mt-5">
                                    {
                                        topics.map((topic, topicIndex) => {
                                            return (
                                                <div className="col-md-4 wow fadeIn" data-wow-delay={`0.${topicIndex + 1}s`} key={topicIndex}>
                                                    <div className="card" style={{ padding: '20px' }}>
                                                        <div className="card-bod minWiki">
                                                            <div className="maxCaption"><img src={topic.imageUrl} className="img-fluid mb-2" alt={topic.title} /></div>
                                                            <h4 className="serif font-24">{topic.title}</h4>
                                                            <div className="topicCaption">{topic.description}</div>
                                                            <br />
                                                            <WikiLabels wikis={topic.wikiData} />
                                                            <hr />
                                                            <Link className="btn btn-sm fullWidth btn-orange " to={`/topic/${topic.id}`}>Details</Link>
                                                            <Button style={{ display: 'none' }} className="ml-2 btn-sm" variant="outline-danger" onClick={() => this.handleDeleteTopicById(topic.id)}>Delete</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </React.Fragment>)

                }
            </React.Fragment>

        )
    }
}

export default UserCreatedTopicList;