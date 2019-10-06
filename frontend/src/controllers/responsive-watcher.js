import React from 'react';
//Deps
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";
import store from "data/store";
import { setMobile, setWw, setScrollPos } from "data/store.generic";

const mapStateToProps = state => {
	return {
		mobileBreakPoint: state.generic.mobileBreakPoint,
		mobile: state.generic.mobile,
		scrollPos: state.generic.scrollPos,
	};
};

class ResponsiveWatcher extends React.Component {
	constructor(props){
		super(props);

		this.resize = debounce(this.resize.bind(this), 50);
		this.scroll = throttle(this.scroll.bind(this), 70);

		this.isMobile = this.getMobileState();
		this.scrollPos = this.getScrollPos;

	}

	resize(){
		let vm = this;
		let newState = vm.getMobileState();
		if(vm.isMobile !== newState){
			window.isMobile = newState;
			vm.isMobile = newState;
			store.dispatch(setMobile(newState));
		}
		
		store.dispatch(setWw(window.innerWidth));
	}

	scroll(){
		let vm = this;
		let newState = vm.getScrollPos();
		if(vm.scrollPos !== newState){
			window.scrollPos = newState;
			vm.setState({scrollPos: newState});
			store.dispatch(setScrollPos(newState));
		}
	}

	getMobileState() {
		if(window.innerWidth <= this.props.mobileBreakPoint){
			return true;
		}
		else{
			return false;
		}
	}

	getScrollPos(){
		return window.scrollY || window.pageYOffset;
	}

	componentDidMount(){
		window.addEventListener('resize', this.resize);
		window.addEventListener('scroll', this.scroll);
		this.resize();
	}

	componentWillUnmount(){
		window.removeEventListener('resize', this.resize);
	}

	render() {
		return (this.props.children ? this.props.children : false);
	}
}

export default connect(mapStateToProps)(ResponsiveWatcher);