import React from 'react';

//Deps
import pull from 'lodash/pull';
import union from 'lodash/union';
import isEqual from 'lodash/isEqual';
import extend from 'lodash/extend';
import omit from 'lodash/omit';
import { uid, formatNumber } from 'functions/helpers';
import { validation } from 'controllers/validation';
import InputMask from 'react-input-mask';

//Partials
import Select from 'components/partials/select'
import PopInfo from 'components/partials/popinfo'

export class FormInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			error: false,
			touched: false,
			value: false,
		}

		this.onChange = this.onChange.bind(this);
		this.validate = this.validate.bind(this);
		this.reset = this.reset.bind(this);

		this.input = React.createRef();
		this.id = (props.id ? props.id : uid('form_input'));
	}

	validate() {
		if (this.input.current) {
			this.input.current.validate();
		}
	}

	onChange(status) {
		if (this.props.onChange) {
			this.props.onChange(status.value, this.props.name, status.error, status.touched);
		}
		if (this.props.onChangeInForm) {
			this.props.onChangeInForm({
				value: status.value,
				name: status.name,
				error: status.error,
				touched: status.touched,
				validation: status.validation,
			});
		}

		this.setState({
			error: status.error,
			touched: status.touched,
			value: status.value,
		});
	}

	reset() {
		if (this.input.current) {
			this.input.current.reset();
		}
	}

	render() {
		let vm = this;

		let wrapClasses =
			"inputwrap type-" + vm.props.type +
			(vm.props.className ? ' ' + vm.props.className : '') +
			((vm.state.touched || vm.props.forceTouch) && vm.state.error ? ' error' : '') +
			(vm.props.popLabel ? ' pop-label' : '') +
			(vm.props.disabled ? ' disabled' : '') +
			(vm.props.icon ? ' has-icon' : '') +
			(vm.props.info ? ' has-info' : '') +
			((vm.state.value !== "" && vm.state.value !== false && vm.state.value !== null) ? ' input-full' : '');

		let name = (vm.props.name ? vm.props.name : vm.id);

		let Input = false;
		let inputProps = extend(
			omit(vm.props, ['id', 'onChangeInForm', 'forceTouch', 'onChange', 'className', 'formInput', 'name']),
			{
				id: vm.id,
				name: name,
				onChange: vm.onChange,
				touched: (vm.props.forceTouch || vm.state.touched),
				className: wrapClasses,
			}
		)

		switch (vm.props.type) {
			/*case 'date':
				Input = InputDate;
				break;*/
			case 'checkbox':
				Input = InputCheck;
				break;
			/*case 'radio':
				Input = InputRadio;
			break;*/
			case 'file':
				Input = InputFile;
				if (inputProps.validation === true || inputProps.validation === false) {
					inputProps.validation = (inputProps.validation ? ['fileRequired'] : false);
				}
				else if (inputProps.validation === 'required') {
					inputProps.validation = ['fileRequired'];
				}
				else {
					let reqIndex = inputProps.validation.indexOf('required');
					if (reqIndex !== -1) {
						inputProps.validation[reqIndex] = 'fileRequired';
					}
				}
				break;
			case 'select':
				Input = InputSelect;
				break;
			case 'textarea':
				Input = InputTextarea;
				break;
			default:
				Input = InputText;
				break;
		}

		return (
			<Input {...inputProps} ref={vm.input} />
		);
	}
}

FormInput.defaultProps = {
	className: '',
	type: "text",
	name: false,
	validation: false,
	multiple: false,
	value: '',
	label: '',
	popLabel: false,
	hideAsterisk: false,
	formInput: true,
};

