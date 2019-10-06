import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'

export class WikiLabel extends Component {

    render() {
        const { wiki } = this.props;
        return (
            <a href={wiki.conceptUri} target="_blank" rel="noopener noreferrer" className="badge badge-pill badge-dark mr-2">
                <FontAwesomeIcon icon={faHashtag} /> {wiki.label}
            </a>
        )

    }
}

export class WikiLabels extends Component {
    render() {
        const wikiData = this.props.wikis

        return (
            <React.Fragment>
                {
                    wikiData.length > 0 && (
                        <p className="card-text wikiCards">
                            {wikiData.map((wiki, idx) => {
                                return <WikiLabel key={idx} wiki={wiki} />
                            })}
                        </p>
                    )
                }
            </React.Fragment>
        )
    }
}