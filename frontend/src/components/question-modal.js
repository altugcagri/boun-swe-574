import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Modal } from "react-bootstrap";
import toast from "toasted-notes";
import { createQuestion } from "../util/APIUtils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import loadingGif from '../img/loading.gif'

function QuestionModal(FieldProps) {
    const [modalState, setModalState] = useState(false)
    const [refreshState, setRefreshState] = useState(false)
    const [loadingState, setLoadingState] = useState(false)

    useEffect(() => {
        FieldProps.handleRefresh()
    }, [modalState, refreshState])

    return (
        <React.Fragment>
            <Button className="btn-sm ml-2 inlineBtn" variant="success" onClick={() => { setModalState(true) }}>
                <FontAwesomeIcon icon={faPlus} /> Question
            </Button>
            <Modal show={modalState} onHide={() => { setModalState(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>{loadingState ? (<span><img src={loadingGif} width="30" alt="" /> </span>) : 'New Question'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{ text: '' }}
                        validate={values => {
                            let errors = {};
                            if (!values.text) {
                                errors.text = 'Question text is required';
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setLoadingState(true)
                            setTimeout(() => {
                                const newQuestion = {
                                    contentId: FieldProps.contentId,
                                    text: values.text
                                };
                                createQuestion(newQuestion, FieldProps.contentId)
                                    .then(res => {
                                        toast.notify("Question created successfully.", { position: "top-right" });
                                        setModalState(false)
                                        setRefreshState(true)
                                        setLoadingState(false)
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
                                    <label htmlFor="contentTitle" className="col-sm-12 col-form-label">Your <strong>Question</strong></label>
                                    <div className="col-sm-12">
                                        <Field type="text" name="text" id="text" className="form-control" />
                                        <ErrorMessage name="text" component="div" />
                                    </div>
                                </div>
                                <Button variant="success" type="submit" block disabled={isSubmitting}>{loadingState ? "Loading" : 'Save'}</Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}

export default QuestionModal