class InputText extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: props.value,
			error: false,
			errorMessage: false,
			touched: false,
			validation: this.calculateValidation(),
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.reset = this.reset.bind(this);
		this.calculateValidation = this.calculateValidation.bind(this);
	}

	componentDidMount() {
		this.props.onChange({
			error: this.state.error,
			name: this.props.name,
			touched: this.state.touched,
			value: this.state.value,
			validation: this.state.validation,
		});

		this.validate();

		let newVal = this.state.value;

		if (this.props.formatNumber) {
			newVal = formatNumber(newVal.replace(/[.,]/g, ''), { showDecimals: false });


		}
		this.setState({ value: newVal });

		window.format = formatNumber;
	}

	componentDidUpdate(prevProps, prevState) {
		if (!isEqual(prevProps.validation, this.props.validation)) {
			this.setState({ validation: this.calculateValidation() })
		}
		if (prevProps.value !== this.props.value) {
			this.setState({ value: this.props.value });
		}

		if (prevState.value !== this.state.value || !isEqual(prevState.validation, this.state.validation)) {
			this.validate(this.state.value);
		}

		if (prevState.value !== this.state.value || prevState.touched !== this.state.touched || prevState.error !== this.state.error) {

			this.props.onChange({
				error: this.state.error,
				name: this.props.name,
				touched: this.state.touched,
				value: this.state.value,
				validation: this.state.validation,
			});

		}
	}

	calculateValidation() {
		let validateProp = this.props.validation;
		if (this.props.type === 'email' && validateProp === true) {
			validateProp = ['required', 'email'];
		}
		return validateProp;
	}

	handleChange(e) {
		e.persist();
		let newVal = e.target.value;

		if (this.props.formatNumber) {
			const oldVal = this.state.value.replace(/[.,]/g, '');
			const cleanNewVal = newVal.replace(/[.,]/g, '');
			newVal = formatNumber(newVal.replace(/[.,]/g, ''), { showDecimals: false });

			if ((this.props.mask || this.props.formatNumber) && oldVal === cleanNewVal.substring(0, cleanNewVal.length - 1)) {
				setTimeout(function () {
					e.target.selectionStart = e.target.selectionEnd = e.target.value.length;
				}, 25);
			}
		}
		this.setState({ value: newVal });

	}

	handleBlur(e) {
		e.persist();
		this.setState({ value: e.target.value, touched: true });
	}

	validate(value = this.state.value) {
		let vm = this;
		let validStatus = validation(value, vm.state.validation);
		let currentValidation = vm.state.errorMessage;

		vm.setState({ error: (validStatus !== false), errorMessage: validStatus });

		if (vm.state.validation.compare && !isEqual(validStatus, currentValidation)) {
			setTimeout(function () {
				if (vm.props.onFeedback) {
					vm.props.onFeedback('validateAll');
				}

			}, 20);
		}
	}

	reset() {
		this.setState({ value: '', touched: false });
	}

	render() {
		let vm = this;
		let Elem = 'input';

		let labelText = false;

		let props = {
			...omit(vm.props, ['onChange', 'placeholder', 'value', 'popLabel', 'validation', 'touched', 'className', 'hideError', 'icon', 'info', 'infoProps', 'hideAsterisk', 'onFeedback', 'formatNumber']),
			onChange: vm.handleChange,
			onBlur: vm.handleBlur,
			value: vm.state.value ? vm.state.value : "",
			placeholder: (vm.props.placeholder ? vm.props.placeholder + (vm.state.validation !== false && !vm.props.hideAsterisk ? ' *' : '') : undefined),
		};

		/*let props = {
			onChange: vm.handleChange,
			value: vm.state.value,
			name: (vm.props.name ? vm.props.name : undefined),
			id: (vm.props.id ? vm.props.id : undefined),
			type: vm.props.type,
			disabled: (vm.props.disabled ? vm.props.disabled : undefined),
			readOnly: (vm.props.readOnly ? true : undefined),
			placeholder: (vm.props.placeholder ? vm.props.placeholder + (vm.state.validation !== false ? ' *' : '') : undefined),
		};*/

		if (props.type === 'number') {
			Elem = InputMask;
			props.type = 'text';
			props = extend({}, props, {
				pattern: (vm.props.decimals && vm.props.decimals > 0 ? "[0-9]*(.[0-9]{0,2})?$" : "[0-9]*"),
				inputMode: "numeric",
			});
		}

		if (props.mask) {
			Elem = InputMask;
			props = extend({}, props, {
				maskChar: null,
				formatChars: {
					'1': '[1-9]',
					'0': '[0-9]',
					'+': '[0-9.,]',
					'9': '[0-9]',
					'a': '[A-Za-z]',
					'*': '[A-Za-z0-9]',
				}
			})
		}

		if (vm.props.label || (vm.props.popLabel && (vm.props.label || vm.props.placeholder))) {
			labelText = (vm.props.label ? vm.props.label : vm.props.placeholder);
		}

		return (
			<div className={vm.props.className}>
				{vm.props.icon &&
					<i className={"input-icon icon-" + vm.props.icon}></i>
				}
				{vm.props.info &&
					<PopInfo className={"input-info"} content={vm.props.info} {...vm.props.infoProps}><i className="icon-question"></i></PopInfo>
				}
				{labelText &&
					<label className="input-label" htmlFor={vm.props.id}>{labelText}</label>
				}
				<Elem
					{...props}
				/>
				{vm.props.touched && vm.state.error && vm.props.hideError !== true ? (
					<div className="input-error">
						{vm.state.errorMessage}
					</div>
				) : null}
			</div>
		)
	}
}

