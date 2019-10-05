import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class NotFound extends Component {
    render() {
        return (
            <div className="page-not-found">
                <h1 style={{ fontSize: "90px" }} className="title serif">
                    404
                </h1>
                <div className="desc mb-5">
                    Oooooops... <br />
                    The page you're looking for was not found.
                </div>
                <Link to="/"><Button variant="primary" size="lg" type="submit" block className="mb-2 btn-orange">Back to Homepage</Button></Link>
            </div>
        );
    }
}

export default NotFound;