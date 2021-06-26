/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import React, { FunctionComponent } from "react"
import { StyledButton, StyledLinkButton } from "../button"
import classNames from "classnames"

interface ButtonLineProps {
	/** custom class list */
	className?: string
	/** custom class list */
	classes?: string
	/** all buttons will stick to the left */
	left?: boolean
	/** all buttons will stick to the left */
	right?: boolean
	/** there are will be spaces between buttons */
	between?: boolean
	/** there are will be spaces around buttons */
	around?: boolean
	/** add top margin to button line */
	top?: boolean
	/** add bottom margin to button line */
	bottom?: boolean
}
/** flex line for buttons with different types of spacing*/
export const ButtonLine: FunctionComponent<ButtonLineProps> = (props) => {
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
	return (
		<div
			css={css`
				display: flex;
				justify-content: center;
				align-items: center;
				justify-content: ${left && "flex-start"};
				justify-content: ${right && "flex-end"};
				justify-content: ${between && "space-between"};
				justify-content: ${around && "space-around"};
				margin-top: ${top && "10px"};
				margin-bottom: ${bottom && "10px"};
				${StyledButton}, ${StyledLinkButton} {
					margin-right: 10px;

					&:last-child {
						margin-right: 0;
					}
				}
			`}
			className={newClasses}
		>
			{children}
		</div>
	)
}

export default ButtonLine
