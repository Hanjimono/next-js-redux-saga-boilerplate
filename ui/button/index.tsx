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
} from "App/assets/scss/variables"
import Icon from "../icon"
import classNames from "classnames"
import Link from "next/link"
import Loader from "../loader"
// import "./styles.scss"

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
	${({ disabled }) =>
		disabled &&
		`
		opacity: 0.7;
		pointer-events: none;
	`}
	${({ noBg }) =>
		noBg &&
		`
		color: ${buttonColor};
		background-color: transparent;
		border: 1px solid ${buttonColor};
		padding: ${buttonNoBgPadding};

		&:hover {
			color: ${buttonColorHover};
			background-color: ${buttonNoBgColorHover};
			border: 2px solid ${buttonColorHover};
			padding: ${buttonNoBgPaddingHover};
		}
	`}
	${({ info }) =>
		info &&
		`
		color: ${buttonInfoColor};
		border-color: ${buttonInfoColor};
		background-color: ${buttonNoBgColorHover};

		&:hover {
			color: ${buttonInfoColorHover};
			border-color: ${buttonInfoColorHover};
			background-color: ${buttonNoBgColorHover};
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
	${({ transparent }) =>
		!!transparent &&
		`
			background-color: transparent;
			color: ${buttonTransparentColor};

			&:hover {
				color: ${buttonTransparentColorHover};
			}

			.button-icon {
				color: ${buttonTransparentColor};

				&:hover {
					color: ${buttonTransparentColorHover};
				}
			}
		`}
  min-height: ${({ noText }) => noText && `22px`};

	${({ wide }) =>
		wide &&
		`
    text-align: center;
    width: calc(100% - 30px);
    &.with-icon {
      padding-left: 15px;
    }

    .button-icon {
    }
	`}
	&:hover {
		background-color: ${buttonColorHover};

		${StyledButtonImage} {
			opacity: 1;
		}
	}
`

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
	const buttonIconStyle = css`
		color: ${buttonTextColor};
		margin-right: 2px;
	`
	if (link) {
		return (
			<Link href={link}>
				<a target={target} onClick={onClick} className={newClasses} id={id}>
					{image && (
						<StyledButtonImage className="button-image">
							<img src={image} />
						</StyledButtonImage>
					)}
					{icon && (
						<Icon
							css={buttonIconStyle}
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
		<StyledButton
			info={info}
			transparent={transparent}
			noBg={noBg}
			noText={noText}
			onClick={onClick}
			className={newClasses}
			id={id}
		>
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
				<Icon
					css={buttonIconStyle}
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
