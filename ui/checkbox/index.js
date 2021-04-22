import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import "./styles.scss"

function Checkbox(props) {
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
		meta: { touched, error, warning },
		checked,
		hasError,
	} = props
	const newClasses = classNames(className, classes, "checkbox-container", {
		error: hasError,
	})
	const handleChange = (e) => {
		if (onChange) {
			onChange(e)
		}
		if (input && input.onChange) {
			input.onChange(e)
		}
	}
	let formattedInput = input
	if (!input) {
		formattedInput = {
			value: checked,
			checked: checked,
		}
	}
	return (
		<div className={newClasses}>
			<label htmlFor={name}>
				{value !== undefined && (
					<input
						{...formattedInput}
						placeholder={placeholder}
						type={type}
						onChange={handleChange}
						value={value}
					/>
				)}
				{value === undefined && (
					<input
						{...formattedInput}
						placeholder={placeholder}
						type={type}
						onChange={handleChange}
					/>
				)}
				<span className="checkmark"></span>
				{label}
			</label>
		</div>
	)
}

Checkbox.propTypes = {
	/** text label for input */
	label: PropTypes.string,
	/** input placeholder */
	placeholder: PropTypes.string,
	/** input type */
	type: PropTypes.string,
	/** input meta info */
	meta: PropTypes.object,
	/** custom class list */
	classes: PropTypes.string,
	/** custom class list */
	className: PropTypes.string,
	/** input value */
	value: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
		PropTypes.object,
	]),
	/** flag of error styles for input */
	hasError: PropTypes.bool,
	/** checkbox checked flag */
	checked: PropTypes.bool,
}

Checkbox.defaultProps = {
	meta: {
		touched: false,
		error: null,
		warning: null,
		classes: "",
		className: "",
	},
	type: "checkbox",
}

export default Checkbox
