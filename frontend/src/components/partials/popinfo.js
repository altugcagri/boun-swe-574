import React from 'react';

// Deps
import { remToPx, pxToRem } from "functions/helpers"

class PopInfo extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			active: false,
			show: false,
			//rtl: props.rtl,
			compensation: false,
			upsideDown: props.upsideDown,
		}

		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);

		this.contentWrap = React.createRef();
		this.timeout = false;
	}

	show() {
		let vm = this;
		if (!this.state.show) {
			if (vm.timeout) {
				clearTimeout(vm.timeout);
				vm.setState({ active: false, rtl: false, upsideDown: vm.props.upsideDown });
			}

			vm.setState({ active: true, compensation: false });
			vm.timeout = setTimeout(function () {
				let rect = vm.contentWrap.current.getBoundingClientRect();
				let compensation = false;
				let upsideDown = vm.props.upsideDown;
				const safeZone = remToPx(1);
				/*let rtl = (vm.props.rtl ? 
					!(rect.x < safeZone)
					:
					((rect.x + rect.width) > (window.innerWidth - safeZone))
				);*/

				if (!vm.props.rtl) {
					//console.log(rect);
					//debugger;
					let diff = (window.innerWidth - safeZone) - (rect.x + rect.width);
					if (diff < 0) {
						compensation = diff;
					}
				}
				else if (rect.x < safeZone) {
					compensation = (rect.x < 0 ? (rect.x * -1) + safeZone : safeZone - rect.x);
				}

				if (!vm.props.upsideDown) {
					if ((rect.y + rect.height) > window.innerHeight - safeZone) {
						upsideDown = true;
					}
				}
				else {
					if (rect.y < safeZone) {
						upsideDown = false;
					}
				}

				vm.setState({ compensation: compensation, upsideDown: upsideDown });

				vm.timeout = setTimeout(function () {
					vm.setState({ show: true });
				}, 30);

				vm.timeout = false;
			}, 30);
		}
	}

	hide() {
		let vm = this;
		if (vm.timeout) {
			clearTimeout(vm.timeout);
		}

		vm.timeout = setTimeout(function () {
			vm.setState({ show: false });
			vm.timeout = setTimeout(function () {
				vm.setState({ active: false, rtl: false, upsideDown: vm.props.upsideDown });
				vm.timeout = false;
			}, 220);
		}, 60);
	}

	render() {
		let vm = this;
		let classes = 'popinfo-wrap ' + vm.props.className + (vm.props.nowrap ? ' nowrap' : '') + (vm.props.wide ? ' wide' : '');
		let Tag = vm.props.tag;

		let style = undefined;
		let popStyle = undefined;

		if (vm.state.compensation) {
			style = { marginLeft: pxToRem(vm.state.compensation) + "rem" }
			popStyle = { marginLeft: pxToRem(vm.state.compensation) * -1 + "rem" }
		}

		return (
			<Tag className={classes} onMouseOver={vm.show} onMouseLeave={vm.hide}>
				{vm.props.children}
				{vm.state.active &&
					<div className={"popinfo-content" + (vm.state.show ? ' show' : '') + (vm.props.rtl ? ' rtl' : '') + (vm.state.upsideDown ? ' upside-down' : '')} style={style} ref={this.contentWrap}>
						<div className="popinfo-text">{vm.props.content}</div>
						<div className="popinfo-bg">
							<i className="bg-pop" style={popStyle}></i>
						</div>
					</div>
				}

			</Tag>
		);
	}
}

export default PopInfo;

PopInfo.defaultProps = {
	className: '',
	content: '',
	nowrap: false,
	rtl: false,
	tag: 'button',
	wide: false,
};