import React from 'react'

// Deps
import { connect } from "react-redux"
import { REQUEST_HEADERS } from "../../constants";
import { resolveEndpoint } from "../../util/Helpers";
import axios from "axios";

const mapStateToProps = state => {
    return { mobile: state.generic.mobile, user: state.user.user, };
};

class AnnotationsSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            annotations: false,
            focusedAnnotation: false,
            active: false,
        }
        this.loadAnnotations = this.loadAnnotations.bind(this)
        this.highlightAnnotation = this.highlightAnnotation.bind(this)
        this.removeHighlight = this.removeHighlight.bind(this)

    }
    removeHighlight() {
        let marks = document.querySelector('mark');
        marks.replaceWith(this.state.focusedAnnotation)
    }
    highlightAnnotation(annotation) {
        var results = [];
        let selector = annotation.selector.replace(". >", " >")
        selector = selector.replace("..", ".")
        let annotatedText = annotation.annotatedText


        let actualText = document.querySelector(
            selector
        );
        this.setState({ focusedAnnotation: annotation.annotatedText })
        let actualTextInner, actualTextOriginal;

        if (results.length > 0) {
            actualTextInner = results[0].html
            actualTextOriginal = results[0].html
        } else {
            if (actualText) {
                actualTextInner = actualText.innerText
                actualTextOriginal = actualText.innerText
            }
        }


        /* let annotatedText = actualText.innerText.substring(
            annotation.start,
            annotation.end
        ); */


        if (actualText) {
            let newHtml = actualTextInner.replace(
                annotatedText,
                "<mark class='mark-annotation'>" +
                annotatedText +
                "</mark>"
            );


            actualText.innerHTML = newHtml;

        }

    }
    loadAnnotations() {
        let url = resolveEndpoint("getAnnotations", [
            { slug1: window.location.href }
        ]);
        /* let url = "dummy/annotations.json"; */

        if (this.props.user) {
            axios.get(url, REQUEST_HEADERS).then(res => {
                this.setState({
                    annotations: res.data,
                    active: true
                })
            });
        }
    }

    render() {
        let annotations = this.state.annotations
        return (
            <React.Fragment>
                {
                    this.state.active ? (
                        <React.Fragment>
                            <div className="annotations-sidebar">
                                <div className="sidebarOptions">
                                    <button class="close-annotations-btn" onClick={() => { this.setState({ active: false }) }}>Close</button>
                                    <button class="close-annotations-btn" onClick={() => { this.loadAnnotations() }}>Refresh</button>
                                </div>
                                {
                                    (annotations && annotations.length) ? (
                                        <ul>
                                            {
                                                annotations.map((annotation, idx) => {
                                                    return (
                                                        <React.Fragment key={idx}>
                                                            {
                                                                (annotation.page === window.location.href) && (
                                                                    <li onMouseLeave={() => { this.removeHighlight() }} onMouseOver={() => { this.highlightAnnotation(annotation) }} data-selector={annotation.selector}>
                                                                        <strong>{annotation.author}</strong> @ {annotation.date} commented on  "<strong>{annotation.annotatedText}</strong>"" with the motivation of {annotation.motivation}: <br />
                                                                        {annotation.comment}
                                                                    </li>
                                                                )
                                                            }
                                                        </React.Fragment>

                                                    )
                                                })
                                            }
                                        </ul>
                                    ) : (<React.Fragment>Nothing to show</React.Fragment>)
                                }
                            </div>
                        </React.Fragment>
                    ) : (
                            <React.Fragment>
                                {
                                    this.props.user && (
                                        <button id="show-annotations-btn" onClick={() => { this.loadAnnotations() }}>Show Annotations</button>
                                    )
                                }
                            </React.Fragment>
                        )
                }

            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps)(AnnotationsSidebar);
