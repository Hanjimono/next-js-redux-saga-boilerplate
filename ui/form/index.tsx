/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import classNames from "classnames"
import { stringify } from "query-string"
import React, { FunctionComponent, ReactNode } from "react"

interface FormFieldsProps {
    /** list of errors passed to form from api */
    apiErrors?: { [key: string]: string; }
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
		let props: ({key: number, apiError?: string}) = {
			key: i
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

export default Form
