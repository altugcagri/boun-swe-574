import React from "react";

// Partials
import { InputForm, FormInput } from "components/partials/forms";
import Btn from "components/partials/btn";
//import axios from "axios";
// Deps
import { openModal, closeModal } from "functions/modals";
import { redirect } from "controllers/navigator";
import { login } from "data/store.user";

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            message: false,
            complete: false,
            success: false
        };

        //this._loginUser = this._loginUser.bind(this);
        this.submit = this.submit.bind(this);

        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    submit(e) {
        let vm = this;

        vm.setState({
            loading: true
        });

        login(e.target, function (payload) {
            if (vm._isMounted) {
                vm.setState({
                    success: payload.accessToken ? true : false,
                    loading: false,
                    message: payload.accessToken
                        ? "Giriş Başarılı"
                        : "Girdiğiniz bilgiler hatalı"
                });

                if (payload.accessToken) {
                    setTimeout(function () {
                        if (vm._isMounted) {
                            closeModal();
                        }
                    }, 500);
                }
            }
        });
    }

    render() {
        let vm = this;

        return (
            <div className={"section bespoke-modal-login-form loginform type-" + vm.props.type}>
                <h2 className="loginform-title">Login to your account</h2>

                <InputForm
                    className="loginform-form"
                    onSubmit={this.submit}
                    autoComplete="off"
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
                        name="usernameOrEmail"
                        type="email"
                        label="E-Mail"
                        disabled={vm.state.loading}
                        validation={{
                            required: "Please enter a valid e-mail",
                            email: true
                        }}
                        className="form-field"
                    />
                    <FormInput
                        name="password"
                        type="password"
                        label="Password"
                        disabled={vm.state.loading}
                        validation={{
                            required: "Please enter your password",
                            minLength: [
                                "Your password must have at least {length} characters.",
                                6
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
                        Login
                    </Btn>
                </InputForm>
                <div className="loginform-nav">
                    <span>
                        Not registered yet?{" "}
                        <button
                            type="button"
                            className="nav-btn"
                            onClick={() => {
                                vm.goToRegister();
                            }}
                        >
                            Sign up now
                        </button>
                    </span>
                </div>
            </div>
        );
    }

    goToRecovery() {
        if (this.props.type === "self") {
            redirect("account.recovery");
        } else {
            openModal("recovery");
        }
    }

    goToRegister() {
        if (this.props.type === "self") {
            redirect("account.register");
        } else {
            openModal("register");
        }
    }
}

LoginForm.defaultProps = {
    type: "self"
};
