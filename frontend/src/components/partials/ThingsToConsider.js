import React, { Component } from 'react';

export default class WikiLabel extends Component {
    render() {
        return (
            <div className="col-md-8 offset-2 text-center bespoke-things-to-consider">

                <h4 className="serif bespoke-things-to-consider-h2" style={{ fontSize: '22px' }}>Things to Consider</h4>

                <hr />
                <p className="bespoke-things-to-consider-p" style={{ fontSize: '14px', textAlign: 'center' }}>
                    You are now about to create a topic for others. Be specific as you can, but not too much.
                    Let people leave with some further in-depth searches, with some unsolved questions. After all,
                    this is a self-learning space.
                    <br /><br />
                    When you find yourself in disambiguation with some term, use the power of WikiData and label your
                    terms with WikiData. Remember, you can always come back and add more wiki!
                </p>
                <hr />
            </div>
        )

    }
}

