import React from "react";
// Partials
import { InputForm, FormInput } from "components/partials/forms";
import Btn from "components/partials/btn";

export default class AnnotationModal extends React.Component {
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

        let req = {
            page: window.location.href,
            annotatedText: vm.props.selectedText,
            selector: vm.props.cssSelector,
            start: vm.props.anchorOffset,
            end: vm.props.focusOffset,
            comment: e.target.elements.comment.value,
            createdAt: new Date(),
            author: "Serhat Uzunçavdar"
        };

        console.log(req);
    }

    render() {
        let vm = this;
        return (
            <div className={vm.props.className}>
                {vm.props.closeBtn}
                <div className="modal-innercontent">
                    You are annotating the following text:
                    <br /> <br />
                    <strong>
                        "<em>{vm.props.selectedText}</em>"
                    </strong>
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

AnnotationModal.defaultProps = {
    className: "",
    containerClass: "modal-login",
    name: "annotation"
};
