/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import React, { ChangeEventHandler, FunctionComponent } from "react"
import classNames from "classnames"
import {
	checkboxBgColor,
	checkboxBgHoverColor,
	checkboxCheckedBgColor,
	checkboxCheckedBgHoverColor,
	checkboxHeight,
	checkboxLabelMargin,
	checkboxOkBorder,
	checkboxOkColor,
	checkboxOkHeight,
	checkboxOkLeft,
	checkboxOkTop,
	checkboxOkWidth,
	checkboxWidth,
	inputBorderSize,
	fieldError,
} from "App/assets/scss/variables"

interface CheckboxProps {
	/** text label for input */
	label?: string
	/** name for input */
	name?: string
	/** input placeholder */
	placeholder?: string
	/** input type */
	type?: string
	/** input meta info */
	meta?: object
	/** custom class list */
	classes?: string
	/** custom class list */
	className?: string
	/** input value */
	value?: string | number | readonly string[] | undefined
	/** flag of error styles for input */
	hasError?: boolean
	/** checkbox checked flag */
	checked?: boolean
	/** on change callback function */
	onChange?: (e: React.ChangeEvent) => void
}

const StyledCheckmark = styled.div`
	height: ${checkboxWidth};
	width: ${checkboxWidth};
	cursor: pointer;
	background-color: ${checkboxBgColor};
	margin-right: ${checkboxLabelMargin};
	position: relative;
	&:after {
		content: "";
		position: absolute;
		display: none;
		left: ${checkboxOkLeft};
		top: ${checkboxOkTop};
		width: ${checkboxOkWidth};
		height: ${checkboxOkHeight};
		border: solid ${checkboxOkColor};
		border-width: 0 ${checkboxOkBorder} ${checkboxOkBorder} 0;
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
	}
`

const StyledCheckboxContainer = styled.div<CheckboxProps>`
	border: none;
	align-items: center;
	display: flex;
	border-radius: 0;
	min-height: ${checkboxHeight};
	line-height: normal;
	&:checked ~ ${StyledCheckmark}:after {
		display: block;
	}
	&:checked ~ ${StyledCheckmark} {
		background-color: ${checkboxCheckedBgColor};
	}
	&:hover input ~ ${StyledCheckmark} {
		background-color: ${checkboxBgHoverColor};
	}
	&:hover input:checked ~ ${StyledCheckmark} {
		background-color: ${checkboxCheckedBgHoverColor};
	}
	${({ hasError }) =>
		hasError &&
		`
    border: none;
    border-radius: 0;
    border-bottom: ${inputBorderSize} dotted ${fieldError};
  `}
`

export const Checkbox: FunctionComponent<CheckboxProps> = (props) => {
	const {
		label,
		placeholder,
		type,
		className,
		classes,
		onChange,
		value,
		name,
		checked,
		hasError,
	} = props
	const newClasses = classNames(className, classes, "checkbox-container", {
		error: hasError,
	})
	const handleChange = (e: React.ChangeEvent) => {
		if (onChange) {
			onChange(e)
		}
	}
	return (
		<StyledCheckboxContainer {...props} onChange={undefined} className={newClasses}>
			<label htmlFor={name}>
				{value !== undefined && (
					<input
						checked
						placeholder={placeholder}
						type={type}
						onChange={handleChange}
						value={value}
					/>
				)}
				{value === undefined && (
					<input
						checked={checked}
						placeholder={placeholder}
						type={type}
						onChange={handleChange}
					/>
				)}
				<StyledCheckmark className="checkmark" />
				{label}
			</label>
		</StyledCheckboxContainer>
	)
}

export default Checkbox
