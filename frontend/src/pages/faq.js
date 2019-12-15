import React from 'react'

// Partials
import { CollapseGroup } from 'components/partials/collapse'
import PageHeader from "components/partials/page-header";
import page_banner from "assets/images/kitchen.jpeg"
import Loading from "components/loading";
import { changePage } from "controllers/navigator"
import { connect } from "react-redux";

const mapStateToProps = state => {
	return {
		currentPage: state.generic.currentPage,
		user: state.user.user,
		unreadMessageCount: state.user.unreadMessageCount
	};
};

class Faq extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
	}
	componentDidMount() {
		let vm = this;
		setTimeout(function () {
			vm.setState({ loading: false });
			changePage(false, "pages", vm.props.user);
		}, 300)
	}
	render() {
		const { loading } = this.state;
		return (
			<React.Fragment>
				{loading ? (
					<Loading />
				) : (
						<React.Fragment>
							<PageHeader title="FAQ" bg={page_banner} className="bespoke-faq-header" intro="We might already have an answer to what's on your mind. Maybe." />
							<main className="page content bespoke-faq-content">
								<div className="container">
									<div className="row">
										<div className="col-md-12">
											<section className="section contentpage">
												<div className="contentpage-wrap wrapper narrow">
													<div className="contentpage-content">
														<h1 className="content-title bespoke-faq-title-h1">Frequently asked questions</h1>
														<ul className="section contentpage-faq">
															<li className="faq-item bespoke-faq-item-1">
																<CollapseGroup label="Who can create a content?">
																	<div className="wysiwyg">
																		<p className="bespoke-faq-item-1-p">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
																	</div>
																</CollapseGroup>
															</li>
															<li className="faq-item bespoke-faq-item-2">
																<CollapseGroup label="Who can create a content?">
																	<div className="wysiwyg">
																		<p className="bespoke-faq-item-2-p">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
																	</div>
																</CollapseGroup>
															</li>
															<li className="faq-item bespoke-faq-item-3">
																<CollapseGroup label="Who can create a content?">
																	<div className="wysiwyg">
																		<p className="bespoke-faq-item-3-p">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
																	</div>
																</CollapseGroup>
															</li>
														</ul>
													</div>
												</div>
											</section>
										</div>
									</div>
								</div>
							</main>
						</React.Fragment>
					)}
			</React.Fragment>
		)
	}
}

export default connect(mapStateToProps)(Faq);