class InputTextarea extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: props.value,
			error: false,
			errorMessage: false,
			touched: false,
			validation: this.calculateValidation(),
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.reset = this.reset.bind(this);
		this.calculateValidation = this.calculateValidation.bind(this);
	}

	componentDidMount() {
		this.validate();
	}

	componentDidUpdate(prevProps, prevState) {
		if (!isEqual(prevProps.validation, this.props.validation)) {
			this.setState({ validation: this.calculateValidation() })
		}
		if (prevProps.value !== this.props.value) {
			this.setState({ value: this.props.value });
		}

		if (prevState.value !== this.state.value || !isEqual(prevState.validation, this.state.validation)) {
			this.validate(this.state.value);
		}

		if (prevState.value !== this.state.value || prevState.touched !== this.state.touched || prevState.error !== this.state.error) {

			this.props.onChange({
				error: this.state.error,
				name: this.props.name,
				touched: this.state.touched,
				value: this.state.value,
				validation: this.state.validation,
			});

		}
	}

	calculateValidation() {
		let validateProp = this.props.validation;
		if (this.props.type === 'email' && validateProp === true) {
			validateProp = ['required', 'email'];
		}
		return validateProp;
	}

	handleChange(e) {
		e.persist();
		this.setState({ value: e.target.value });
	}

	handleBlur(e) {
		e.persist();
		this.setState({ value: e.target.value, touched: true });
	}

	reset() {
		this.setState({ value: '', touched: false });
	}

	validate(value = this.state.value) {
		let validStatus = validation(value, this.state.validation);
		this.setState({ error: (validStatus !== false), errorMessage: validStatus });
	}

	render() {
		let vm = this;

		let labelText = false;

		let props = {
			...omit(vm.props, ['onChange', 'placeholder', 'value', 'popLabel', 'validation', 'touched', 'className', 'hideError', 'hideAsterisk', 'onFeedback']),
			onChange: vm.handleChange,
			onBlur: vm.handleBlur,
			value: vm.state.value,
			placeholder: (vm.props.placeholder ? vm.props.placeholder + (vm.state.validation !== false && !vm.props.hideAsterisk ? ' *' : '') : undefined),
		};

		if (props.type === 'number') {
			props.type = 'text';
			props = extend({}, props, {
				pattern: (vm.props.decimals && vm.props.decimals > 0 ? "[0-9]*(.[0-9]{0,2})?$" : "[0-9]*"),
				inputMode: "numeric",
			});
		}

		if (vm.props.label || (vm.props.popLabel && (vm.props.label || vm.props.placeholder))) {
			labelText = (vm.props.label ? vm.props.label : vm.props.placeholder);
		}

		return (
			<div className={vm.props.className}>
				{labelText &&
					<label className="input-label" htmlFor={vm.props.id}>{labelText}</label>
				}
				<textarea {...props}>
					{this.state.value}
				</textarea>
				{vm.props.touched && vm.state.error && vm.props.hideError !== true ? (
					<div className="input-error">
						{vm.state.errorMessage}
					</div>
				) : null}
			</div>
		)
	}
}

