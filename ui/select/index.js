import React, { useState } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import ReactSelect from "react-select"
import "./styles.scss"

function Select(props) {
	const {
		className,
		classes,
		options,
		clearable,
		diabled,
		loading,
		rtl,
		searchable,
		multi,
		selectFirst,
		name,
		placeholder,
		value,
		input,
		hasError,
		customOption,
		fixedAfter,
		micro,
		noArrow,
		...rest
	} = props
	const newClasses = classNames(className, classes, "select-container", {
		"micro-select": micro,
		"no-arrow": noArrow,
	})
	const formattedOptions = []
	options.map((item, idx) => {
		let newItem = item
		newItem.label = item.label || item.title || item.name
		if ((fixedAfter || fixedAfter === 0) && fixedAfter == idx)
			newItem.fixed = true
		formattedOptions.push(newItem)
	})
	let immutableInput = input instanceof Object ? { ...input } : {}
	let formattedValue = (immutableInput && immutableInput.value) || value
	if (formattedValue && !(formattedValue instanceof Object)) {
		formattedOptions.map((item) => {
			if (item.value == formattedValue) {
				formattedValue = item
			}
		})
	}
	const customOptionComponent = ({
		children,
		innerRef,
		innerProps,
		isFocused,
		isSelected,
		data,
	}) => {
		const optionClasses = classNames(
			className,
			classes,
			"custom-select__option",
			{
				"custom-select__option--is-focused": isFocused,
				"custom-select__option--is-selected": isSelected,
				"custom-select__option--is-fixed": data && !!data.fixed,
			}
		)
		return (
			<div className={optionClasses} ref={innerRef} {...innerProps}>
				{children}
			</div>
		)
	}
	return (
		<div className={newClasses}>
			<ReactSelect
				className="custom-select-container"
				classNamePrefix="custom-select"
				options={formattedOptions}
				isClearable={clearable}
				isDisabled={diabled}
				isLoading={loading}
				isRtl={rtl}
				isSearchable={searchable}
				isMulti={multi}
				defaultValue={(selectFirst && options[0]) || null}
				name={name}
				components={customOption ? { Option: customOptionComponent } : null}
				placeholder={placeholder}
				value={formattedValue}
				{...rest}
			/>
		</div>
	)
}

Select.propTypes = {
	/** content of custom option component */
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(
			PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func])
		),
		PropTypes.element,
		PropTypes.string,
		PropTypes.func,
	]),
	/** custom class list */
	className: PropTypes.string,
	/** custom class list */
	classes: PropTypes.string,
	/** array of options */
	options: PropTypes.array,
	/** can clear current value */
	clearable: PropTypes.bool,
	/** disable select */
	disabled: PropTypes.bool,
	/** add loader when it's true*/
	loading: PropTypes.bool,
	/** rtl select flag */
	rtl: PropTypes.bool,
	/** add search in options */
	searchable: PropTypes.bool,
	/** can select multi options */
	multi: PropTypes.bool,
	/** select first options by default */
	selectFirst: PropTypes.bool,
	/** name for select */
	name: PropTypes.string,
	/** placeholder for select input */
	placeholder: PropTypes.string,
	/** currenct select valut */
	value: PropTypes.object,
	/** flag of error styles for input */
	hasError: PropTypes.bool,
	/** when true render a custom option from children component */
	customOption: PropTypes.bool,
	/** apply micro select styles */
	micro: PropTypes.bool,
}

export default Select
