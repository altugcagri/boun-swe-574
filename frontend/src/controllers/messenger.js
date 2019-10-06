import React from 'react'

// Deps
import { connect } from "react-redux"
import isEqual from "lodash/isEqual"
import extend from "lodash/extend"
import store from "data/store";
import { uid } from "functions/helpers";
import { addMessage, clearMessages } from "data/store.generic"

const mapStateToProps = state => {
	return {
		messages: state.generic.messages,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		clearMessages: () => dispatch(clearMessages())
	}
}

class MessengerWrap extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			messages: props.messages
		}

		this.removeMessage = this.removeMessage.bind(this);
	}

	componentDidUpdate(prevProps){
		if(!isEqual(prevProps.messages, this.props.messages) && this.props.messages.length){
			this.setState({messages: [...this.props.messages, ...this.state.messages]});
			this.props.clearMessages();
		}
	}

	removeMessage(id){
		this.setState({messages: this.state.messages.filter((msg) => {
			return (msg.id === id ? false : true);
		})});
	}

	render() {
		if(this.state.messages.length){
			return (
				<div className="messenger-container">
					{this.state.messages.map((message, nth) => (
						<MessengerItem message={message} onRemove={this.removeMessage} key={message.id} />
					))}
				</div>
			)
		}
		else return false;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MessengerWrap);

class MessengerItem extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			show: false,
		}
	}

	componentDidMount(){
		let vm = this;

		setTimeout(function() {
			vm.setState({show: true});
		}, 10);

		setTimeout(function() {
			vm.setState({show: false});
			setTimeout(function() {
				vm.props.onRemove(vm.props.message.id);
			}, 401);
		}, vm.props.message.delay);
	}

	render() {
		let msg = this.props.message
		return (
			<div className={"messenger-message " + msg.type + (this.state.show ? ' show' : '')}>{msg.message}</div>
		)
	}
}

export function pushMessage(message = "", opts = {}){
	let defaultOpts = {
		id: uid('messenger'),
		type: "success",
		delay: 3000,
		message: message,
	}

	let data = extend({}, defaultOpts, opts);

	store.dispatch(addMessage(data));

}