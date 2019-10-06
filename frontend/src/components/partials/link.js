import React from 'react';

// Deps
import { Link, NavLink } from 'react-router-dom'
import omit from 'lodash/omit'
import { isDefined } from 'functions/helpers'
import { getRoute } from 'controllers/navigator'
import { generatePath } from 'react-router'
import queryString from 'query-string';

export default class LinkItem extends React.Component {
	render() {
		let to = this.props.href;
		let props = omit(this.props, ['href', 'type', 'navLink', 'params', 'routeGroup', 'activeClassName', 'hash', 'query']);
		let params = this.props.params;
		let content = this.props.children;
		let type = this.props.type;
		let Elem = Link;

		if (this.props.navLink) {
			Elem = NavLink;
			props.activeClassName = this.props.activeClassName
		}

		switch (type) {
			case "a":
				props.href = to ? to : '';
				Elem = 'a';
				break;
			case "route":
				props.to = to ? to : '';
				break;
			default: // link
				let target = getRoute(this.props.href, this.props.routeGroup);

				if (target) {

					if (target.exact && this.props.navLink && !isDefined(props.exact)) { props.exact = true; }
					content = (this.props.children ? this.props.children : (target.linkTitle ? target.linkTitle : target.title));

					if (target.path) {
						props.to = target.path ? target.path : ''
						if (params) {
							/*for(let k = 0; k < Object.keys(params).length; k++){
								let key = Object.keys(params)[k];
								props.to = props.to.replace(':'+key+'?', params[key]).replace(':'+key, params[key]);
							}*/

							try {
								let newTo = generatePath(props.to, params);
								props.to = newTo;
							}
							catch {
								//console.log('noo', props.to, params);
							}
						}
					}
					else {
						props.to = "-";
					}
				}
				else {
					props.to = this.props.href ? this.props.href : '';
				}

				props.to = props.to ? props.to.split('/:')[0] : '';

				break;
		}

		if (this.props.hash) {
			props.to = props.to + "#" + this.props.hash;
		}

		if (this.props.query) {
			props.to += '?' + queryString.stringify(this.props.query);
		}

		return <Elem {...props}>{content}</Elem>
	}
}

LinkItem.defaultProps = {
	navLink: false,
	params: false,
	hash: false,
	type: 'link',
	routeGroup: 'pages',
	activeClassName: 'active',
}