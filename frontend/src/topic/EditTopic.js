import React, { Component } from 'react';
import { REQUEST_HEADERS } from "../constants";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createTopic } from '../util/APIUtils';
import toast from "toasted-notes";
import wdk from "wikidata-sdk";
import axios from "axios";
import { Col, Button, Row } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { resolveEndpoint } from "../util/Helpers";
import ThingsToConsider from '../components/partials/ThingsToConsider';
import Loading from '../components/Loading';
import loadingGif from '../img/loading.gif'

class EditTopic extends Component {
    constructor(props) {
        super(props);
        this.timer = null;
        this.state = {
            title: '',
            description: '',
            imageUrl: '',
            wikiData: [],
            wikiDataSearch: [],
            selectedWikis: [],
            topic: false,
            loading: true,
            loadingWiki: false
        };
        this.handleKeywordChange = this.handleKeywordChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.addWiki = this.addWiki.bind(this);
        this.removeWiki = this.removeWiki.bind(this);
    }


    handleKeywordChange(event) {
        clearTimeout(this.timer);

        this.setState({ loadingWiki: true })

        const value = event.target.value;
        if (value !== '') {
            this.timer = setTimeout(() => {
                const url = wdk.searchEntities(value, 'en', 15, 'json');
                axios.get(url)
                    .then(response => {
                        this.setState({ loadingWiki: false })
                        if (response.data.search.length > 0) {
                            this.setState({ wikiDataSearch: response.data.search })
                            toast.notify("Found in WikiData!", { position: "top-right" })
                        } else {
                            toast.notify("Keyword can not found!", { position: "top-right" });
                        }
                    })
            }, 1000)
        } else {
            this.setState({ wikiDataSearch: [] })
        }
    }

    handleSelect(event) {
        const wikiData = this.state.wikiData.slice();
        this.setState({
            wikiData: wikiData.concat(event.target.value)
        });
    }

    loadTopicById() {
        let url = resolveEndpoint('getTopicById', [{ "slug1": this.props.match.params.topicId }]);

        axios.get(url, REQUEST_HEADERS)
            .then(res => {
                this.setState({ topic: res.data, selectedWikis: res.data.wikiData, loading: false })
            }).catch(err => {
                toast.notify("Something went wrong!", { position: "top-right" });
                console.log(err)
            });
    }

    componentDidMount() {
        this.loadTopicById();
    }

    addWiki(wiki) {
        const { selectedWikis } = this.state;

        let match = false;

        selectedWikis.map((currentWiki, idx) => {
            if (currentWiki.id === wiki.id) {
                match = true
                return true;
            }
            return false
        })

        if (match) {
            this.removeWiki(wiki.id)
        } else {
            const newWiki = {
                conceptUri: wiki.concepturi,
                description: wiki.description,
                id: wiki.id,
                label: wiki.label
            }


            this.setState({
                selectedWikis: selectedWikis.concat(newWiki)
            });
        }
    }

    removeWiki(wikiId) {
        const { selectedWikis } = this.state;

        let filteredWikis = selectedWikis.filter(
            obj => obj.id !== wikiId
        )

        this.setState({
            selectedWikis: filteredWikis
        });

    }

