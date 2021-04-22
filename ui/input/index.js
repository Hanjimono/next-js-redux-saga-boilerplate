import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import "./styles.scss"

function Input(props) {
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
		inline,
		increment,
		incrementStep,
		meta: { touched, error, warning },
		hasError,
	} = props
	const newClasses = classNames(className, classes, "input-container", {
		error: hasError,
		"inline-input": inline,
		increment,
	})
	const handleChange = (e) => {
		if (onChange) {
			onChange(e, name)
		}
		if (input && input.onChange) {
			input.onChange(e)
		}
	}
	const handleIncrement = (decrement) => {
		let formattedValue = null
		if (input) {
			formattedValue = input.value
		}
		if (value) {
			formattedValue = value
		}
		if (input) {
			decrement
				? handleChange(formattedValue - incrementStep)
				: handleChange(Number(formattedValue) + Number(incrementStep))
		} else {
			let e = {
				target: {
					value: formattedValue,
				},
			}
			e.target.value = decrement
				? formattedValue - incrementStep
				: Number(formattedValue) + Number(incrementStep)
			handleChange(e)
		}
	}
	return (
		<div className={newClasses}>
			{value !== undefined && (
				<input
					{...input}
					placeholder={placeholder}
					type={type}
					onChange={handleChange}
					value={value}
				/>
			)}
			{value === undefined && (
				<input
					{...input}
					placeholder={placeholder}
					type={type}
					onChange={handleChange}
				/>
			)}
			{increment && (
				<div className="increment-container">
					<div
						className="increment-button up"
						onClick={() => handleIncrement(false)}
					></div>
					<div
						className="increment-button down"
						onClick={() => handleIncrement(true)}
					></div>
				</div>
			)}
		</div>
	)
}

Input.propTypes = {
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
	/** flag for inline input style */
	inline: PropTypes.bool,
	/** add increment arrows */
	increment: PropTypes.bool,
	/** value of one increment click */
	incrementStep: PropTypes.number,
	/** flag of error styles for input */
	hasError: PropTypes.bool,
}

Input.defaultProps = {
	meta: {
		touched: false,
		error: null,
		warning: null,
		classes: "",
		className: "",
	},
	incrementStep: 1,
}

export default Input
