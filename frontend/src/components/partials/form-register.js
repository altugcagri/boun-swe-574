import React from "react";

// Partials
import { InputForm, FormInput } from "components/partials/forms";
import Btn from "components/partials/btn";

// Deps
import { openModal, closeModal } from "functions/modals";
import { redirect } from "controllers/navigator";
import { register } from "data/store.user";

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            message: false,
            success: false,
            touched: false,
            promoChecked: false,
            email: "-"
        };

        this.submit = this.submit.bind(this);
        this.setEmail = this.setEmail.bind(this);
    }

    setEmail(value) {
        this.setState({ email: value });
    }

    submit(e) {
        let vm = this;

        vm.setState({
            loading: true
        });

        register(e.target, function(payload) {
            vm.setState({
                success: true,
                loading: false,
                message: "Registration Complete",
                email: e.target.elements.email.value
            });

            if (payload.success) {
                setTimeout(function() {
                    closeModal();
                }, 4000);
            }
        });
    }

    render() {
        let vm = this;

        return (
            <div className={"section loginform type-" + vm.props.type}>
                {vm.state.success ? (
                    <React.Fragment>
                        <h2 className="loginform-title">
                            Your account has been created
                        </h2>
                        <div className="loginform-info wysiwyg">
                            <p>
                                Please login with the credentails you've entered
                            </p>
                        </div>
                        <div className="loginform-nav center"></div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <h2 className="loginform-title">
                            Create a New Account
                        </h2>
                        <InputForm
                            className="loginform-form"
                            onSubmit={this.submit}
                            onTouch={() => {
                                vm.setState({ touched: true });
                            }}
                        >
                            {vm.state.message && (
                                <div
                                    className={
                                        "loginform-message " +
                                        (vm.state.success ? "success" : "error")
                                    }
                                >
                                    <span>{vm.state.message}</span>
                                </div>
                            )}
                            <FormInput
                                name="name"
                                disabled={vm.state.loading}
                                type="text"
                                label="Name - Surname"
                                validation={{
                                    required: "Please enter your full name."
                                }}
                                className="form-field"
                            />
                            <FormInput
                                name="username"
                                disabled={vm.state.loading}
                                type="text"
                                label="Username"
                                validation={{
                                    required: "Please enter your username."
                                }}
                                className="form-field"
                            />

                            <FormInput
                                name="email"
                                disabled={vm.state.loading}
                                type="email"
                                label="E-Mail"
                                onChange={value => {
                                    this.setEmail(value);
                                }}
                                validation={{
                                    required: "Please enter a valid e-mail.",
                                    email: true
                                }}
                                className="form-field"
                            />
                            <FormInput
                                name="usernameOrEmail"
                                disabled={vm.state.loading}
                                type="hidden"
                                value={vm.state.email}
                                label=""
                                className="form-field"
                            />
                            <FormInput
                                name="password"
                                id="register-password"
                                disabled={vm.state.loading}
                                type="password"
                                label="Password"
                                validation={{
                                    required: "Please enter your password",
                                    minLength: [
                                        "Your password must have at least {length} characters.",
                                        6
                                    ],
                                    compare: [
                                        "Passwords are not matching.",
                                        "#register-password-repeat"
                                    ]
                                }}
                                className="form-field"
                            />
                            <FormInput
                                name="password_repeat"
                                id="register-password-repeat"
                                disabled={vm.state.loading}
                                type="password"
                                label="Password (Again)"
                                validation={{
                                    required: "Please enter your password",
                                    minLength: [
                                        "Your password must have at least {length} characters.",
                                        6
                                    ],
                                    compare: [
                                        "Passwords are not matching.",
                                        "#register-password"
                                    ]
                                }}
                                className="form-field"
                            />
                            <Btn
                                className="form-field"
                                type="submit"
                                disabled={vm.state.loading}
                                loading={vm.state.loading}
                                block
                                uppercase
                                light
                            >
                                Sign up
                            </Btn>
                        </InputForm>
                        <div className="loginform-nav">
                            <span>
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    className="nav-btn"
                                    onClick={() => {
                                        vm.goToLogin();
                                    }}
                                >
                                    Sign in
                                </button>
                            </span>
                        </div>
                    </React.Fragment>
                )}
            </div>
        );
    }

    goToLogin() {
        if (this.props.type === "self") {
            redirect("account.login");
        } else {
            openModal("login");
        }
    }
}

RegisterForm.defaultProps = {
    type: "self"
};
