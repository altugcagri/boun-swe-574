import React, { Component } from 'react';
import { REQUEST_HEADERS } from "../constants";
import axios from "axios";
import toast from "toasted-notes";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { WikiLabels } from "../components/Wiki";
import { resolveEndpoint } from "../util/Helpers";
import Loading from '../components/Loading';
import page_banner from "../img/study.jpeg"

class UserEnrolledTopicList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topics: [],
            input: '',
            loading: true
        };
        this.loadUserEnrolledTopics = this.loadUserEnrolledTopics.bind(this);

    }

    loadUserEnrolledTopics() {

        let url = resolveEndpoint('getEnrolledTopicsByUserId', [{ "slug1": this.props.currentUser.id }]);

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

    componentDidMount() {
        this.loadUserEnrolledTopics()
    }

    render() {

        const { topics, loading } = this.state;

        return (
            <React.Fragment>
                {loading ? <Loading /> : (
                    <React.Fragment>
                        <PageHeader title="Topics I Follow" bg={page_banner} intro="Your own collection of interest." />

                        <div className="container minHeightContent">
                            {
                                topics.length === 0 && (<div className="mt-5 text-center">Nothing to show</div>)
                            }
                            <div className="row mt-5">
                                {
                                    topics.map((topic, topicIndex) => {
                                        return (
                                            <div className="col-md-4" key={topicIndex}>
                                                <div className="card" style={{ padding: '20px' }}>
                                                    <div className="card-bod minWiki">
                                                        <div className="maxCaption"><img src={topic.imageUrl} className="img-fluid mb-2" alt={topic.title} /></div>
                                                        <h4 className="serif font-24">{topic.title}</h4>
                                                        <div className="topicCaption mb-3">{topic.description}</div>
                                                        <br />
                                                        <WikiLabels wikis={topic.wikiData} />
                                                        <hr />
                                                        <Link className="btn btn-sm fullWidth btn-orange" to={`/topic/view/${topic.id}`}>Details</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </React.Fragment>)

                }
            </React.Fragment>

        )
    }
}

export default UserEnrolledTopicList;