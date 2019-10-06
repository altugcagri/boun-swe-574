import extend from "lodash/extend"
import { storagePath, apiBase, API_BASE_URL } from "../config"
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import endpoints from "./endpoints.json";

export function formatDate(dateString) {
	const date = new Date(dateString);

	const monthNames = [
		"January", "February", "March",
		"April", "May", "June", "July",
		"August", "September", "October",
		"November", "December"
	];

	const monthIndex = date.getMonth();
	const year = date.getFullYear();

	return monthNames[monthIndex] + ' ' + year;
}

export function formatDateTime(dateTimeString) {
	const date = new Date(dateTimeString);

	const monthNames = [
		"Jan", "Feb", "Mar", "Apr",
		"May", "Jun", "Jul", "Aug",
		"Sep", "Oct", "Nov", "Dec"
	];

	const monthIndex = date.getMonth();
	const year = date.getFullYear();

	return date.getDate() + ' ' + monthNames[monthIndex] + ' ' + year + ' - ' + date.getHours() + ':' + date.getMinutes();
}

export function resolveEndpoint(key, slugs = {}) {
	let finalUrl = endpoints[key];
	if (slugs.length) {
		for (let i = 0; i < slugs.length; i++)
			finalUrl = finalUrl.replace(`[slug${i + 1}]`, slugs[i][`slug${i + 1}`])
	}
	return API_BASE_URL + `${finalUrl}`;;
}

export function scrollTo(inputOpts, endFunction = false) {
	let defaultOpts = {
		to: 0,
		offset: 0,
		duration: 'auto',
		easing: true,
		target: 'body',
		axis: 'y',
	}

	let opts = extend({}, defaultOpts, inputOpts);

	if (!isDefined(window.scrollTimeout)) {
		window.scrollTimeout = {};
	}

	let id = 'body';

	if (opts.target !== 'body') {
		if (!opts.target.hasAttribute('id')) {
			opts.target.id = uid();
		}

		id = opts.target.id;
	}

	if (!isDefined(window.scrollTimeout[id])) {
		window.scrollTimeout[id] = null;
	}

	let to = opts.to;
	let offset = opts.offset;
	let duration = opts.duration;
	let easing = opts.easing;

	let axisString = (opts.axis === 'y' ? 'Top' : 'Left');
	//let sizeString = (opts.axis === 'y' ? 'Height' : 'Width');

	if (to !== parseFloat(to, 10)) {
		if (opts.target === 'body') {
			to = to.getBoundingClientRect()[axisString.toLowerCase()] + document.documentElement['scroll' + axisString];
		}
		else {
			to = to['offset' + axisString];
		}
		//to = to.offsetTop + window.innerHeight;
	}

	to = to + offset;

	if (duration === 0) {
		if (opts.target === 'body') {
			document.documentElement['scroll' + axisString] = to;
			document.body['scroll' + axisString] = to;
		}
		else {
			opts.target['scroll' + axisString] = to;
		}
	}
	else {
		let start = (opts.target === 'body' ? Math.max(document.body['scroll' + axisString], document.documentElement['scroll' + axisString]) : opts.target['scroll' + axisString]),
			change = to - start,
			currentTime = 0,
			increment = 20;

		if (duration === 'auto') {
			let distance = Math.abs(start - to);

			let multiplier = .8;

			if (distance < 500) {
				multiplier = 1.2;
			}
			if (distance > 1500) {
				multiplier = .5;
			}
			duration = distance * multiplier;

			if (duration < 500) { duration = 500; }
			if (duration > 900) { duration = 900; }
		}
		var animateScroll = function () {
			if (window.scrollTimeout[id] !== null) {
				clearTimeout(window.scrollTimeout[id]);
				window.scrollTimeout[id] = null;
			}
			currentTime += increment;
			//console.log(currentTime);
			var val = 0;
			if (easing) {
				val = Math.easeInOutQuad(currentTime, start, change, duration);
			}
			else {
				val = Math.linearTween(currentTime, start, change, duration);
			}
			if (opts.target === 'body') {
				document.documentElement['scroll' + axisString] = val;
				document.body['scroll' + axisString] = val;
			}
			else {
				opts.target['scroll' + axisString] = val;
			}

			if (currentTime < duration) {
				window.scrollTimeout[id] = setTimeout(animateScroll, increment);
			}
			else if (endFunction !== false) {
				endFunction();
			}
		};
		animateScroll();
	}
}

export function formatNumber(num, opts = {}) {
	let options = extend({}, {
		showDecimals: false,
		decimals: 2
	}, opts)
	let plainNum = Math.trunc(num);
	let result = plainNum.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

	if (options.showDecimals) {
		result += (num - plainNum).toFixed(options.decimals).toString().replace('.', ',').replace('0,', ',');
	}
	return result;
}

export function imageLoad(src, returnFunction, additionalData = null) {
	let img = new Image();
	img.onload = function () {
		returnFunction(additionalData);
	}
	img.src = src;
	if (img.complete) {
		img.onload();
	}
}

