import React from 'react'

//Deps
import Scrollbar from 'react-scrollbars-custom';
import omit from 'lodash/omit';
import extend from 'lodash/extend';

export default class ScrollWrap extends React.Component {

	/*constructor(props) {
		super(props);

		this.state = {
			opts: this.setOpts()
		};
	}*/

	componentDidMount() {

	}

	componentDidUpdate(prevProps, prevState) {
	}

	render() {
		let vm = this;

		let defaultProps = {
			className: 'scrollwrap-container ' + vm.props.className,
			translateContentSizeYToHolder: true,
			removeTrackXWhenNotUsed: true,
			noDefaultStyles: true,
			noScrollX: true,
			createContext: true,
		};

		let props = extend(defaultProps, omit(vm.props, ['className', 'instance']));

		if (vm.props.instance) {
			props.ref = vm.props.instance;
		}

		return (
			<Scrollbar {...props}>
				{vm.props.children}
			</Scrollbar>
		)
	}
}

ScrollWrap.defaultProps = {
	className: "",
};