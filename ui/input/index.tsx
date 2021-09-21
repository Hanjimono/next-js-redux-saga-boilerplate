/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import React, { ChangeEventHandler, FunctionComponent } from "react"
import classNames from "classnames"
import {
	inputBorder,
	inputBorderRadius,
	inputBorderSize,
	inputFontSize,
	infoBoxFontSize,
	inputHeight,
	inputIncrementColor,
	inputIncrementColorHover,
	inputIncrementDistance,
	inputIncrementHeight,
	inputIncrementSize,
	inputInlineBorder,
	inputLineHeight,
	inputPadding,
	inputTransparentColor,
	fontSize,
	textColorInput
} from "App/assets/scss/variables"

interface InputProp {
	/** name for input */
	name: string
	/** input placeholder */
	placeholder?: string,
	/** input type */
	type?: string,
	/** custom class list */
	classes?: string,
	/** custom class list */
	className?: string,
	/** input value */
	value?: number,
	/** flag for inline input style */
	inline?: boolean,
	/** add increment arrows */
	increment?: boolean,
	/** value of one increment click */
	incrementStep?: number,
	/** flag of error styles for input */
	hasError?: boolean,
	/** on change callback function */
	onChange?: (name: string, value: string) => void
}

const StyledInputContainer = styled.div<InputProp>`
	flex: 1;
	position: relative;
	overflow: hidden;
	word-wrap: break-word;
	line-height: ${inputLineHeight};
	min-height: ${inputHeight};
	max-height: ${inputHeight};
	box-sizing: border-box;
	padding: 0;
	border: ${inputBorderSize} solid ${inputBorder};
	border-radius: ${inputBorderRadius};
	${({hasError}) => hasError && `
		border: ${inputBorderSize} solid ${fieldError};
	`}
	input {
		font-size: ${fontSize};
		outline: 0;
		border: 0;
		line-height: ${inputHeight};
		padding: 0 ${inputPadding};
		width: calc(100% - #{${inputPadding}*2});
		color: ${textColorInput};
	}
	${({increment}) => increment && `
		input {
			padding-right: (${inputPadding}*2)+(${inputIncrementSize}*2);
			width: calc(100% - #{(${inputPadding}*3)+(${inputIncrementSize}*2)});
		}
	`}
	${({inline}) => inline && `
		border-radius: 0;
		border: none;
		border-bottom: ${inputInlineBorder};
		input {
			background: transparent;
			color: ${inputTransparentColor};
		}
	`}
`

const StyledIncrementButton = styled.div`
	border: ${inputIncrementHeight} solid ${inputIncrementColor};
	border-left: ${inputIncrementSize} solid transparent;
	border-right: ${inputIncrementSize} solid transparent;
	cursor: pointer;
`

const StyledIncrementButtonUp = styled(StyledIncrementButton)`	
	border-top: ${inputIncrementHeight} solid transparent;
	margin-bottom: ${inputIncrementDistance};

	&:hover {
		border-bottom: ${inputIncrementHeight} solid ${inputIncrementColorHover};
	}
`

const StyledIncrementButtonDown = styled(StyledIncrementButton)`
	border-bottom: ${inputIncrementHeight} solid transparent;

	&:hover {
		border-top: ${inputIncrementHeight} solid ${inputIncrementColorHover};
	}
`

const StyledIncrementContainer = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	top: 0;
	right: ${inputPadding};
	min-height: ${inputHeight};
	justify-content: center;
	height: 100%;
`

export const Input: FunctionComponent<InputProp> = (props) => {
  const {
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
		hasError,
	} = props
	const newClasses = classNames(className, classes, "input-container", {
		error: hasError,
		"inline-input": inline,
		increment,
	})
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    type ChangeEvent = React.ChangeEvent<HTMLInputElement>
    const value = e.currentTarget.value
		if (onChange) {
			onChange(name, value)
		}
	}
	const handleIncrement = (decrement: boolean) => {
		let formattedValue = 0
		if (value) {
			formattedValue = value
		}
		if (incrementStep) {
      formattedValue = 
			decrement
				? formattedValue - incrementStep
				: Number(formattedValue) + Number(incrementStep)
		}
    const event = {
      currentTarget: {
        value: String(value),
      }
    } as React.ChangeEvent<HTMLInputElement>;
    handleChange(event)
	}
	return (
		<StyledInputContainer {...props} onChange={undefined} className={newClasses}>
			{value !== undefined && (
				<input
					{...props}
					placeholder={placeholder}
					type={type}
					onChange={handleChange}
					value={value}
				/>
			)}
			{value === undefined && (
				<input
					{...props}
					placeholder={placeholder}
					type={type}
					onChange={handleChange}
				/>
			)}
			{increment && (
				<StyledIncrementContainer>
					<StyledIncrementButtonUp
						onClick={() => handleIncrement(false)}
					></StyledIncrementButtonUp>
					<StyledIncrementButtonDown
						onClick={() => handleIncrement(true)}
					></StyledIncrementButtonDown>
				</StyledIncrementContainer>
			)}
		</StyledInputContainer>
	)
}

export default Input