    render() {
        const { topic, wikiDataSearch, selectedWikis, loading, loadingWiki } = this.state;
        const props = this.props;

        return (
            <React.Fragment>
                {loading ? <Loading /> : (
                    <React.Fragment>
                        {
                            topic && (
                                <React.Fragment>
                                    <PageHeader title="Edit Topic" intro="Be the mentor you once needed. Share what's on your mind & help others to grow.">
                                        <Link to={`/${props.currentUser.username}/topics/created`} className="breadcrumbLink">
                                            <span>My Topics</span>
                                        </Link>
                                    </PageHeader>

                                    <div className="sectionPadding">
                                        <div className="container w-90 text-left">
                                            <div className="row">
                                                <ThingsToConsider />
                                                <div className="col-md-10 offset-md-1 mt-5 mb-5">
                                                    <Formik
                                                        initialValues={{ title: topic.title ? topic.title : '', description: topic.description ? topic.description : '', imageUrl: topic.imageUrl ? topic.imageUrl : '', wikiKeyword: '' }}
                                                        validate={values => {
                                                            let errors = {};

                                                            if (!values.title) {
                                                                errors.title = 'Topic Title is required';
                                                            }

                                                            if (!values.description) {
                                                                errors.text = 'Topic Text is required';
                                                            }

                                                            return errors;
                                                        }}
                                                        onSubmit={(values, { setSubmitting }) => {
                                                            setTimeout(() => {

                                                                let topicId = topic.id;
                                                                const newTopic = {
                                                                    id: topic.id,
                                                                    title: values.title,
                                                                    imageUrl: values.imageUrl,
                                                                    description: values.description,
                                                                    wikiData: selectedWikis,
                                                                };

                                                                if (selectedWikis.length === 0) {
                                                                    toast.notify(<span className="text-danger">You must select at least one Wiki.</span>, { position: "top-right" });
                                                                } else {
                                                                    this.setState({ loading: true })
                                                                    createTopic(newTopic)
                                                                        .then(res => {
                                                                            toast.notify("Content updated successfully.", { position: "top-right" });
                                                                            props.history.push(`/topic/${topicId}`);
                                                                        }).catch(err => {
                                                                            this.setState({ loading: false })
                                                                            toast.notify("Something went wrong!", { position: "top-right" });
                                                                        });
                                                                }



                                                                setSubmitting(false);
                                                            }, 400);
                                                        }}
                                                    >
                                                        {({ isSubmitting }) => (
                                                            <Form>
                                                                <div className="form-group row text-left">
                                                                    <label htmlFor="topicTitle" className="col-sm-12 col-form-label">Topic <strong>Title</strong></label>
                                                                    <div className="col-sm-12">
                                                                        <Field type="text" name="title" id="topicTitle" placeholder="Topic title" required className="form-control" />
                                                                        <ErrorMessage name="topicTitle" component="div" />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group row text-left">
                                                                    <label htmlFor="topicImage" className="col-sm-12 col-form-label">Topic <strong>Image</strong></label>
                                                                    <div className="col-sm-12">
                                                                        <Field type="text" name="imageUrl" id="topicImage" placeholder="Topic image" required className="form-control" />
                                                                        <ErrorMessage name="topicImage" component="div" />
                                                                    </div>
                                                                </div>

                                                                <div className="form-group row text-left">
                                                                    <label htmlFor="topicDescription" className="col-sm-12 col-form-label">Topic <strong>Body</strong> </label>
                                                                    <div className="col-sm-12">
                                                                        <Field type="text" component="textarea" rows="7" name="description" required id="description" placeholder="Topic description" className="form-control" />
                                                                        <ErrorMessage name="topicDescription" component="div" />
                                                                    </div>
                                                                </div>
                                                                {selectedWikis.length > 0 && (
                                                                    <div>
                                                                        Added Wiki:
                                                                        <ul>
                                                                            {selectedWikis.map((wiki, idx) => {
                                                                                return (
                                                                                    <li key={idx}>
                                                                                        {wiki.label} - {wiki.description} <span onClick={() => this.removeWiki(wiki.id)} className="ml-2 removeWikiLabel badge badge-pill badge-danger">Remove</span>
                                                                                    </li>
                                                                                )
                                                                            })}

                                                                        </ul>
                                                                    </div>
                                                                )}

                                                                <div className="form-group row text-left">
                                                                    <label htmlFor="topicDescription" className="col-sm-12 col-form-label">
                                                                        {loadingWiki ? (<span><img src={loadingGif} width="30" alt="" /> Searching WikiData...</span>) : 'Keyword'}
                                                                    </label>

                                                                    <div className="col-sm-12">
                                                                        <input type="text" name="wikiKeyword" placeholder="Wiki keywords" onChange={this.handleKeywordChange} className="form-control" />

                                                                    </div>

                                                                </div>

                                                                {wikiDataSearch.length > 0 && (
                                                                    wikiDataSearch.map((wiki, wikiIndex) => {
                                                                        return (
                                                                            <Row key={wikiIndex} className="border-bottom border-info p-1 m-1">
                                                                                {wiki.description && (
                                                                                    <React.Fragment>
                                                                                        <Col md="1">
                                                                                            <input type="checkbox" onChange={() => this.addWiki(wiki)} value={wiki} />
                                                                                        </Col>
                                                                                        <Col md="9">{wiki.description}</Col>
                                                                                        <Col md="2">
                                                                                            <a href={wiki.concepturi} target="_blank" rel="noopener noreferrer">Visit</a>
                                                                                        </Col>
                                                                                    </React.Fragment>
                                                                                )}
                                                                            </Row>
                                                                        )
                                                                    })
                                                                )}
                                                                <Button variant="success" type="submit" block disabled={isSubmitting}>Save</Button>
                                                            </Form>
                                                        )}
                                                    </Formik>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        }
                    </React.Fragment>
                )}
            </React.Fragment>
        )
    }
}

export default withRouter(EditTopic);