/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import React, { FunctionComponent } from "react"
import classNames from "classnames"

interface ColProps {
	/** html id for main button dom element */
	id?: string
	/** custom class list */
	classes?: string
	/** custom class list */
	className?: string
	/** col will take all height but width will depends on content */
	noGrow?: boolean
	/** flex-basis and width for col */
	basis?: number
}

export const Col: FunctionComponent<ColProps> = ({
	id,
	className,
	classes,
	children,
	noGrow,
	basis,
}) => {
	const newClasses: string = classNames(className, classes)
	return (
		<div
			id={id}
			css={css`
				display: flex;
				flex-direction: column;
				flex: ${!noGrow && 1};
				flex-grow: ${basis && 0};
				flex-basis: ${basis && basis * 100 + "%"};
				width: ${basis && basis * 100 + "%"};
			`}
			className={newClasses}
		>
			{children}
		</div>
	)
}

export default Col
