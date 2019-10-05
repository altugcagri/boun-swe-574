import React from 'react'

// Deps
import RSelect from 'react-select'
import omit from 'lodash/omit'

export default class Select extends React.Component {
	render() {
		let props = omit(this.props, ['className', 'theme']);
		let className = this.props.className + ' ' + this.props.theme;
		props.classNamePrefix = this.props.theme;

		return (
			<RSelect
				className={className}
				{...props} />
		)
	}
}

Select.defaultProps = {
	theme: "minoto-select",
	className: "",
}