import React from 'react';
import PropTypes from 'prop-types';

// Partials
import PopInfo from 'components/partials/popinfo.js';
import Link from 'components/partials/link.js';

// Deps
import omit from 'lodash/omit'
import clone from 'lodash/clone'

// Assets

export default class Btn extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			statusActive: props.status !== false,
			statusShow: props.status !== false,
			status: (props.loading ? 'loading' : props.status),
		}

		this.clicked = this.clicked.bind(this);

		this.loadingTimeout = false;
	}

	componentDidUpdate(prevProps) {
		let vm = this;


		if (prevProps.status !== vm.props.status || prevProps.loading !== vm.props.loading) {
			let newProps = clone(vm.props);
			newProps.status = (newProps.loading ? 'loading' : newProps.status);

			if (vm.loadingTimeout) {
				clearTimeout(vm.loadingTimeout);
				vm.loadingTimeout = false;
			}

			if (newProps.status) {
				if (prevProps.status !== false) {
					vm.setState({ statusShow: false });
					vm.loadingTimeout = setTimeout(function () {
						vm.setState({ status: newProps.status });
						setTimeout(function () {
							vm.setState({ statusShow: true });
						}, 30);
					}, 130)
				}
				else {
					vm.setState({ statusActive: true, status: newProps.status });
					vm.loadingTimeout = setTimeout(function () {
						vm.setState({ statusShow: true });
					}, 30)
				}
			}
			else {
				vm.setState({ statusShow: false });
				vm.loadingTimeout = setTimeout(function () {
					vm.setState({ statusActive: false, status: false });
				}, 380);
			}
		}
	}

	clicked(e) {
		if (!e.nativeEvent.target.classList.contains('popinfo-wrap')) {
			if (this.props.onClick) {
				this.props.onClick(e);
			}
		}
	}

	render() {
		let vm = this;
		let Elem = false;

		switch (vm.props.tag) {
			case 'link':
				Elem = Link;
				break;
			default:
				Elem = vm.props.tag;
				break;
		}
		let props = omit(vm.props, [
			// Data
			'tag', 'icon', 'leftIcon', 'rightIcon', 'note', 'status', 'onClick',
			// Colors
			'hollow', 'primary', 'white', 'dark', 'text',
			// Forms & Styling
			'light', 'block', 'uppercase', 'low', 'small', 'wide', 'big', 'smallIcon', 'loading']);

		props.onClick = vm.clicked;

		let leftIcon = (vm.props.leftIcon ? vm.props.leftIcon : (vm.props.icon ? vm.props.icon : false));
		let rightIcon = (vm.props.rightIcon ? vm.props.rightIcon : false);

		if (vm.props.block) { props.className += ' block'; }

		if (vm.props.primary) { props.className += ' primary'; }
		if (vm.props.white) { props.className += ' white'; }
		if (vm.props.dark) { props.className += ' dark'; }
		if (vm.props.text) { props.className += ' text'; }

		if (vm.props.hollow) { props.className += ' hollow'; }
		if (vm.props.light) { props.className += ' light'; }
		if (vm.props.uppercase) { props.className += ' uppercase'; }
		if (vm.props.low) { props.className += ' low'; }
		if (vm.props.small) { props.className += ' small'; }
		if (vm.props.wide) { props.className += ' wide'; }
		if (vm.props.big) { props.className += ' big'; }
		if (vm.props.smallIcon) { props.className += ' small-icon'; }

		if (vm.props.note) { props.className += ' has-info'; }

		if (vm.state.statusShow) { props.className += ' show-status'; }
		if (vm.state.status) { props.className += ' status-' + vm.state.status; }

		if (Elem === 'button') { props.type = (vm.props.type ? vm.props.type : 'button'); }

		props.className += ' btn';
		if (vm.props.children) {
			return (
				<Elem {...props}>
					<span className="btn-content">
						{leftIcon && <i className={"btn-icon pre icon-" + leftIcon}></i>}
						{vm.props.children}
						{rightIcon && <i className={"btn-icon post icon-" + rightIcon}></i>}

						{vm.props.note &&
							<PopInfo className="btn-info icon-question" content={vm.props.note} tag="i" nowrap></PopInfo>
						}

					</span>
					{vm.state.statusActive &&
						<span className="btn-statuswrap">
							{vm.state.status === 'loading' &&
								<i className="btn-loader icon-spinner"></i>
							}
							{vm.state.status !== 'loading' &&
								<i className={"btn-status icon-" + vm.state.status}></i>
							}
						</span>
					}
				</Elem>
			)
		}
		else {
			return (
				<Elem {...props} />
			)
		}
	}
}

Btn.defaultProps = {
	className: '',
	icon: false,
	leftIcon: false,
	rightIcon: false,
	note: false,
	loading: false,
	status: false,
	tag: 'button',
};

Btn.propTypes = {
	loading: PropTypes.bool
}