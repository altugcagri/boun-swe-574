export function validation(value, controls = ['required']) {
	let error = false;

	if (controls === true) {
		controls = ['required'];
	}
	// Shorthand for required message
	else if (typeof controls === 'string' || controls instanceof String) {
		controls = [
			['required', controls]
		];
	} else if (!Array.isArray(controls)) {
		controls = Object.keys(controls).map(function (objectKey, index) {
			let data = [controls[objectKey]];
			if (Array.isArray(data[0])) { data = data[0]; }

			return [objectKey, ...data];
		});
	}

	controls.reverse();

	controls.map((control) => {
		let rerror;
		let key = control;
		let msg = false;
		let data = false;
		if (Array.isArray(control)) {
			key = control[0];
			msg = (control[1] !== true ? control[1] : undefined);
			if (control.length > 1) {
				data = control[2];
			}
		}

		if (validateRaw[key]) {
			if (data !== false) {
				rerror = validateRaw[key](msg, value, data);
			} else {
				rerror = validateRaw[key](msg, value);
			}
		}
		else { rerror = "Validation error: " + key; }

		if (rerror !== undefined) {
			error = rerror;
		}

		return error;
	});

	return error;
}

const validateRaw = {
	"email": function (msg = "Please enter a valid e-mail.", value) {
		let error;
		if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
			error = msg;
		}
		return error;
	},
	"fullName": function (msg = "Please enter a valid name.", value) {
		let error;
		if (/\d/.test(value) || value.split(' ').length < 2 || value.replace(' ', '').length < 4) {
			error = msg;
		}
		return error;
	},

	"required": function (msg = "This field is required.", value) {
		let error;
		if (!value) {
			error = msg;
		}
		return error;
	},
	"minNum": function (msg = "You must enter a value greater than {amount}.", value, amount, allowFormat = true) {
		let error;
		if (allowFormat) { value = value.toString().replace(/[.,]/g, ''); }
		if (parseFloat(value) < amount) {
			error = msg.replace('{amount}', amount);;
		}
		return error;
	},
	"maxNum": function (msg = "You must enter a value less then {amount}.", value, amount, allowFormat = true) {
		let error;
		if (allowFormat) { value = value.toString().replace(/[.,]/g, ''); }
		if (parseFloat(value) > amount) {
			error = msg.replace('{amount}', amount);;
		}
		return error;
	},
	"minLength": function (msg = "You must enter at least {length} characters.", value, length) {
		let error;
		if (value && value.length < length) {
			error = msg.replace('{length}', length);;
		}
		return error;
	},
	"maxLength": function (msg = "You must enter at most {length} characters.", value, length) {
		let error;
		if (value.length > length) {
			error = msg.replace('{length}', length);;
		}
		return error;
	},
	"minWords": function (msg = "This field must have at least {length} words.", value, length) {
		let error;
		if (value.split(' ').length < length) {
			error = msg.replace('{length}', length);;
		}
		return error;
	},
	"maxWords": function (msg = "This field must have at most {length} words.", value, length) {
		let error;
		if (value.split(' ').length > length) {
			error = msg.replace('{length}', length);;
		}
		return error;
	},
	"compare": function (msg = "Fields don't match.", value, compare) {
		let error;
		let compareItem = document.querySelector(compare);
		if (!compareItem || compareItem.value !== value) {
			error = msg;
		}
		return error;
	},
	"fileRequired": function (msg = "This field is required.", files) {
		let error;
		if (!files.length) {
			error = msg;
		}
		return error;
	},
	"date": function (msg = "Please enter a valid date.", value) {
		let error;
		if (!value) {
			error = msg;
		}
		return error;
	},

}