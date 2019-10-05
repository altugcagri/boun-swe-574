import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from "react-bootstrap";
import { createContent } from "../util/APIUtils";
import toast from "toasted-notes";
import EditorField from '../components/EditorField'
import Loading from '../components/Loading';
import ThingsToConsider from '../components/partials/ThingsToConsider';
import page_banner from "../img/kitchen.jpeg"
import PageHeader from "../components/PageHeader";
import { Link, withRouter } from "react-router-dom";

class AddContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        this.setState({ loading: false })
    }

    render() {
        const { loading } = this.state
        const props = this.props
        return (
            <React.Fragment>
                {loading ? <Loading /> : (
                    <React.Fragment>
                        <PageHeader title="Add Material" bg={page_banner} intro="Be the mentor you once needed. Share what's on your mind & help others to grow.">
                            <Link to={`/topic/${props.match.params.topicId}`} className="breadcrumbLink">
                                <span>My Topics</span>
                            </Link>
                        </PageHeader>

                        <div className="sectionPadding">
                            <div className="container text-left ">
                                <div className="row">
                                    <ThingsToConsider />
                                    <div className="col-md-10 offset-md-1 mt-5 mb-5">
                                        <Formik
                                            initialValues={{ title: '', text: '' }}
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
                                                this.setState({ loading: true })
                                                setTimeout(() => {

                                                    let topicId = props.match.params.topicId;
                                                    const newContent = {
                                                        topicId: topicId,
                                                        title: values.title,
                                                        text: values.text
                                                    };

                                                    createContent(newContent, topicId)
                                                        .then(res => {
                                                            toast.notify("Content created successfully.", { position: "top-right" });
                                                            props.history.push(`/topic/${topicId}`);
                                                        }).catch(err => {
                                                            this.setState({ loading: false })
                                                            toast.notify("Something went wrong!", { position: "top-right" });
                                                        });

                                                    setSubmitting(false);
                                                }, 400);
                                            }}
                                        >
                                            {({ isSubmitting }) => (
                                                <Form>
                                                    <div className="form-group row text-left">
                                                        <label htmlFor="contentTitle" className="col-sm-12 col-form-label">Title of this material</label>
                                                        <div className="col-sm-12">
                                                            <Field type="text" name="title" id="contentTitle" placeholder="content title" className="form-control" />
                                                            <ErrorMessage name="contentTitle" component="div" />
                                                        </div>
                                                    </div>

                                                    <div className="form-group row text-left">
                                                        <label htmlFor="contentText" className="col-sm-12 col-form-label">Body of the material</label>
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
                    </React.Fragment>
                )}
            </React.Fragment>
        )
    }
}

export default withRouter(AddContent);