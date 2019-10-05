import React, { Component } from 'react';
import { REQUEST_HEADERS } from "../constants";
import axios from "axios";
import toast from "toasted-notes";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faCheck } from '@fortawesome/free-solid-svg-icons'
import PageHeader from "../components/PageHeader";
import { resolveEndpoint } from "../util/Helpers";
import Loading from '../components/Loading';

class ViewContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: false,
            loading: true,
            refreshed: false,
            topic: {
                contentList: []
            }
        };
        this.loadContentById = this.loadContentById.bind(this);
        this.loadTopicById = this.loadTopicById.bind(this);
    }


    loadContentById() {
        let url = resolveEndpoint('getContentById', [{ "slug1": this.props.match.params.contentId }]);

        axios.get(url, REQUEST_HEADERS)
            .then(res => {
                this.setState({ content: res.data })
                this.loadTopicById(res.data.topicId);
            }).catch(err => {
                toast.notify("Something went wrong!", { position: "top-right" });
                console.log(err)
            });
    }

    loadTopicById(topicId) {
        let url = resolveEndpoint('getTopicById', [{ "slug1": topicId }]);

        axios.get(url, REQUEST_HEADERS)
            .then(res => {
                this.setState({
                    topic: res.data,
                    activeTab: res.data.contentList.length > 0 ? res.data.contentList[0].id : '', loading: false, refreshed: false
                })
            }).catch(err => {
                toast.notify("Something went wrong!", { position: "top-right" });
                console.log(err)
            });
    }

    componentDidMount() {
        this.loadContentById();
    }



    render() {

        const { content, loading, refreshed, topic } = this.state;

        return (
            <React.Fragment>
                {(loading || refreshed) ? <Loading /> : (
                    <React.Fragment>
                        <PageHeader bg={topic.imageUrl} title={content.title} intro="Tip: learning is something you do on your own. Do not settle with this material, go ahead and explore it further!">
                            <Link to={`/topic/view/${content.topicId}`} className="breadcrumbLink">
                                <span>{content.topicTitle}</span>
                            </Link>
                        </PageHeader>

                        {
                            content && (
                                <div className=" sectionPadding text-left">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <h4 className="mb-4"><strong>{content.title}</strong></h4>
                                                <div className="text-left" dangerouslySetInnerHTML={{ __html: content.text }} ></div>
                                                <div className="text-right mt-5">
                                                    <hr />
                                                    {content.questionCount > 0 ? (
                                                        <Link className="btn btn-success btn-sm ml-2 inlineBtn" to={`/content/${content.id}/quiz`} ><FontAwesomeIcon icon={faChevronRight} /> Start Material Quiz</Link>
                                                    ) : (
                                                            <React.Fragment>
                                                                {content.nextContentId === null ? (
                                                                    <div className="text-right mt-5">
                                                                        <Link className="btn btn-success btn-sm ml-2 inlineBtn" to={`/topic/view/${content.topicId}`}><FontAwesomeIcon icon={faCheck} /> Finalize</Link>
                                                                    </div>
                                                                ) : (
                                                                        <div className="text-right mt-5">
                                                                            <a className="btn btn-success btn-sm ml-2 inlineBtn" href={`/content/view/${content.nextContentId}`} ><FontAwesomeIcon icon={faChevronRight} /> Start Next Material</a>
                                                                        </div>
                                                                    )}
                                                            </React.Fragment>


                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                    </React.Fragment>
                )}
            </React.Fragment>
        )
    }
}

export default withRouter(ViewContent);