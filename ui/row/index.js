import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import "./styles.scss"

function Row(props) {
	const { className, classes, children, noGrow, basis } = props
	const newClasses = classNames(className, classes, "row", {
		grow: !noGrow,
		"with-basis": !!basis,
	})
	let style = {}
	if (basis) {
		style = {
			flexBasis: basis * 100 + "%",
			height: basis * 100 + "%",
		}
	}
	return (
		<div style={style} className={newClasses}>
			{children}
		</div>
	)
}

Row.propTypes = {
	/** html id for main button dom element */
	id: PropTypes.string,
	/** custom class list */
	classes: PropTypes.string,
	/** custom class list */
	className: PropTypes.string,
	/** content inside button wrapper */
	children: PropTypes.any,
	/** row will take all width but height will depend on content */
	noGrow: PropTypes.bool,
	/** flex-basis and height for col */
	basis: PropTypes.number,
}

export default Row
