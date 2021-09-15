/** @jsxImportSource @emotion/react */
import React, { FunctionComponent } from "react"
import styled from "@emotion/styled"
import classNames from "classnames"
import { fixedContainerSize } from "App/assets/scss/variables"
interface ContainerProps {
	/** html id for main button dom element */
	id?: string
	/** custom class list */
	classes?: string
	/** custom class list */
	className?: string
	/** will take all space on the screen absolutely */
	total?: boolean
	/** add display flex and flex-direction column to container */
	flex?: boolean
	/** add left anr right margin auto to container */
	centered?: boolean
	/** add fixed max-width defined in global variables */
	fixed?: boolean
	/** take all available height */
	maxHeight?: boolean
}

const StyledContainer = styled.div<ContainerProps>`
	width: 100%;
	${({ total }) =>
		total &&
		` 
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    `}
	${({ flex }) =>
		flex &&
		` 
      display: flex;
      flex-direction: column;
    `}
  ${({ centered }) =>
		centered &&
		` 
      margin-left: auto;
      margin-right: auto;
    `}
  ${({ fixed }) =>
		fixed &&
		` 
      max-width: ${fixedContainerSize};
    `}
  ${({ maxHeight }) =>
		maxHeight &&
		` 
      height: 100%;
    `}
`

export const Container: FunctionComponent<ContainerProps> = (props) => {
	const {
		className,
		classes,
		total,
		children,
		flex,
		centered,
		fixed,
		maxHeight,
	} = props
	const newClasses = classNames(className, classes, "container", {
		total,
		flex,
		centered,
		fixed,
		"maximum-height": maxHeight,
	})
	return (
		<StyledContainer className={newClasses} {...props}>
			{children}
		</StyledContainer>
	)
}

export default Container
