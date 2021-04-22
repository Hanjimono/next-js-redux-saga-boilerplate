import React from "react"
import PropTypes from "prop-types"
import { Field as ReduxField } from "redux-form"
import classNames from "classnames"
import Input from "App/ui/input"
import Checkbox from "App/ui/checkbox"
import RadioButton from "App/ui/radioButton"
import Select from "App/ui/select"
import Tooltip from "App/ui/tooltip"
import "./styles.scss"

export function Field(props) {
	const {
		component,
		name,
		type,
		placeholder,
		validate,
		warn,
		className,
		classes,
		componentClasses,
		children,
		noRedux,
		lessBottom,
		noBottom,
		onChange,
		tooltip,
		...rest
	} = props
	const newClasses = classNames(className, classes, "form-field-container", {
		"less-bottom": lessBottom,
		"no-bottom": noBottom,
		"with-tooltip": tooltip,
	})
	let content = !!component ? component : FieldContent
	return (
		<div className={newClasses}>
			{noRedux && children}
			{!noRedux && (
				<ReduxField
					name={name}
					type={type}
					component={content}
					customComponent={component}
					placeholder={placeholder}
					validate={validate}
					warn={warn}
					classes={componentClasses}
					tooltip={tooltip}
					{...rest}
				/>
			)}
		</div>
	)
}

Field.propTypes = {
	/** field name */
	name: PropTypes.string.isRequired,
	/** field type(input, select, checkbox, radio) */
	type: PropTypes.string,
	/** render a custom component in field */
	component: PropTypes.oneOfType([
		PropTypes.arrayOf(
			PropTypes.oneOfType([PropTypes.element, PropTypes.string])
		),
		PropTypes.element,
		PropTypes.string,
		PropTypes.func,
	]),
	/** field placeholder */
	placeholder: PropTypes.string,
	/** array of validators function */
	validate: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
	/** array of warning function */
	warn: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
	/** custom class list */
	className: PropTypes.string,
	/** custom class list */
	classes: PropTypes.string,
	/** custom class list to pass it to component */
	componentClasses: PropTypes.string,
	/** field content */
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(
			PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func])
		),
		PropTypes.element,
		PropTypes.string,
		PropTypes.func,
	]),
	/** do not use a redux form field */
	noRedux: PropTypes.bool,
	/** apply less bottom styles */
	lessBottom: PropTypes.bool,
	/** render a field without bottom */
	noBottom: PropTypes.bool,
	/** text tooltip */
	tooltip: PropTypes.string,
	/** label for field */
	label: PropTypes.string,
	/** render label and field in same row */
	horizontal: PropTypes.bool,
	/** apply large field styles */
	large: PropTypes.bool,
	/** apply medium-large field styles */
	mediumLarge: PropTypes.bool,
	/** apply medium field styles */
	medium: PropTypes.bool,
	/** apply short field styles */
	short: PropTypes.bool,
	/** apply mini field styles */
	mini: PropTypes.bool,
	/** render an additional component at the bottom of the field */
	additionalInfo: PropTypes.oneOfType([
		PropTypes.arrayOf(
			PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func])
		),
		PropTypes.element,
		PropTypes.string,
		PropTypes.func,
	]),
}

Field.defaultProps = {
	name: "",
}

