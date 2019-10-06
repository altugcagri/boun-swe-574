import React from 'react';

// Partials
//import PopInfo from 'components/partials/popinfo.js';

// Deps
//import omit from 'lodash/omit'

// Assets

export default class Collapse extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: props.open,
			wrapHeight: 0,
			active: props.open,
			show: props.open,
			shown: props.open,
		};

		this.update = this.update.bind(this);
		this.wrapper = React.createRef();
	}

	componentDidUpdate(prevProps){
		if(prevProps.open !== this.props.open){
			this.update();
		}
	}

	componentDidMount(){
		this.update();
	}

	update() {
		let vm = this;
		if(vm.props.open){
			vm.setState({ active: true });
			setTimeout(function() {
				vm.setState({ wrapHeight: vm.wrapper.current.offsetHeight });
				vm.setState({ show: true });
				setTimeout(function() {
					vm.setState({ shown: true, wrapHeight: 'none' });
				}, 300);
			}, 30);
		}
		else{
			vm.setState({ wrapHeight: vm.wrapper.current.offsetHeight });
			setTimeout(function() {
				vm.setState({ show: false, shown: false });
				setTimeout(function() {
					vm.setState({ active: false });
				}, 300);
			}, 20);
		}
	}

	render() {
		let vm = this;
		let classes = "collapse " + vm.props.className + (vm.state.active ? ' active' : '') + (vm.state.show ? ' show' : ' hide') + (vm.state.shown ? ' shown' : '');

		return (
			<div className={classes} style={{maxHeight: vm.state.wrapHeight}}>
				<div className="collapse-innerwrap" ref={vm.wrapper}>
					{vm.props.children}
				</div>
			</div>
		)
	}
}

Collapse.defaultProps = {
	className : '',
	open: false,
};

export class CollapseGroup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: props.open,
		};

		this.toggle = this.toggle.bind(this);
	}

	toggle(){
		this.setState({open: !this.state.open});
	}

	render() {
		let vm = this;
		let classes = "collapse-group " + vm.props.className + (vm.state.open ? ' open' : ' closed');

		return (
			<div className={classes}>
				<button className="collapse-group-trigger" onClick={this.toggle}>{this.props.label}</button>
				<Collapse className="collapse-group-collapse" open={this.state.open}>{this.props.children}</Collapse>
			</div>
		)
	}
}

CollapseGroup.defaultProps = {
	className: '',
	open: false,
	label: "...",
};