import React from "react";

// Partials
import LoginForm from "components/partials/form-login";

export default class LoginModal extends React.Component {
    render() {
        let vm = this;
        return (
            <div className={`${vm.props.className} bespoke-modal-login`}>
                {vm.props.closeBtn}
                <div className="modal-innercontent bespoke-modal-login-content">
                    <LoginForm type="modal" />
                </div>
            </div>
        );
    }
}

LoginModal.defaultProps = {
    className: "",
    containerClass: "modal-login",
    name: "login"
};
