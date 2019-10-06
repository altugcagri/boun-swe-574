import React from 'react';
//Deps
import { connect } from "react-redux";

class Responsive extends React.Component {
	constructor(props) {
		super(props);
		let vm = this;

		vm.state = {
			resizeFunct: null,
		};
	}

	render() {
		var vm = this;
		if(vm.props.type === "web-mobile"){
			if(!vm.props.mobile){
				return(
					vm.props.children[0]
				)
			}
			else if(vm.props.mobile && vm.props.children[1]){
				return(
					vm.props.children[1]
				)
			}
			else{ return false; }
		}
		else if(vm.props.type === "only-mobile"){
			if(vm.props.mobile){
				return vm.props.children;
			}
			else{ return false; }
		}
		else if(vm.props.type === "only-web"){
			if(!vm.props.mobile){
				return vm.props.children;
			}
			else{ return false; }
		}
		else{
			return(
				<span>Responsive.js warning: Invalid type</span>
			)
		}
	}
}

Responsive.defaultProps = {
	type: "web-mobile",
};

const mapStateToProps = state => {
	return { mobile: state.generic.mobile };
};

export default connect(mapStateToProps)(Responsive);