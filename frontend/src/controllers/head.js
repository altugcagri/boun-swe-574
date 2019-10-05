import defaults from "data/config";

export function setTitle(title, postTitle = undefined) {
	if (postTitle === undefined || postTitle === true) { postTitle = defaults.postTitle; }
	// const seperator = " | ";
	const seperator = " | ";

	if (title !== "") {
		title = title + (postTitle !== false ? (seperator + postTitle) : '');
	}
	else {
		title = postTitle
	}

	document.title = title;
	setHead([{
		key: "meta",
		props: {
			property: "og:title",
			content: title,
		}
	}])
}

export function setDescription(description) {
	let rawDescription = description.replace(/(\r\n|\n|\r)/gm, ' ');

	setHead([
		{
			key: "meta",
			props: {
				name: "description",
				content: rawDescription,
			}
		},
		{
			key: "meta",
			props: {
				property: "og:description",
				content: rawDescription,
			}
		}
	])
}

export function setMeta(meta, clear = false) {
	let head = document.getElementsByTagName('head')[0];
	let k = 0;
	if (clear) {
		let oldTags = head.querySelectorAll('*[data-dynamic-meta]');
		for (k = 0; k < oldTags.length; k++) {
			head.removeChild(oldTags[k]);
		}
	}

	if (meta) {
		let metaKeys = Object.keys(meta);
		for (k = 0; k < metaKeys.length; k++) {
			let metaObj = document.createElement('META');
			metaObj.name = metaKeys[k];
			metaObj.content = meta[metaKeys[k]];
			metaObj.setAttribute('data-dynamic-meta', 'true');
			head.appendChild(metaObj);
		}
	}
}

export function setHead(meta, clear = false) {
	let head = document.getElementsByTagName('head')[0];
	let k = 0;
	if (clear) {
		let oldTags = head.querySelectorAll('*[data-custom-meta]');
		for (k = 0; k < oldTags.length; k++) {
			head.removeChild(oldTags[k]);
		}
	}

	if (meta) {
		for (k = 0; k < meta.length; k++) {
			let customData = meta[k];
			let customObj = document.createElement(customData.key);
			if (customData.content) { customObj.innerHTML = customData.content }
			let customProps = Object.keys(customData.props);

			for (let p = 0; p < customProps.length; p++) {
				let propKey = customProps[p];
				let propVal = customData.props[propKey]
				if (propKey === "property" || propKey === "name") {
					let oldTag = head.querySelector(customData.key + '[' + propKey + '="' + propVal + '"]');
					if (oldTag) {
						head.removeChild(oldTag)
					}
				}

				customObj.setAttribute(propKey, propVal);
			}
			customObj.setAttribute('data-custom-meta', 'true');
			head.appendChild(customObj);
		}
	}
}