class InputFile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: props.value,
			fileNames: '',
			error: false,
			errorMessage: false,
			validations: props.validation,
		}

		this.input = React.createRef();
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		let vm = this;
		let fileNames = '';

		for (let k = 0; k < vm.input.current.files.length; k++) {
			if (k > 0) { fileNames += ', '; }
			fileNames += vm.input.current.files[k].name;
		}

		vm.setState({ fileNames: fileNames })
		vm.validate(vm.input.current.files, vm.input.current.value, true);
	}

	componentDidMount() {
		this.validate(this.input.current.files, this.input.current.value, false);
	}

	validate(files, value, touch) {
		let vm = this;
		let validStatus = validation(files, vm.state.validations);
		vm.setState({ error: (validStatus !== false), errorMessage: validStatus });
		vm.props.onChange({
			error: (validStatus !== false),
			name: this.props.name,
			touched: touch,
			value: value,
		});
	}

	reset() {
		this.setState({ value: '', touched: false });
		this.input.reset();
	}

	render() {
		let vm = this;

		let labelText = false;
		if (vm.props.label || vm.props.placeholder) {
			labelText = (vm.props.label ? vm.props.label : vm.props.placeholder);
		}

		return (
			<div className={vm.props.className}>
				{labelText &&
					<label className="input-label" htmlFor={vm.props.id}>{labelText}</label>
				}
				<i className="input-icon icon-upload"></i>
				<input
					ref={this.input}
					name={vm.props.name}
					onChange={vm.handleChange}
					value={vm.state.value}
					type="file"
					id={vm.props.id}
					multiple={vm.props.multiple}
				/>
				<label htmlFor={vm.props.id}>
					<span></span> {((vm.state.fileNames !== '') ?
						vm.state.fileNames
						: vm.props.placeholder + ((vm.props.placeholder && vm.props.validation !== false) ? ' *' : ''))}
				</label>
				{vm.props.touched && vm.state.error ? (
					<div className="input-error">
						{vm.state.errorMessage}
					</div>
				) : null}
			</div>
		)
	}
}

class InputSelect extends React.Component {
	constructor(props) {
		super(props);

		this.input = React.createRef();
		this.handleChange = this.handleChange.bind(this);
		this.validate = this.validate.bind(this);

		this.state = {
			value: (props.value ? props.value : null),
			labelText: (props.value ? props.value : (props.placeholder ? props.placeholder : null)),
			error: false,
			errorMessage: false,
		}
	}

	componentDidMount() {
		this.validate(this.state.value);
	}

	componentDidUpdate(prevProps) {
		if (!isEqual(prevProps.value, this.props.value)) {
			this.setState({ value: this.props.value });
		}
	}

	handleChange(option) {
		let vm = this;
		vm.validate(option, true);
	}

	validate(option, touch = false) {

		let vm = this;

		let validStatus = validation((option ? option.value : ""), vm.props.validation);

		vm.props.onChange({
			value: (option ? option.value : (vm.state.value ? vm.state.value.value : null)),
			name: this.props.name,
			error: (validStatus !== false),
			touched: touch,
			validation: vm.props.validation,
		});

		vm.setState({ value: option, error: (validStatus !== false), errorMessage: validStatus });

		if (vm.props.value === false && option) {
			vm.validate(false, false);
		}
	}

	reset() {
		this.setState({ value: null, touched: false });
	}

	render() {
		let vm = this;

		let labelText = false;

		if (vm.props.label || (vm.props.popLabel && (vm.props.label || vm.props.placeholder))) {
			labelText = (vm.props.label ? vm.props.label : vm.props.placeholder);
		}

		let props = {
			...omit(vm.props, ['onChange', 'placeholder', 'value', 'popLabel', 'validation', 'touched', 'className', 'hideError', 'onFeedback']),
			onChange: vm.handleChange,
			value: vm.state.value,
			placeholder: (vm.props.placeholder ? vm.props.placeholder + (vm.props.validation !== false ? ' *' : '') : undefined),
		};

		return (
			<div className={vm.props.className} id={vm.props.wrapperId || ''}>
				{labelText &&
					<label className="input-label" htmlFor={vm.props.id}>{labelText}</label>
				}
				<Select {...props} />
				{vm.props.touched && vm.state.error ? (
					<div className="input-error">
						{vm.state.errorMessage}
					</div>
				) : null}
			</div>
		)
	}
}

