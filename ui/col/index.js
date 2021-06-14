import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import "./styles.scss"

function Col(props) {
	const { className, classes, children, noGrow, basis } = props
	const newClasses = classNames(className, classes, "col", {
		grow: !noGrow,
		"with-basis": !!basis,
	})
	let style = {}
	if (basis) {
		style = {
			flexBasis: basis * 100 + "%",
			width: basis * 100 + "%",
		}
	}
	return (
		<div style={style} className={newClasses}>
			{children}
		</div>
	)
}

Col.propTypes = {
	/** html id for main button dom element */
	id: PropTypes.string,
	/** custom class list */
	classes: PropTypes.string,
	/** custom class list */
	className: PropTypes.string,
	/** content inside button wrapper */
	children: PropTypes.any,
	/** col will take all height but width will depends on content */
	noGrow: PropTypes.bool,
	/** flex-basis and width for col */
	basis: PropTypes.number,
}

export default Col
