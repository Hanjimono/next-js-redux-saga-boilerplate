import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import "./styles.scss"

function RadioButton(props) {
	const {
		input,
		label,
		placeholder,
		type,
		className,
		classes,
		onChange,
		value,
		name,
		content,
		meta: { touched, error, warning },
		noBorder,
		allBorder,
		hasError,
	} = props
	const newClasses = classNames(className, classes, "radio-button-container", {
		error: hasError,
	})
	const contentClasses = classNames("radio-button-content", {
		"no-border": noBorder,
		"all-border": allBorder,
	})
	const handleChange = (e) => {
		if (onChange) {
			onChange(e)
		}
		if (input && input.onChange) {
			input.onChange(e)
		}
	}
	return (
		<div className={newClasses}>
			<label htmlFor={name}>
				{value !== undefined && (
					<input
						{...input}
						className="radio-input"
						placeholder={placeholder}
						type={type}
						onChange={handleChange}
						value={value}
						checked={input.checked}
					/>
				)}
				{value === undefined && (
					<input
						{...input}
						className="radio-input"
						placeholder={placeholder}
						type={type}
						onChange={handleChange}
						checked={input.checked}
					/>
				)}
				<span className="checkmark"></span>
				{label}
			</label>
			{!!content && input.checked && (
				<div className={contentClasses}>{content}</div>
			)}
		</div>
	)
}

RadioButton.propTypes = {
	/** custom class list */
	classes: PropTypes.string,
	/** custom class list */
	className: PropTypes.string,
	/** radio component content */
	content: PropTypes.oneOfType([
		PropTypes.arrayOf(
			PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func])
		),
		PropTypes.element,
		PropTypes.string,
		PropTypes.func,
	]),
	/** text label for input */
	label: PropTypes.string,
	/** input placeholder */
	placeholder: PropTypes.string,
	/** input meta info */
	meta: PropTypes.object,
	/** input value */
	value: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
		PropTypes.object,
	]),
	/** render radio without borders */
	noBorder: PropTypes.bool,
	/** render radio with all borders */
	allBorder: PropTypes.bool,
	/** flag of error styles for input */
	hasError: PropTypes.bool,
}

RadioButton.defaultProps = {
	meta: {
		touched: false,
		error: null,
		warning: null,
		classes: "",
		className: "",
	},
}

export default RadioButton
