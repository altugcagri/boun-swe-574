import React from 'react'

// Partials
import Link from 'components/partials/link'
import Loader from 'components/partials/loader'

// Deps
import request from 'controllers/request'
import { updateUserData } from "data/store.user.js"

export default class ConfirmForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			submitting: false,
			complete: false,
			error: false,
		}
	}

	componentDidMount() {
		let vm = this;

		request.get('users/control-token/registration/' + vm.props.email + '/' + vm.props.token, {}, function (payload) {
			if (payload && payload.success) {

				vm.setState({
					loading: false,
					complete: true,
				});

				if (payload.userData) {
					setTimeout(function () {
						updateUserData(payload);
					}, 3000); /// Dummy Delay

				}
			}
			else {
				vm.setState({
					loading: false,
					error: true,
				});
			}
		});
	}

	render() {
		let vm = this;


		if (vm.state.complete) {
			return (
				<div className="section loginform type-self">
					<h2 className="loginform-title">E-Posta Adresiniz Onaylandı</h2>

					<div className="loginform-info wysiwyg">
						<p><strong>Hesabınız başarıyla aktive edildi.</strong></p>
						<p>Hesabım sayfasından hesap bilgilerinizi düzenleyebilir, anasayfadan araç bakmaya hemen başlayabilirsiniz.</p>
					</div>
					<div className="loginform-nav center">
						<Link href="home" className="nav-btn">Ana Sayfaya Git</Link>
						<Link href="account" className="nav-btn">Hesabım Sayfasına Git</Link>
					</div>
				</div>
			)
		}
		else {
			return (
				<div className="section loginform loader-container type-self">
					<Loader loading={vm.state.loading} strict />
					<h2 className="loginform-title">E-Posta Adresinizi Onaylayın</h2>

					{vm.state.error ?
						<React.Fragment>
							<div className="loginform-message error">
								<span>Eriştiğiniz onay bilgileri hatalı.</span>
							</div>
							<div className="loginform-nav center">
								<Link href="home" className="nav-btn"><i className="icon-arrow-left"></i> Ana Sayfaya Git</Link>
							</div>
						</React.Fragment>
						:
						<div className="loginform-message">
							<span>Bilgileriniz kontrol ediliyor.</span>
						</div>
					}

				</div>
			)
		}
	}
}