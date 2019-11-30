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
            cssSelector: this.props.cssSelector,
            anchorOffset: this.props.anchorOffset,
            focusOffset: this.props.focusOffset,
            isImage: this.props.isImage,
            imgSrc: this.props.imgSrc
        });
    }
    render() {
        return (
            <div className="annotation-widget bespoke-annotation-widget" onClick={this.btnTapped}>
                {this.props.isImage ? `Annotate this image: ${this.props.selectedText}` : 'Annotate this text'}
            </div>
        );
    }
}