class InputCheck extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: props.value,
			checked: (props.checked ? true : false),
			error: false,
			errorMessage: false,
		}

		this.input = React.createRef();
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.validate(this.state.checked, false);
	}

	handleChange(e) {
		this.validate(e.target.checked, true);
	}

	validate(checked, touch) {
		let vm = this;

		if (checked === undefined) { checked = vm.state.checked; }
		let validStatus = validation((checked ? '1' : ''), vm.props.validation);
		vm.setState({ value: checked, checked: checked, error: (validStatus !== false), errorMessage: validStatus });
		vm.props.onChange({
			error: (validStatus !== false),
			touched: touch,
			value: checked,
			checked: checked,
			name: this.props.name,
			validation: this.props.validation,
		});
	}

	reset() {
		this.setState({ value: this.props.value, checked: (this.props.checked ? true : false), touched: false });
	}

	render() {
		let vm = this;

		let inputProps = {
			name: (vm.props.name ? vm.props.name : undefined),
			type: "checkbox",
			onChange: vm.handleChange,
			value: vm.state.value,
			id: vm.props.id,
			checked: (vm.state.checked ? true : false),
		}

		return (
			<div className={vm.props.className}>
				<div className="checkwrap">
					<input
						{...inputProps}
					/>
					<label htmlFor={vm.props.id}><span></span> {vm.props.label ? vm.props.label : (vm.props.children ? vm.props.children : false)}
					</label>
					{vm.props.info &&
						<PopInfo className={"input-info"} content={vm.props.info} {...vm.props.infoProps}><i className="icon-question"></i></PopInfo>
					}
				</div>
				{vm.props.touched && vm.state.error ? (
					<div className="input-error">
						{vm.state.errorMessage}
					</div>
				) : null}
			</div>
		)
	}
}

/*class InputRadio extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: props.value,
		}

		this.input = React.createRef();
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e){
		this.setState({value: e.target.checked});
	}

	render(){
		let vm = this;

		return (
			<div className={vm.props.className}>
				<div className="checkwrap">
					<input
						name={vm.props.name}
						type="radio"
						onChange={vm.handleChange}
						value={vm.state.value}
						id={vm.props.id}
					/>
					<label htmlFor={vm.props.id}><span></span> {vm.props.label}</label>
				</div>
			</div>
		)
	}
}*/

/*class InputDate extends React.Component {
	constructor(props) {
		super(props);

		let validateProp = props.validation;
		if (validateProp === true) {
			validateProp = ['required', 'date'];
		}

		this.state = {
			value: props.value,
			error: false,
			errorMessage: false,
			validations: validateProp
		}

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.validate(this.state.value, false);
	}

	handleChange(value) {
		this.validate(value, true);
	}

	validate(value, touch) {
		let vm = this;
		let validStatus = validation(value, vm.state.validations);
		vm.setState({ value: value, error: (validStatus !== false), errorMessage: validStatus });
		vm.props.onChange({
			error: (validStatus !== false),
			touched: touch,
			value: value,
		});
	}

	render() {
		let vm = this;

		let labelText = false;
		if (vm.props.label || vm.props.placeholder) {
			labelText = (vm.props.label ? vm.props.label : vm.props.placeholder);
		}

		return (
			<div className={vm.props.className}>
				{labelText &&
					<label className="input-label" htmlFor={vm.props.id}>{labelText}</label>
				}
				<i className="input-icon icon-calendar"></i>
				<DayPickerInput
					onDayChange={vm.handleChange}
					inputProps={{
						autoComplete: "off",
						type: "text",
						name: vm.props.name,
						onChange: vm.props.handleChange,
					}}
					value={vm.state.value}
					placeholder={vm.props.placeholder + ((vm.props.placeholder && vm.props.validation !== false) ? ' *' : '')}
				/>

				{vm.state.error && vm.props.touched ? (
					<div className="input-error">{vm.state.errorMessage}</div>
				) : null}
			</div>
		)
	}
}

InputDate.defaultProps = {
	startDate: null,
	dateFormat: "DD/MM/YYYY",
};*/

