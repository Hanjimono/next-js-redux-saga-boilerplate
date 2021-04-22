import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import ReactTooltip from "react-tooltip"
import Icon from "App/ui/icon"
import "./styles.scss"

function Tooltip(props) {
	const {
		className,
		classes,
		children,
		content,
		size,
		noIcon,
		noBorder,
		place,
		icon
	} = props
	const newClasses = classNames(
		className,
		classes,
		"tooltip-container",
		{
			"only-icon": !children,
			"no-icon": noIcon,
			"no-border": noBorder,
		},
		place
	)
	const id =
		"tooltip-" +
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15)
	return (
		<div
			style={{ minWidth: size }}
			data-tip
			data-for={id}
			className={newClasses}
		>
			{children}
			{!noIcon && <Icon name={icon} size={size} />}
			<ReactTooltip id={id} place={place} effect="solid">
				{content}
			</ReactTooltip>
		</div>
	)
}

Tooltip.propTypes = {
	/** custom class list */
	className: PropTypes.string,
	/** custom class list */
	classes: PropTypes.string,
	/** component content */
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(
			PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func])
		),
		PropTypes.element,
		PropTypes.string,
		PropTypes.func,
	]),
	/** content of popup tooltip */
	content: PropTypes.oneOfType([
		PropTypes.arrayOf(
			PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func])
		),
		PropTypes.element,
		PropTypes.string,
		PropTypes.func,
	]),
	/** icon size */
	size: PropTypes.number,
	/** hide icon */
	noIcon: PropTypes.bool,
	/** render tooltip without border */
	noBorder: PropTypes.bool,
	place: PropTypes.string,
	/** material icon name */
	icon: PropTypes.string,
}

Tooltip.defaultProps = {
	size: 25,
	place: "top",
	icon: "help"
}

export default Tooltip
