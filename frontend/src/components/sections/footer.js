import React from 'react'

// Partials
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import logo from "assets/images/bespoke_logo_white.png"

// Deps
import { connect } from "react-redux"

const mapStateToProps = state => {
	return { mobile: state.generic.mobile };
};

class Footer extends React.Component {


	render() {
		return (
			<React.Fragment>
				<div className="myFooter">
					<div className="container">
						<div className="row">
							<div className="col-md-4 text-left">
								Made with <FontAwesomeIcon icon={faHeart} />
							</div>
							<div className="col-md-4 text-center">
								All rights reserved.
						</div>
							<div className="col-md-4 text-right">
								Bogazici University &copy; 2019
						</div>
						</div>
						<div className="row">
							<div className="col-md-12">
								<hr />
							</div>
						</div>
						<div className="row">
							<div className="col-md-6 text-left">
								<br /><br /><br />
								<h2 className="serif">Contact</h2>
								<p>
									<strong>Call: </strong>+90(212) 359-54-00
								<br />
									<strong>Visit:</strong> Rumeli Hisarı, Hisar Üstü Nispetiye Cd <br /> No:7, 34342 Sarıyer/İstanbul
							</p>
							</div>
							<div className="col-md-6 text-right">
								<img src={logo} className="mt-5" alt="" width="200" />
							</div>
						</div>
					</div>
				</div>

			</React.Fragment>
		)
	}
}

export default connect(mapStateToProps)(Footer);
