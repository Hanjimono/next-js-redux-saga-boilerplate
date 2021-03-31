import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import "./styles.scss"

function Loader(props) {
	const { fetching, className, classes, mask, spinner, overlay } = props
	if (!fetching) {
		return null
	}
	const newClasses = classNames(className, classes, "loader-wrapper", {
		mask: mask,
		default: !spinner,
		spinner,
		overlay,
	})
	return (
		<div className={newClasses}>
			<div className="loader">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	)
}

Loader.propTypes = {
	/** true will render loader */
	fetching: PropTypes.bool,
	/** custom class list */
	className: PropTypes.string,
	/** custom class list */
	classes: PropTypes.string,
	/** use loader as mask */
	mask: PropTypes.bool,
	/** little spinner white loader */
	spinner: PropTypes.bool,
	/** use loader as absolute page overlay */
	overlay: PropTypes.bool,
}

Loader.defaultProps = {
	fetching: false,
	mask: false,
}

export default Loader
