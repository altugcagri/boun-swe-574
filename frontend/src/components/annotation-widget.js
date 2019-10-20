import React from "react";
import { openModal } from "functions/modals";

export default class AnnotationWidget extends React.Component {
    constructor(props) {
        super(props);
        this.btnTapped = this.btnTapped.bind(this);
    }
    btnTapped() {
        openModal("annotation", {
            selectedText: this.props.selectedText,
            cssSelector: this.props.cssSelector
        });
    }
    render() {
        return (
            <div className="annotation-widget" onClick={this.btnTapped}>
                Annotate this text
            </div>
        );
    }
}
