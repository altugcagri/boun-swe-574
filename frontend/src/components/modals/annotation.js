import React from "react";
// Partials
import { InputForm, FormInput } from "components/partials/forms";
import Btn from "components/partials/btn";
import { connect } from "react-redux";
import { createAnnotation } from "util/APIUtils";
import toast from "toasted-notes";
import { closeModal } from "functions/modals";

const mapStateToProps = state => {
    return {
        currentPage: state.generic.currentPage,
        user: state.user.user,
        unreadMessageCount: state.user.unreadMessageCount
    };
};

class AnnotationModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            message: false,
            complete: false,
            success: false
        };

        //this._loginUser = this._loginUser.bind(this);
        this.submit = this.submit.bind(this);
    }
    submit(e) {
        let vm = this;


        vm.setState({
            loading: true
        });

        let newAnnotation = {
            page: window.location.href,
            annotatedText: vm.props.selectedText,
            selector: vm.props.cssSelector,
            start: vm.props.anchorOffset,
            end: vm.props.focusOffset,
            comment: e.target.elements.comment.value,
            createdAt: new Date(),
            author: vm.props.user.username
        };

        createAnnotation(newAnnotation)
            .then(response => {
                toast.notify("Annotation created successfully.", {
                    position: "top-right"
                });
                closeModal()
            })
            .catch(error => {
                if (error.status === 401) {
                    this.props.handleLogout();
                } else {
                    this.setState({ loading: false });
                    toast.notify("Something went wrong!", {
                        position: "top-right"
                    });
                }
            });

    }

    render() {
        let vm = this;

        return (
            <div className={`${vm.props.className} bespoke-modal-annotation`}>
                {vm.props.closeBtn}
                <div className="modal-innercontent bespoke-modal-annotation-content">
                    {
                        !vm.props.isImage ? (
                            <React.Fragment>
                                You are annotating the following text:
                            <br /> <br />
                                <strong>
                                    "<em>{vm.props.selectedText}</em>"
                            </strong>
                            </React.Fragment>
                        ) : (
                                <React.Fragment>
                                    You are annotating the following image ({vm.props.selectedText}):
                            <br /> <br />
                                    <strong>
                                        <img src={vm.props.imgSrc} alt="" width="150" />
                                    </strong>
                                </React.Fragment>
                            )
                    }

                    <hr />
                    <div className={"section loginform "}>
                        <InputForm
                            className="loginform-form"
                            onSubmit={this.submit}
                            autoComplete="off"
                        >
                            {vm.state.message && (
                                <div
                                    className={
                                        "loginform-message " +
                                        (vm.state.success ? "success" : "error")
                                    }
                                >
                                    <span>{vm.state.message}</span>
                                </div>
                            )}
                            <FormInput
                                name="comment"
                                type="text"
                                label="Your comment"
                                disabled={vm.state.loading}
                                validation={{
                                    required: "Please enter a comment"
                                }}
                                className="form-field"
                            />

                            <Btn
                                className="form-field"
                                type="submit"
                                disabled={vm.state.loading}
                                loading={vm.state.loading}
                                block
                                uppercase
                                light
                            >
                                Annotate
                            </Btn>
                        </InputForm>
                    </div>
                </div>
            </div>
        );
    }
}

const ConnectedAnnotationModal = connect(mapStateToProps)(AnnotationModal);

ConnectedAnnotationModal.defaultProps = {
    className: "",
    containerClass: "modal-login",
    name: "annotation"
};

export default ConnectedAnnotationModal;