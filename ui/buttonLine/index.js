import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import "./styles.scss"

/** flex line for buttons with different types of spacing*/
export function ButtonLine(props) {
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
	} = props
	const newClasses = classNames(className, classes, "button-line", {
		left,
		right,
		between,
		around,
		top,
		bottom,
	})
	return <div className={newClasses}>{children}</div>
}

ButtonLine.propTypes = {
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

ButtonLine.defaultProps = {}

export default ButtonLine