export function FieldContent(props) {
	const {
		label,
		className,
		classes,
		customComponent,
		type,
		apiError,
		meta: { touched, error, warning },
		change,
		tooltip,
		horizontal,
		large,
		mediumLarge,
		medium,
		short,
		mini,
		additionalInfo,
		...rest
	} = props
	let formattedError = error || apiError
	if (formattedError instanceof Array) {
		formattedError = formattedError.join(", ")
	}
	const hasError = (touched || apiError) && (formattedError || warning)
	if (formattedError && formattedError.length > 30) {
		formattedError = (
			<Tooltip content={formattedError} noIcon noBorder>
				<span>{formattedError}</span>
			</Tooltip>
		)
	}
	const newClasses = classNames(
		className,
		classes,
		"form-field-content-wrapper",
		{
			error: !!hasError,
			"with-tooltip": tooltip,
			horizontal,
			dragline: type === "dragLine" || type === "dragline",
		}
	)
	const newClassesElement = classNames("form-field-content_element-wrapper", {
		large: large,
		"medium-large": mediumLarge,
		medium: medium,
		short: short,
		mini: mini,
	})
	let content = ""
	let showLabel = true
	let returnCustomComponent = false
	const handleChange = (value) => {
		let formattedValue = value
		if (value instanceof Object) {
			formattedValue = value.value
		}
		if (change) {
			change((props.input && props.input.name) || props.name, formattedValue)
		}
	}
	switch (type) {
		case "text":
		case "password":
		case "input":
			content = (
				<Input {...rest} meta={props.meta} type={type} hasError={hasError} />
			)
			break
		case "checkbox":
			showLabel = false
			content = (
				<Checkbox
					{...rest}
					meta={props.meta}
					type={type}
					label={label}
					hasError={hasError}
				/>
			)
			break
		case "radio":
			showLabel = false
			content = (
				<RadioButton
					{...rest}
					meta={props.meta}
					type={type}
					label={label}
					hasError={hasError}
				/>
			)
			break
		case "select":
			content = (
				<Select
					{...rest}
					meta={props.meta}
					type={type}
					onChange={handleChange}
					hasError={!!hasError}
				/>
			)
			break
		default:
			returnCustomComponent = true
	}
	return (
		<div className={newClasses}>
			<div className="form-field-content-container">
				<div className="form-field-content_label-wrapper">
					{showLabel && label && <label>{label}</label>}
					<div className={newClassesElement}>{content}</div>
				</div>
				{hasError &&
					((formattedError && (
						<div className="field-content-error">{formattedError}</div>
					)) ||
						(warning && (
							<div className="field-content-warning">{warning}</div>
						)))}
				{tooltip && <Tooltip content={tooltip} place="right" />}
			</div>
			{additionalInfo && (
				<div className="form-field-additional-info">{additionalInfo}</div>
			)}
		</div>
	)
}

FieldContent.propTypes = {
	/** custom class list */
	className: PropTypes.string,
	/** custom class list */
	classes: PropTypes.string,
	/** render a custom component */
	customComponent: PropTypes.oneOfType([
		PropTypes.arrayOf(
			PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func])
		),
		PropTypes.element,
		PropTypes.string,
		PropTypes.func,
	]),
	/** label for field */
	label: PropTypes.string,
	/** placeholder for field */
	placeholder: PropTypes.string,
	/** field type (input, select, radio, checkbox) */
	type: PropTypes.string,
	/** field meta info */
	meta: PropTypes.object,
	/** current valut */
	value: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
		PropTypes.object,
	]),
	/** text tooltip which will be shown at the right of the field */
	tooltip: PropTypes.string,
	/** render label and field in same row */
	horizontal: PropTypes.bool,
	/** apply large field styles */
	large: PropTypes.bool,
	/** apply medium-large field styles */
	mediumLarge: PropTypes.bool,
	/** apply medium field styles */
	medium: PropTypes.bool,
	/** apply short field styles */
	short: PropTypes.bool,
	/** apply mini field styles */
	mini: PropTypes.bool,
	/** render an additional component at the bottom of the field */
	additionalInfo: PropTypes.oneOfType([
		PropTypes.arrayOf(
			PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func])
		),
		PropTypes.element,
		PropTypes.string,
		PropTypes.func,
	]),
}

export function FieldLine(props) {
	const {
		className,
		classes,
		children,
		left,
		right,
		between,
		around,
		top,
		bottom,
		center,
	} = props
	const newClasses = classNames(className, classes, "field-line", {
		left,
		right,
		between,
		around,
		top,
		bottom,
		center,
	})
	return <div className={newClasses}>{children}</div>
}

FieldLine.propTypes = {
	/** custom class list */
	className: PropTypes.string,
	/** custom class list */
	classes: PropTypes.string,
	/** content of component */
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(
			PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func])
		),
		PropTypes.element,
		PropTypes.string,
		PropTypes.func,
	]),
	/** all buttons will stick to the left */
	left: PropTypes.bool,
	/** all buttons will stick to the left */
	right: PropTypes.bool,
	/** there are will be spaces between buttons */
	between: PropTypes.bool,
	/** there are will be spaces around buttons */
	around: PropTypes.bool,
	/** add top margin to button line */
	top: PropTypes.bool,
	/** add bottom margin to button line */
	bottom: PropTypes.bool,
}

FieldLine.defaultProps = {}
