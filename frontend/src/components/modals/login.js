import React from 'react'

// Partials
import LoginForm from 'components/partials/form-login'

export default class LoginModal extends React.Component {
	render() {
		let vm = this;
		return (
			<div className={vm.props.className}>
				{vm.props.closeBtn}
				<div className="modal-innercontent">
					<LoginForm type="modal" />
				</div>
			</div>
		)
	}
}

LoginModal.defaultProps = {
	className: "",
	containerClass: "modal-login",
	name: "login"
}