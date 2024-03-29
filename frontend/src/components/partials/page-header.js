import React, { Component } from 'react'
import { Link } from "react-router-dom";
import WOW from "wow.js";

class PageHeader extends Component {
    componentDidMount() {
        const wow = new WOW();
        wow.init();
    }
    render() {
        const props = this.props;
        return (

            <div className={`pageHeader text-left ${props.className}`} style={{ backgroundImage: `url(${props.bg})` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 ">
                            <span className="wow fadeIn">
                                <Link to={`/`} className="breadcrumbLink serif bespoke-page-header-breadcrumb-link">
                                    <span>Home</span>
                                </Link>
                                {props.children}
                                <span className="breadcrumbLink bespoke-page-header-breadcrumb">{props.title}</span>
                            </span>
                            <h2 className="serif wow fadeIn bespoke-page-header-h2" data-wow-offset="50" data-wow-delay="0.2s">{props.title}</h2>
                            <p className="wow fadeIn bespoke-page-header-p" data-wow-delay="0.3s">
                                {props.intro}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default PageHeader;