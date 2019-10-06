import React from 'react'

// Deps
import { closeModal } from 'functions/modals'
import parse from 'html-react-parser'

export default class TextModal extends React.Component {
	optionClick(opt) {
		if (opt.onClick) {
			opt.onClick();
			if (opt.closeOnClick) {
				closeModal();
			}
		}
		else {
			closeModal();
		}
	}

	render() {
		let vm = this;
		return (
			<div className={vm.props.className}>
				{vm.props.closeBtn}
				<div className="modal-innercontent">
					{vm.props.title && <h1 className="text-title">{vm.props.title}</h1>}
					<div className="text-content wysiwyg">
						{parse(vm.props.content)}
					</div>
				</div>
			</div>
		)
	}
}

TextModal.defaultProps = {
	className: "",
	containerClass: "modal-text",
	name: "text",
	title: false,
	content: false,
}