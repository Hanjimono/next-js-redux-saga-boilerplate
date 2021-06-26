/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import React, { FunctionComponent } from "react"
import {
	buttonPadding,
	buttonBorderRadius,
	buttonColor,
	buttonTextColor,
	buttonMinWidth,
	buttonFontWeight,
	buttonFontSize,
	buttonNoBgPadding,
	buttonColorHover,
	buttonNoBgPaddingHover,
	buttonNoBgColorHover,
	buttonInfoColor,
	buttonInfoColorHover,
	buttonTransparentColor,
	buttonTransparentColorHover,
	buttonCancelColor,
	buttonCancelColorHover,
} from "App/assets/scss/variables"
import Icon from "../icon"
import classNames from "classnames"
import Link from "next/link"
import Loader from "../loader"

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

const StyledButtonImage = styled.div`
	width: 24px;
	height: 24px;
	opacity: 0.8;

	img {
		width: 100%;
	}
`

const StyledButtonIcon = styled(Icon)`
	color: ${buttonTextColor};
	margin-right: 2px;
`

const StyledButton = styled.div<ButtonProps>`
	padding: ${({ noPadding }) => (noPadding ? 0 : buttonPadding)};
	cursor: pointer;
	border-radius: ${buttonBorderRadius};
	width: fit-content;
	height: fit-content;
	background-color: ${buttonColor};
	color: ${buttonTextColor};
	user-select: none;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	min-width: ${buttonMinWidth};
	font-weight: ${buttonFontWeight};
	font-size: ${buttonFontSize};
	line-height: 24px;
	white-space: nowrap;
	&:hover {
		background-color: ${buttonColorHover};

		${StyledButtonImage} {
			opacity: 1;
		}
	}
	${({ disabled }) =>
		disabled &&
		`
		opacity: 0.7;
		pointer-events: none;
	`}
	${({ cancel }) =>
		cancel &&
		`
		background-color: ${buttonCancelColor};

    &:hover {
      background-color: ${buttonCancelColorHover};
    }
		`}
	${({ info }) =>
		info &&
		`
		border-color: ${buttonInfoColor};
    background-color: ${buttonInfoColor};

		&:hover {
			border-color: ${buttonInfoColorHover};
      background-color: ${buttonInfoColorHover};
		}
  `}
	${({ noBg, info, cancel }) =>
		noBg &&
		`
		color: ${buttonColor};
		background-color: transparent;
		border: 1px solid ${buttonColor};
		padding: ${buttonNoBgPadding};
		color: ${info && buttonInfoColor};
		border-color: ${info && buttonInfoColor};
		color: ${cancel && buttonCancelColor};
		border-color: ${cancel && buttonCancelColor};

		&:hover {
			color: ${buttonColorHover};
			background-color: ${buttonNoBgColorHover};
			border: 2px solid ${buttonColorHover};
			padding: ${buttonNoBgPaddingHover};
			color: ${info && buttonInfoColorHover};
			border-color: ${info && buttonInfoColorHover};
			color: ${cancel && buttonCancelColorHover};
			border-color: ${cancel && buttonCancelColorHover};
			${StyledButtonIcon} {
				color: ${buttonColorHover};
				color: ${info && buttonInfoColorHover};
				color: ${cancel && buttonCancelColorHover};
			}
		}
		${StyledButtonIcon} {
			color: ${buttonColor};
			color: ${info && buttonInfoColor};
			color: ${cancel && buttonCancelColor};
		}
	`}
	${({ link }) =>
		!!link &&
		`
    text-decoration: none;

		&:hover {
			text-decoration: none;
		}
	`}
	${({ transparent, info, cancel }) =>
		!!transparent &&
		`
			background-color: transparent;
			color: ${buttonTransparentColor};
			color: ${info && buttonInfoColor};
			color: ${cancel && buttonCancelColor};

			&:hover {
				background-color: transparent;
				color: ${buttonTransparentColorHover};
				color: ${info && buttonInfoColorHover};
				color: ${cancel && buttonCancelColorHover};

				${StyledButtonIcon} {
					color: ${buttonTransparentColorHover};
					color: ${info && buttonInfoColorHover};
					color: ${cancel && buttonCancelColorHover};
				}
			}

			${StyledButtonIcon} {
				color: ${buttonTransparentColor};
				color: ${info && buttonInfoColor};
				color: ${cancel && buttonCancelColor};
			}
		`}
  min-height: ${({ noText }) => noText && `22px`};

	${({ wide, icon, image }) =>
		wide &&
		`
    text-align: center;
    width: calc(100% - 30px);
		flex: 1 1;
		padding-left: ${(icon || image) && "15px"}
	`}
`

const StyledLinkButton = StyledButton.withComponent("a")

export const Button: FunctionComponent<ButtonProps> = (props) => {
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
		iconSize = 24,
		noBg,
		customIcon,
		loading,
		info,
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
			<Link href={link} passHref>
				<StyledLinkButton className={newClasses} {...props}>
					{image && (
						<StyledButtonImage className="button-image">
							<img src={image} />
						</StyledButtonImage>
					)}
					{icon && (
						<StyledButtonIcon
							className="button-icon"
							name={icon}
							custom={customIcon ? icon : ""}
							size={iconSize}
						/>
					)}
					{children}
				</StyledLinkButton>
			</Link>
		)
	}
	return (
		<StyledButton {...props} className={newClasses}>
			{loading && (
				<div className="button-loader">
					<Loader spinner fetching={loading} />
				</div>
			)}
			{image && (
				<StyledButtonImage className="button-image">
					<img src={image} />
				</StyledButtonImage>
			)}
			{icon && (
				<StyledButtonIcon
					className="button-icon"
					name={icon}
					custom={customIcon ? icon : ""}
					size={iconSize}
				/>
			)}
			{children}
		</StyledButton>
	)
}

export default Button
