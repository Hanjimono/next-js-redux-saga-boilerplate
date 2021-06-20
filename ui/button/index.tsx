/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import React, { FunctionComponent } from "react"
import {
	buttonPadding,
	buttonBorderRadius,
	buttonColor,
	buttonTextColor,
	buttonMinWidth,
	buttonFontWeight,
	buttonFontSize,
} from "App/assets/scss/variables"
import Icon from "../icon"
import classNames from "classnames"
import Link from "next/link"
import Loader from "../loader"
import "./styles.scss"

interface ButtonProps {
	/** on click function */
	onClick?: () => void
	/** html id for main button dom element */
	id?: string
	/** custom class list */
	classes?: string
	/** custom class list */
	className?: string
	/** when true button did not work */
	disabled?: boolean
	/** button without bg and without border */
	transparent?: boolean
	/** button without text */
	noText?: boolean
	/** material icon name or custom image src for button */
	icon?: string
	/** remove button padding */
	noPadding?: boolean
	/** use button as link to different page */
	link?: string
	/** button with cancel class */
	cancel?: boolean
	/** src for image wich will be used as button */
	image?: string
	/** button icon size */
	iconSize?: number
	/** button without bg but with border */
	noBg?: boolean
	/** when true use a custom src icon */
	customIcon?: boolean
	/** button with info class */
	info?: boolean
	/** when true show loader inside the button */
	loading?: boolean
	/** target for link dom component */
	target?: string
	/** wide button will take all available space */
	wide?: boolean
}

export const Button: FunctionComponent<ButtonProps> = ({
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
	iconSize = 24,
	noBg,
	customIcon,
	loading,
	info,
	target,
}) => {
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
	const style = css`
		padding: ${noPadding ? 0 : buttonPadding};
		cursor: pointer;
		border-radius: ${buttonBorderRadius};
		width: fit-content;
		height: fit-content;
		background-color: ${noBg ? "transparent" : buttonColor};
		color: ${noBg ? buttonColor : buttonTextColor};
		user-select: none;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: ${buttonMinWidth};
		font-weight: ${buttonFontWeight};
		font-size: ${buttonFontSize};
		line-height: 24px;
		opacity: ${disabled && 0.7};
		pointer-events: ${disabled && "none"};

	`
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
				<div className="button-loader">
					<Loader spinner fetching={loading} />
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

export default Button
