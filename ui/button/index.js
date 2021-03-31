import React from "react"
import PropTypes from "prop-types"
import Icon from "../icon"
import classNames from "classnames"
import { withRouter } from "next/router"
import Link from "next/link"
import Loader from "../loader"
import "./styles.scss"

function Button(props) {
	const {
		className,
		classes,
		onClick,
		children,
		id,
		disabled,
		transparent,
		noText,
		icon,
		noPadding,
		wide,
		link,
		cancel,
		image,
		iconSize,
		noBg,
		customIcon,
		loading,
		info,
		target,
	} = props
	const newClasses = classNames(className, classes, "button", {
		disabled: disabled,
		transparent: transparent,
		"no-text": noText,
		"with-icon": icon || image,
		"no-padding": noPadding,
		wide,
		"button-link": !!link,
		cancel,
		"no-background": noBg,
		info,
	})
	if (link) {
		return (
			<Link href={link}>
				<a target={target} onClick={onClick} className={newClasses} id={id}>
					{image && (
						<div className="button-image">
							<img src={image} />
						</div>
					)}
					{icon && (
						<Icon
							className="button-icon"
							name={icon}
							custom={customIcon ? icon : ""}
							size={iconSize}
						/>
					)}
					{children}
				</a>
			</Link>
		)
	}
	return (
		<div onClick={onClick} className={newClasses} id={id}>
			{loading && (
				<div class="button-loader">
					<Loader spinner fetching="loading" />
				</div>
			)}
			{image && (
				<div className="button-image">
					<img src={image} />
				</div>
			)}
			{icon && (
				<Icon
					className="button-icon"
					name={icon}
					custom={customIcon ? icon : ""}
					size={iconSize}
				/>
			)}
			{children}
		</div>
	)
}

Button.propTypes = {
	/** on click function */
	onClick: PropTypes.func,
	/** html id for main button dom element */
	id: PropTypes.string,
	/** custom class list */
	classes: PropTypes.string,
	/** custom class list */
	className: PropTypes.string,
	/** content inside button wrapper */
	children: PropTypes.any,
	/** when true button did not work */
	disabled: PropTypes.bool,
	/** button without bg and without border */
	transparent: PropTypes.bool,
	/** button without text */
	noText: PropTypes.bool,
	/** material icon name or custom image src for button */
	icon: PropTypes.string,
	/** remove button padding */
	noPadding: PropTypes.bool,
	/** use button as link to different page */
	link: PropTypes.string,
	/** button with cancel class */
	cancel: PropTypes.bool,
	/** src for image wich will be used as button */
	image: PropTypes.string,
	/** button icon size */
	iconSize: PropTypes.number,
	/** button without bg but with border */
	noBg: PropTypes.bool,
	/** when true use a custom src icon */
	customIcon: PropTypes.bool,
	/** button with info class */
	info: PropTypes.bool,
	/** when true show loader inside the button */
	loading: PropTypes.bool,
	/** target for link dom component */
	target: PropTypes.string,
	/** wide button will take all available space */
	wide: PropTypes.bool,
}

Button.defaultProps = {
	onClick: () => {},
	id: null,
	classes: "",
	className: "",
	icon: "",
	link: "",
	children: null,
	disabled: false,
	transparent: false,
	noText: false,
	noPadding: false,
	wide: false,
	cancel: false,
	iconSize: 24,
}

export default Button