//// Form Itself

export class InputForm extends React.Component {
	constructor(props) {
		super(props);

		this.validationCount = 0;
		this.state = {
			forceTouch: false
		}

		this.submit = this.submit.bind(this);
		this.reset = this.reset.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.validate = this.validate.bind(this);
		this.elementStateChange = this.elementStateChange.bind(this);
		this.elementFeedback = this.elementFeedback.bind(this);

		this.elems = [];
		this.validElements = [];
		this.invalidElements = [];

		this.form = React.createRef();
	}

	elementStateChange(state) {

		if (state.error && state.validation !== false) {

			this.validElements = pull(this.validElements, state.name);
			this.invalidElements = union(this.invalidElements, [state.name]);

			if (this.props.onTouch) {
				if (this.validElements.length < this.validationCount && state.touched) {
					this.props.onTouch();
				}
			}
		}
		else if (state.validation !== false) {
			this.invalidElements = pull(this.invalidElements, state.name);
			this.validElements = union(this.validElements, [state.name]);
		}
	}

	elementFeedback(event) {
		switch (event) {
			case "validateAll":
				this.validateChildren();
				break;
			default: break;
		}
	}

	validateChildren() {
		this.elems.forEach(function (elem, nth) {
			if (elem !== null) {
				elem.validate(undefined, true);
			}
		});
	}

	validate() {
		this.validateChildren();
		return (this.validElements.length >= this.validationCount);
	}

	handleSubmit(e = false) {
		if (e) { e.preventDefault(); }

		this.setState({ forceTouch: true })
		if (this.props.onTouch) {
			this.props.onTouch();
		}

		if (this.validate()) {
			this.setState({ sending: true });
			if (this.props.onSubmit) {
				this.props.onSubmit((e ? e.nativeEvent : false), this.form.current);
			}

		}

	}

	submit() {
		this.handleSubmit();
	}

	reset() {
		//let inputs = this.form.current.querySelector('input, textarea');
		/*for(let k = 0; k < inputs.length; k++){
			let input = inputs[k];
			if(input.getAttribute('type'))
		}*/

		//let children = React.Children.toArray(this.props.children);
		for (let k = 0; k < this.elems.length; k++) {
			let elem = this.elems[k];
			if (elem) {
				elem.reset();
			}
		}
		this.setState({ forceTouch: false })
	}

	modifyChildren(children, props) {
		this.elements = false;
		return React.Children.map(children, child => {
			if (child !== null) {
				if (!child.props || child.props.innerForm) {
					return child
				}
				if (child.props.formInput /*child.props.name && child.props.type !== "hidden"*/) {
					if (child.props.validation !== false) {
						this.validationCount++;
					}
					let clone = React.cloneElement(child, props);
					return clone;
				}
				if (child.props.children) {
					return React.cloneElement(child, {
						children: this.modifyChildren(child.props.children, props),
					});
				}
				else {
					return child;
				}
			}
		})
	}

	render() {
		let vm = this;
		let Container = vm.props.tag;
		vm.validationCount = 0;
		vm.elems = [];

		return (
			<Container className={'form ' + vm.props.className} onSubmit={vm.handleSubmit} noValidate autoComplete={vm.props.autoComplete || ''} ref={this.form}>
				{
					vm.modifyChildren(vm.props.children, {
						onChangeInForm: vm.elementStateChange,
						onFeedback: vm.elementFeedback,
						forceTouch: vm.state.forceTouch,
						ref: function (ref) { vm.elems.push(ref) }
					})}
			</Container>
		)
	}
}

InputForm.defaultProps = {
	className: '',
	tag: 'form',
	onSubmit: function () { console.log('submitted'); },
};