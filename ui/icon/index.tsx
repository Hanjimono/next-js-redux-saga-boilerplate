/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import React, { FunctionComponent } from "react"
import classNames from "classnames"

interface IconProps {
	/** material icon name */
	name?: string
	/** custom class list */
	classes?: string
	/** font-size for material icon and width/height for custom icon */
	size?: number
	/** custom class list */
	className?: string
	/** src for custom icon */
	custom?: string
}

export const Icon: FunctionComponent<IconProps> = ({
	name = "menu",
	size = 10,
	classes,
	className,
	custom,
}) => {
	const fontSize = size + "px"
	const newClasses = classNames(classes, className, "icon-container", {
		"material-icons": !!!custom,
		"custom-icon": !!custom,
	})
	if (custom) {
		return (
			<div
				className={newClasses}
				css={css`
					width: ${size}px;
					height: ${size}px;
				`}
			>
				<img
					css={css`
						width: 100%;
					`}
					src={custom}
				/>
			</div>
		)
	}
	return (
		<i
			className={newClasses}
			css={css`
				font-size: ${size}px;
			`}
		>
			{name}
		</i>
	)
}

export default Icon
