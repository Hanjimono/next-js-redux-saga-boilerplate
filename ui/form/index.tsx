/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import classNames from "classnames"
import { stringify } from "query-string"
import React, { FunctionComponent, ReactNode } from "react"
import ButtonLine from "Ui/buttonLine"
import {
	formErrorBorderColor,
	formErrorColor,
	formErrorBorderRadius,
	formErrorContainerPadding,
	formErrorHeight,
	formErrorMarginBottom,
	formErrorMarginTop,
	formErrorTextSize,
	fieldError,
} from "App/assets/scss/variables"

interface FormFieldsProps {
	/** list of errors passed to form from api */
	apiErrors?: { [key: string]: string }
}

interface RenderFieldsProps {
	children: ReactNode
	/** params for form field */
	params?: FormFieldsProps
	/** name of form field */
	name?: string
	/** error for form field passed from api */
	apiError?: string
}

export const RenderFields = ({ children, params }: RenderFieldsProps) =>
	React.Children.map(children, (child, i) => {
		if (!React.isValidElement<RenderFieldsProps>(child)) {
			return child
		}
		let props: { key: number; apiError?: string } = {
			key: i,
		}
		if (
			params &&
			params.apiErrors &&
			child.props.name &&
			params.apiErrors[child.props.name]
		) {
			props.apiError = params.apiErrors[child.props.name]
		}
		return React.cloneElement(child, props, child.props.children)
	})

interface FormProps extends FormFieldsProps {
	/** html id for main button dom element */
	id?: string
	/** custom class list */
	classes?: string
	/** custom class list */
	className?: string
}

export const Form: FunctionComponent<FormProps> = (props) => {
	const { className, classes, children, apiErrors } = props
	const newClasses = classNames(className, classes, "form")
	return (
		<form className={newClasses}>
			{RenderFields({ children, params: { apiErrors } })}
		</form>
	)
}

interface FormBottomProps {
	/** align form bottom to left */
	left?: boolean
	/** align form bottom to center */
	center?: boolean
}

const StyledFormBottom = styled(ButtonLine)`
	margin-top: 5px;
`

export const FormBottom: FunctionComponent<FormBottomProps> = (props) => {
	const { children, ...rest } = props
	let right = false
	if (!rest.left && !rest.center) {
		right = true
	}
	return (
		<StyledFormBottom
			className={"form-buttons-bottom-container"}
			right={right}
			{...rest}
		>
			{children}
		</StyledFormBottom>
	)
}

interface FormErrorProps {
	/** custom class list */
	classes?: string
	/** custom class list */
	className?: string
	/** text of error */
	error?: string
	/** fixed error size */
	fixed?: boolean
	/** render error without padding */
	noPadding?: boolean
	/** render error without border */
	noBorder?: boolean
	/** left text align */
	left?: boolean
	/** center text align */
	center?: boolean
	/** right text align */
	right?: boolean
	/** min height for error container */
	size?: number
}

const StyledFormErrorBlockText = styled.div`
	color: ${formErrorColor};
	font-size: ${formErrorTextSize};
	font-size: ${formErrorTextSize};
`

const StyledFormErrorBlock = styled.div<FormErrorProps>`
	width: 100%;
	height: fit-content;
	border: 1px solid ${formErrorBorderColor};
	border-radius: ${formErrorBorderRadius};
	padding: ${formErrorContainerPadding};
	${({ fixed }) =>
		fixed &&
		`
	  	overflow: hidden;
			${StyledFormErrorBlockText} {
        overflow: hidden;
        max-height: $formErrorHeight;
        min-height: $formErrorHeight;
        text-overflow: ellipsis;
        white-space: nowrap;
			}
    `}

	${({ error }) =>
		(!error || (error && error.length == 0)) &&
		`
			border: none;
		`}
	
	${({ noBorder }) =>
		noBorder &&
		`
			border: none;
		`}

	${({ noPadding }) =>
		noPadding &&
		`
			padding: 0;
		`}

	${({ left }) =>
		left &&
		`
			${StyledFormErrorBlockText} {
        text-align: left;
			}
		`}
		
	${({ center }) =>
		center &&
		`
			${StyledFormErrorBlockText} {
				text-align: center;
			}
		`}

	${({ right }) =>
		right &&
		`
			${StyledFormErrorBlockText} {
				text-align: right;
			}
		`}
`

const StyledFormErrorWrapper = styled.div<FormErrorProps>`
	margin-top: ${formErrorMarginTop};
	margin-bottom: ${formErrorMarginBottom};
	display: flex;
	align-items: center;
	${({ size }) =>
		size &&
		`
		minHeight: ${size}px
	`}
	${({ size, fixed }) =>
		size &&
		fixed &&
		`
		maxHeight: ${size}px
	`}
`

export const FormError: FunctionComponent<FormErrorProps> = (props) => {
	const {
		className,
		classes,
		error,
		fixed,
		noPadding,
		noBorder,
		left,
		center,
		right,
		size,
	} = props
	const newClasses = classNames(className, classes, "form-error-block", {
		fixed,
		"no-border": noBorder,
		"no-padding": noPadding,
		empty: !error || (error && error.length == 0),
		left,
		center,
		right,
	})
	return (
		<StyledFormErrorWrapper className={"form-error-wrapper"} {...props}>
			<StyledFormErrorBlock className={newClasses} {...props}>
				<StyledFormErrorBlockText className={"form-error-block-text"}>
					{error}
				</StyledFormErrorBlockText>
			</StyledFormErrorBlock>
		</StyledFormErrorWrapper>
	)
}

interface FormErrorBottomProps {
	/** custom class list */
	classes?: string
	/** custom class list */
	className?: string
	/** text of error */
	error?: string
}

const StyledFormErrorBottomContainer = styled.div`
	border: 1px solid ${fieldError};
	border-radius: 3px;
	margin-bottom: 16px;
`
const StyledFormErrorBottomText = styled.div`
	color: ${fieldError};
	font-size: 12px;
	font-size: 12px;
	margin: 5px 10px;
`

export const FormErrorBottom: FunctionComponent<FormErrorProps> = (props) => {
	const { error } = props
	if (!error || (error && error.length == 0)) {
		return null
	}
	return (
		<StyledFormErrorBottomContainer className={"form-error-bottom-container"}>
			<StyledFormErrorBottomText className={"form-error-bottom-text"}>
				{error}
			</StyledFormErrorBottomText>
		</StyledFormErrorBottomContainer>
	)
}

export default Form
