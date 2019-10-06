import React from 'react'

// Partials
import Btn from 'components/partials/btn'

// Deps
import { closeModal } from 'functions/modals'
import parse from 'html-react-parser'
import extend from 'lodash/extend'

export default class OptionsModal extends React.Component {
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
				<div className="modal-innercontent">
					{vm.props.title &&
						<h1 className="options-title">{vm.props.title}</h1>
					}{vm.props.question &&
						<div className={"options-question" + (vm.props.wysiwyg ? ' wysiwyg' : '')}>{parse(vm.props.question.replace(/(?:\r\n|\r|\n)/g, '<br />'))}</div>
					}

					<div className="options-opts">
						{vm.props.opts.map((opt, nth) => {
							let optDefaults = {
								onClick: false,
								className: 'dark',
								closeOnClick: true,
							}
							opt = extend({}, optDefaults, opt);
							return (
								<Btn key={nth} className={'opts-item ' + opt.className} onClick={() => { vm.optionClick(opt) }}>{opt.text}</Btn>
							)
						})}
					</div>
				</div>
			</div>
		)
	}
}

OptionsModal.defaultProps = {
	className: "",
	containerClass: "modal-options narrow",
	name: "options",
	preventClose: true,
	title: false,
	question: false,
	wysiwyg: true,
	opts: []
}