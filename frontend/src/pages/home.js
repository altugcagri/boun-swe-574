import React from 'react'
import image_1 from 'assets/images/improve1.jpg'
import image_2 from 'assets/images/improve2.jpg'
import { Link } from "react-router-dom";
import page_banner from "assets/images/banner_1.jpg"
import bespoke_seperator from "assets/images/bespoke-icon.png"

export default class Home extends React.Component {

	render() {
		return (
			<React.Fragment>
				<div className="pageHeader homePageIntro text-left" style={{ backgroundImage: `url(${page_banner})` }}>
					<div className="container">
						<div className="row">
							<div className="col-md-12 serif">
								<h2 className="serif wow fadeIn" data-wow-delay="0.2s">Tailor-made content.</h2>
								<p className="wow fadeIn" data-wow-delay="0.3s">
									Bespoke is an open source learning space built just for you. <br />
									Here, you can learn from others, and share what you know. And remember, <br />
									knowledge is better when you share it! Go ahead, do something amazing...
                                </p>

							</div>
						</div>
					</div>
					<button className="cover-scroller">
						<span />
					</button>
				</div>
				<div className="mb-5 text-center sectionPadding">
					<div className="container">
						<div className="row align-items-center">
							<div className="col-md-1"></div>
							<div className="col-md-10">
								<p className="hero wow fadeIn text-left" data-wow-delay="0.2s">
									<img src={bespoke_seperator} className="wow fadeIn" data-wow-delay="0.3s" alt="" width="100" />
									We are well aware of your struggle with regular e-larning platforms. This is the reason why we've made Bespoke.
                                    To be honest, we've just created a space for you. Now it is your turn to return the favor and share what you know!
                                </p>

							</div>
						</div>
					</div>
				</div>
				<div className="mt-5 mb-5 text-left bg-alt sectionPadding">
					<div className="container">
						<div className="row align-items-center">
							<div className="col-md-6">
								<h4 className="mt-5 mb-5 wow fadeIn" data-wow-delay="0.2s">Find your <strong className="strong">passion</strong></h4>
								<p className="wow fadeIn" data-wow-delay="0.4s">
									Bespkoe is a free-to-use knowledge sharing platform. Find your path and start learning. Do not worry about the achievements or your grades, just learn for yourself.
                                <br /><br />
									<Link className="btn wow fadeIn btn-outline-primary btn-orange btn-xl" data-wow-delay="0.6s" to="/explore">Get Started</Link>

								</p>
							</div>
							<div className="col-md-1"></div>
							<div className="col-md-5">
								<img src={image_1} className="img-fluid wow fadeInUp" data-wow-delay="0.3s" data-wow-duration="1s" alt="" />
							</div>
						</div>
					</div>
				</div>
				<div className="mt-5 text-left sectionPadding">
					<div className="container">
						<div className="row align-items-center">
							<div className="col-md-5">
								<img src={image_2} className="img-fluid wow fadeInLeft" data-wow-delay="0.3s" data-wow-duration="1s" alt="" />
							</div>
							<div className="col-md-1"></div>
							<div className="col-md-6">
								<h4 className="mt-5 mb-5 wow fadeIn" data-wow-delay="0.2s">Polish & share your <strong className="strong">knowledge</strong></h4>
								<p className="wow fadeIn" data-wow-delay="0.4s">
									Be the mentor you once needed. Learn from others, explore new worlds. And vice versa; tell what's on your mind, help others to polish their knowledge.
                                    <br /><br />
									<Link className="btn btn-outline-primary wow fadeIn btn-orange btn-xl" data-wow-delay="0.6s" to="/explore">Get Started</Link>
								</p>
							</div>
						</div>
					</div>

				</div>
				<div className="sectionPadding preFooter">
					<div className="container">
						<div className="row">
							<div className="col-md-12 text-center">

								<h3 className="serif wow fadeIn" data-wow-delay="0.7s" style={{ fontSize: '34px' }}>About</h3>
								<br />
								<p className="wow fadeIn" data-wow-delay="0.9s">Bespoke is an open source project built in Bogazici University in 2019.
                                <br />
									Here in Bespoke, we believe in knowledge. We also know how frustrating it is to follow online videos,
                                    toggle between many different e-learning platforms, etc.
                                    <br /><br />
									That's why Bespoke is not just an e-learning platform, but a self-larning platform.
                                    <br /><br />
								</p>
							</div>
						</div>
					</div>

				</div>
			</React.Fragment>
		)
	}
}