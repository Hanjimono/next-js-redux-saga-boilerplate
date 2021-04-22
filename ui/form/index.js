import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import ButtonLine from "Ui/buttonLine"
import "./styles.scss"

const renderFields = (children, params) => {
	if (!(children instanceof Array)) {
		children = [children]
	}
	return children.map((child, i) => {
		if (!child) return null
		if (child instanceof Array) {
			return renderFields(child)
		}
		let props = {
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
}

export function Form(props) {
	const { className, classes, children, apiErrors } = props
	const newClasses = classNames(className, classes, "form")
	return (
		<form className={newClasses}>{renderFields(children, { apiErrors })}</form>
	)
}

Form.propTypes = {
	/** content of form */
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
	/** pass errors from this object to form fields */
	apiErrors: PropTypes.object,
}

export function FormBottom(props) {
	const { children, ...rest } = props
	let right = false
	if (!rest.left && !rest.center) {
		right = true
	}
	return (
		<ButtonLine
			className={"form-buttons-bottom-container"}
			right={right}
			{...rest}
		>
			{children}
		</ButtonLine>
	)
}

FormBottom.propTypes = {
	children: PropTypes.element,
}

export function FormError(props) {
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
	let styles = {}
	if ((!error || error.length == 0) && !fixed) {
		return null
	}
	if (size) {
		styles = {
			minHeight: size + "px",
		}
		if (fixed) {
			styles.maxHeight = size + "px"
		}
	}
	return (
		<div className={"form-error-wrapper"} style={styles}>
			<div className={newClasses}>
				<div className={"form-error-block-text"}>{error}</div>
			</div>
		</div>
	)
}

FormError.propTypes = {
	/** text of error */
	error: PropTypes.string.isRequired,
	/** fixed error size */
	fixed: PropTypes.bool,
	/** render error without padding */
	noPadding: PropTypes.bool,
	/** render error without border */
	noBorder: PropTypes.bool,
	/** left text align */
	left: PropTypes.bool,
	/** center text align */
	center: PropTypes.bool,
	/** right text align */
	right: PropTypes.bool,
	/** min height for error container */
	size: PropTypes.number,
}

ErrorBottom.defaultProps = {
	error: "",
}

export function ErrorBottom(props) {
	const { error } = props
	if (error.length == 0) {
		return null
	}
	return (
		<div className={"form-error-bottom-container"}>
			<div className={"form-error-bottom-text"}>{error}</div>
		</div>
	)
}

ErrorBottom.propTypes = {
	/** error text */
	error: PropTypes.string.isRequired,
}

ErrorBottom.defaultProps = {
	error: "",
}