export function uid(prefix = 'uid') {
	if (!isDefined(window._uidList)) {
		window._uidList = [];
	}
	let id = getid(prefix);

	return id;

	function getid(prefix) {
		let id = prefix + '_' + Math.random().toString(36).substr(2, 9);

		if (window._uidList.includes(id)) {
			id = getid(prefix);
		}
		return id;
	}
}

export function isDefined(variable) {
	return !(typeof variable === 'undefined' || variable === null);
}

export function serializeArray(form, seperator = ',', ignoreEmpty = false) {
	var serialized = {};
	let elements = (form.elements ? form.elements : form.querySelectorAll('input, textarea, select'));
	for (var i = 0; i < elements.length; i++) {

		var field = elements[i];
		if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

		if (field.type === 'select-multiple') {
			for (var n = 0; n < field.options.length; n++) {
				if (!field.options[n].selected) continue;
				let val = field.options[n].value;

				if (!(ignoreEmpty && val === '')) {
					let name = field.name.replace('[]', '');
					if (serialized[name] && name + '[]' === field.name) {
						val = serialized[name] += seperator + val;
					}
					serialized[name] = val;
				}

				//serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value));
			}
		}

		else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
			let val = field.value;

			if (!(ignoreEmpty && val === '')) {
				let name = field.name.replace('[]', '');
				if (serialized[name] && name + '[]' === field.name) {
					val = serialized[name] += seperator + val;
				}
				serialized[name] = val;
			}
			//serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
		}
	}

	return serialized;
};

export function serialize(form, seperator = ',', ignoreEmpty = false) {
	var data = serializeArray(form, seperator, ignoreEmpty);
	var serialized = [];

	for (let k = 0; k < Object.keys(data).length; k++) {
		let key = Object.keys(data)[k];
		serialized.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
	}
	return serialized.join('&');
}

export function blockOverflow(block = true, hamburger = false) {
	if (block) {
		let scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
		document.documentElement.style.marginRight = scrollBarWidth + 'px'
		document.body.classList.add('block-overflow');
		if (hamburger) {
			disableBodyScroll(document.querySelector('.ScrollbarsCustom-Wrapper *'));
		} else {
			disableBodyScroll(document.querySelector('.filters-content *'));
		}
	}
	else {
		document.documentElement.style.marginRight = ''
		document.body.classList.remove('block-overflow');
		if (hamburger) {
			enableBodyScroll(document.querySelector('.ScrollbarsCustom-Wrapper *'));
		} else {
			enableBodyScroll(document.querySelector('.filters-content *'));
		}
		clearAllBodyScrollLocks();
	}
}

export function loadScript(url, endFunction) {
	var script = document.createElement("script");
	script.src = url;
	if (isDefined(endFunction())) {
		script.onload = function () {
			endFunction();
		};
	}
	document.getElementsByTagName("body")[0].appendChild(script);
}

export function isExact(object1, object2) {
	return JSON.stringify(object1) === JSON.stringify(object2);
}

export function storageSpace(folder, file) {
	if (file === '' || file === null) {
		return false;
	}
	if (storagePath === 'https://res.cloudinary.com') {
		return `${storagePath}${folder}/${file}${file.substring(file.length - 4)}`;
	}
	return `${storagePath}${folder}/${file}`;
}

export function apiPath(endpoint) {
	return `${apiBase}${endpoint}`;
}

export function nl2br(str, is_xhtml) {
	var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
	return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

export function remToPx(num) {
	return num * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export function pxToRem(num) {
	return num / parseFloat(getComputedStyle(document.documentElement).fontSize);
}

Math.linearTween = function (t, b, c, d) {
	return c * t / d + b;
};

Math.easeInOutQuad = function (t, b, c, d) {
	t /= d / 2;
	if (t < 1) return c / 2 * t * t + b;
	t--;
	return -c / 2 * (t * (t - 2) - 1) + b;
};

function findAndReplace(string, find, replace) {
	for (let i = 0; i < find.length; i++) {
		string = string.replace(find[i], replace[i])
	}
	return string;
}

export function seoFriendlyUrl(string) {
	let turkish = ["ı", "ğ", "ü", "ş", "ö", "ç", "İ", "Ğ", "Ü", "Ş", "Ö", "Ç"];
	let english = ["i", "g", "u", "s", "o", "c", "i", "g", "u", "s", "o", "c"];
	string = findAndReplace(string, turkish, english);
	string = findAndReplace(string, ['[\', \']'], ['', '']);
	//string = findAndReplace(string, ['/\[.*\]/U'], [''], '');
	string = findAndReplace(string, ['/&(amp;)?#?[a-z0-9]+;/i'], ['-']);
	string = findAndReplace(string, ['/&([a-z])(acute|uml|circ|grave|ring|cedil|slash|tilde|caron|lig|quot|rsquo);/i'], ['\\1']);
	string = findAndReplace(string, ["acute", "uml", "circ", "grave", "ring", "cedil", "slash", "tilde", "caron", "quot", "rsquo"], ["", "", "", "", "", "", "", "", "", "", "", ""]);
	string = findAndReplace(string, ['/[^a-z0-9]/i', '/[-]+/'], ['-', '-']);
	string = string.replace(/\s/g, "-");
	string = string.replace("---", "-");
	string = string.replace("---", "-");

	return string.trimRight('-').toLowerCase();

}