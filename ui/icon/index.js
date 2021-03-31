import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import "./styles.scss"

function Icon(props) {
	const { name, size, className, custom } = props
	const fontSize = size + "px"
	const newClasses = classNames(className, "icon-container", {
		"material-icons": !!!custom,
		"custom-icom": !!custom,
	})
	if (custom) {
		return (
			<div className={newClasses} style={{ width: fontSize, height: fontSize }}>
				<img src={custom} />
			</div>
		)
	}
	return (
		<i className={newClasses} style={{ fontSize }}>
			{name}
		</i>
	)
}

Icon.propTypes = {
	name: PropTypes.string,
	size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	className: PropTypes.string,
	custom: PropTypes.string,
}

Icon.defaultProps = {
	name: "menu",
	size: 10,
}

export default Icon
