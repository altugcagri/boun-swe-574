import React, { Component } from 'react';
import { signup } from '../util/APIUtils';
import { Link } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import toast from "toasted-notes";
import Loading from '../components/Loading';
import WOW from "wow.js";
import page_banner from "../img/library.jpeg"

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: ''
            },
            username: {
                value: ''
            },
            email: {
                value: ''
            },
            password: {
                value: ''
            },
            loading: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const wow = new WOW();
        wow.init();
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: {
                value: inputValue
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const signupRequest = {
            name: this.state.name.value,
            email: this.state.email.value,
            username: this.state.username.value,
            password: this.state.password.value
        };

        this.setState({ loading: true })

        signup(signupRequest)
            .then(response => {
                toast.notify("Thank you! You're successfully registered. Please Login to continue!", { position: "top-right" });
                this.props.history.push("/login");
            }).catch(error => {
                toast.notify('Sorry! Something went wrong. Please try again!', { position: "top-right" });
                this.setState({ loading: false })
            });
    }

    render() {
        const { loading } = this.state
        return (
            <React.Fragment>
                {loading ? <Loading /> : (
                    <div className="pageHeader loginPage text-left" style={{ backgroundImage: `url(${page_banner})` }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 serif">
                                    <div className="container w-50 mt-5">
                                        <h4 className="mt-5 mb-5 text-left wow fadeIn">Create new account</h4>
                                        <Form onSubmit={this.handleSubmit}>
                                            <Form.Group className="row wow fadeIn" controlId="formPlaintextFullName">

                                                <Col sm="12">
                                                    <Form.Control
                                                        name="name"
                                                        autoComplete="off"
                                                        placeholder="Full name"
                                                        value={this.state.name.value}
                                                        type="text"
                                                        onChange={(event) => this.handleInputChange(event)}
                                                    />
                                                    {this.state.name.validateStatus && <p className="text-info">{this.state.name.errorMsg}</p>}
                                                </Col>
                                            </Form.Group>

                                            <Form.Group className="row wow fadeIn" data-wow-delay="0.1s" controlId="formPlaintextUsername">

                                                <Col sm="12">
                                                    <Form.Control
                                                        name="username"
                                                        autoComplete="off"
                                                        placeholder="Username"
                                                        value={this.state.username.value}
                                                        onBlur={this.validateUsernameAvailability}
                                                        onChange={(event) => this.handleInputChange(event)}
                                                    />
                                                    {this.state.username.validateStatus && <p className="text-info">{this.state.username.errorMsg}</p>}
                                                </Col>
                                            </Form.Group>

                                            <Form.Group className="row wow fadeIn" data-wow-delay="0.2s" controlId="formPlaintextEmail">

                                                <Col sm="12">
                                                    <Form.Control
                                                        name="email"
                                                        type="email"
                                                        autoComplete="off"
                                                        placeholder="E-mail"
                                                        value={this.state.email.value}
                                                        onBlur={this.validateEmailAvailability}
                                                        onChange={(event) => this.handleInputChange(event)}
                                                    />
                                                    {this.state.email.validateStatus && <p className="text-info">{this.state.email.errorMsg}</p>}
                                                </Col>
                                            </Form.Group>

                                            <Form.Group className="row wow fadeIn" data-wow-delay="0.3s" controlId="formPlaintextPassword">

                                                <Col sm="12">
                                                    <Form.Control
                                                        name="password"
                                                        type="password"
                                                        autoComplete="off"
                                                        placeholder="Password"
                                                        value={this.state.password.value}
                                                        onChange={(event) => this.handleInputChange(event)}
                                                    />
                                                    {this.state.password.validateStatus && <p className="text-info">{this.state.password.errorMsg}</p>}
                                                </Col>
                                            </Form.Group>
                                            <Button
                                                className="mt-4 btn-orange wow fadeIn"
                                                data-wow-delay="0.4s"
                                                variant="primary"
                                                type="submit"
                                                block
                                            >
                                                Sign up
                                         </Button>
                                            <br />
                                            <span className="wow fadeIn" data-wow-delay="0.5s">
                                                Already have an account? <Link className="text-orange" to="/login">Login now!</Link>
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

export default Signup;