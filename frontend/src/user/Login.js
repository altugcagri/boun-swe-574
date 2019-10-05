import React, { Component } from 'react';
import { Col, Button, Form } from "react-bootstrap";
import { login } from '../util/APIUtils';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../constants';
import toast from "toasted-notes";
import Loading from '../components/Loading';
import WOW from "wow.js";
import page_banner from "../img/library.jpeg"

class Login extends Component {
    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.state = {
            usernameOrEmail: '',
            password: '',
            loading: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameOrEmailChange = this.handleUsernameOrEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.validate = this.validate.bind(this);
    }

    handleUsernameOrEmailChange(event) {
        this.setState({ usernameOrEmail: event.target.value })
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value })
    }

    validate() {
        return this.form.current.reportValidity();
    }

    componentDidMount() {
        const wow = new WOW();
        wow.init();
    }

    handleSubmit(event) {
        event.preventDefault();
        const err = !this.validate();
        this.setState({ loading: true })
        if (!err) {
            const loginRequest = this.state;
            login(loginRequest)
                .then(response => {
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                    this.props.onLogin();
                }).catch(error => {
                    this.setState({ loading: false })
                    if (error.status === 401) {
                        toast.notify('Your Username or Password is incorrect. Please try again!', { position: "top-right" });
                    } else {
                        toast.notify('Sorry! Something went wrong. Please try again!', { position: "top-right" });
                    }
                });
        }
    }

    render() {
        const { loading } = this.state;
        return (
            <React.Fragment>
                {loading ? <Loading /> : (
                    <div className="pageHeader loginPage text-left" style={{ backgroundImage: `url(${page_banner})` }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 serif">
                                    <div className="container w-50 mt-5">
                                        <h4 className="mt-5 mb-5 text-left wow fadeIn"><br /> Login to your account</h4>
                                        <Form ref={this.form} onSubmit={this.handleSubmit} className="authForm">
                                            <Form.Group className="row wow fadeIn" controlId="formPlaintextUsernameOrEmail">
                                                <Col sm="12">
                                                    <Form.Control type="text" placeholder="Username or e-mail" required onChange={this.handleUsernameOrEmailChange} />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group className="row wow fadeIn" data-wow-delay="0.1s" controlId="formPlaintextPassword" >
                                                <Col sm="12">
                                                    <Form.Control type="password" placeholder="Password" required onChange={this.handlePasswordChange} />
                                                </Col>
                                            </Form.Group>

                                            <Button className="mt-4 btn-orange wow fadeIn" data-wow-delay="0.2s" variant="primary" type="submit" block>
                                                Login
                                            </Button>
                                            <br />
                                            <span className="wow fadeIn" data-wow-delay="0.3s">
                                                Don't have an account? <Link to="/signup" className="text-orange">Signup now!</Link>
                                            </span>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )}
            </React.Fragment>
        );
    }
}


export default Login;