import React from 'react'

// Partials
import RegisterForm from 'components/partials/form-register'

// Deps

export default class LoginModal extends React.Component {
	render() {
		let vm = this;
		return (
			<div className={`${vm.props.className} bespoke-modal-register`}>
				{vm.props.closeBtn}
				<div className="modal-innercontent bespoke-modal-register-content">
					<RegisterForm type="modal" />
				</div>
			</div>
		)
	}
}

LoginModal.defaultProps = {
	className: "",
	containerClass: "modal-login register",
	name: "register"
}