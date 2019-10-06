import React, { Component } from 'react';
import { REQUEST_HEADERS } from "../constants";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { createContent } from "../util/APIUtils";
import toast from "toasted-notes";
import PageHeader from "../components/PageHeader";
import EditorField from '../components/EditorField'
import { resolveEndpoint } from "../util/Helpers";
import page_banner from "../img/kitchen.jpeg"
import ThingsToConsider from '../components/partials/ThingsToConsider';
import Loading from '../components/Loading';

class EditContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: false,
            loading: true
        };
        this.loadContentById = this.loadContentById.bind(this);

    }

    loadContentById() {
        let url = resolveEndpoint('getContentById', [{ "slug1": this.props.match.params.contentId }]);

        axios.get(url, REQUEST_HEADERS)
            .then(res => {
                this.setState({ content: res.data, loading: false })
            }).catch(err => {
                toast.notify("Something went wrong!", { position: "top-right" });
                console.log(err)
            });
    }

    componentDidMount() {
        this.loadContentById();
    }
    render() {
        const props = this.props;
        const { content, loading } = this.state;

        return (
            <React.Fragment>
                {loading ? <Loading /> : (
                    <React.Fragment>
                        {
                            content && (

                                <div>
                                    <PageHeader title="Edit Content" bg={page_banner} intro="Be the mentor you once needed. Share what's on your mind & help others to grow.">
                                        <Link to={`/topic/${content.topicId}`} className="breadcrumbLink">
                                            <span>{content.title}</span>
                                        </Link>
                                    </PageHeader>
                                    <div className="sectionPadding">
                                        <div className="container text-left ">
                                            <div className="row">
                                                <ThingsToConsider />
                                                <div className="col-md-10 offset-md-1 mt-5 mb-5">
                                                    <Formik
                                                        initialValues={{ title: content.title, text: content.text }}
                                                        validate={values => {
                                                            let errors = {};

                                                            if (!values.title) {
                                                                errors.title = 'Content Title is required';
                                                            }

                                                            if (!values.text) {
                                                                errors.text = 'Content Text is required';
                                                            }

                                                            return errors;
                                                        }}
                                                        onSubmit={(values, { setSubmitting }) => {
                                                            setTimeout(() => {

                                                                let topicId = content.topicId;
                                                                const newContent = {
                                                                    id: content.id,
                                                                    topicId: topicId,
                                                                    title: values.title,
                                                                    text: values.text
                                                                };

                                                                createContent(newContent)
                                                                    .then(res => {
                                                                        toast.notify("Content updated successfully.", { position: "top-right" });
                                                                        props.history.push(`/topic/${topicId}`);
                                                                    }).catch(err => {
                                                                        toast.notify("Something went wrong!", { position: "top-right" });
                                                                    });

                                                                setSubmitting(false);
                                                            }, 400);
                                                        }}
                                                    >
                                                        {({ isSubmitting }) => (
                                                            <Form>
                                                                <div className="form-group row text-left">
                                                                    <label htmlFor="contentTitle" className="col-sm-12 col-form-label">Material <strong>Title</strong></label>
                                                                    <div className="col-sm-12">
                                                                        <Field type="text" name="title" id="contentTitle" placeholder="content title" className="form-control" />
                                                                        <ErrorMessage name="contentTitle" component="div" />
                                                                    </div>
                                                                </div>

                                                                <div className="form-group row text-left">
                                                                    <label htmlFor="contentText" className="col-sm-12 col-form-label">Material <strong>Body</strong> </label>
                                                                    <div className="col-sm-12">
                                                                        <Field name="text" component={EditorField} placeholder="Enter Content" row="20" />
                                                                        <ErrorMessage name="contentText" component="div" />
                                                                    </div>
                                                                </div>

                                                                <Button variant="success" type="submit" block disabled={isSubmitting}>Save</Button>
                                                            </Form>
                                                        )}
                                                    </Formik>
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
    };

}

export default EditContent;