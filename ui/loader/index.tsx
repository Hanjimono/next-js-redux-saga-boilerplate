/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import React, { FunctionComponent } from "react"
import classNames from "classnames"
import { loaderColor, blockColor } from "App/assets/scss/variables"

interface LoaderProps {
	/** true will render loader */
	fetching?: boolean
	/** custom class list */
	className?: string
	/** custom class list */
	classes?: string
	/** use loader as mask */
	mask?: boolean
	/** little spinner white loader */
	spinner?: boolean
	/** use loader as absolute page overlay */
	overlay?: boolean
}

const StyledLoader = styled.div<LoaderProps>`
	display: inline-block;
	position: relative;
	width: 80px;
	height: 80px;
	${({ spinner }) =>
		!spinner &&
		`
			> div {
				position: absolute;
				width: 6px;
				height: 6px;
				background: ${loaderColor};
				border-radius: 50%;
				animation: loader 1.2s linear infinite;
			}
			div:nth-child(1) {
				animation-delay: 0s;
				top: 37px;
				left: 66px;
			}
			div:nth-child(2) {
				animation-delay: -0.1s;
				top: 22px;
				left: 62px;
			}
			div:nth-child(3) {
				animation-delay: -0.2s;
				top: 11px;
				left: 52px;
			}
			div:nth-child(4) {
				animation-delay: -0.3s;
				top: 7px;
				left: 37px;
			}
			div:nth-child(5) {
				animation-delay: -0.4s;
				top: 11px;
				left: 22px;
			}
			div:nth-child(6) {
				animation-delay: -0.5s;
				top: 22px;
				left: 11px;
			}
			div:nth-child(7) {
				animation-delay: -0.6s;
				top: 37px;
				left: 7px;
			}
			div:nth-child(8) {
				animation-delay: -0.7s;
				top: 52px;
				left: 11px;
			}
			div:nth-child(9) {
				animation-delay: -0.8s;
				top: 62px;
				left: 22px;
			}
			div:nth-child(10) {
				animation-delay: -0.9s;
				top: 66px;
				left: 37px;
			}
			div:nth-child(11) {
				animation-delay: -1s;
				top: 62px;
				left: 52px;
			}
			div:nth-child(12) {
				animation-delay: -1.1s;
				top: 52px;
				left: 62px;
			}
			@keyframes loader {
				0%, 20%, 80%, 100% {
					transform: scale(1);
				}
				50% {
					transform: scale(1.5);
				}
			}
	`}
	${({ spinner }) =>
		spinner &&
		`
		> div {
      transform-origin: 40px 40px;
      animation: loader 1.2s linear infinite;
    }
		> div:after {
      content: " ";
      display: block;
      position: absolute;
      top: 29px;
      left: 37px;
      width: 2px;
      height: 5px;
      border-radius: 20%;
      background: ${loaderColor};
    }
		div:nth-child(1) {
			transform: rotate(0deg);
			animation-delay: -1.1s;
		}
		div:nth-child(2) {
			transform: rotate(30deg);
			animation-delay: -1s;
		}
		div:nth-child(3) {
			transform: rotate(60deg);
			animation-delay: -0.9s;
		}
		div:nth-child(4) {
			transform: rotate(90deg);
			animation-delay: -0.8s;
		}
		div:nth-child(5) {
			transform: rotate(120deg);
			animation-delay: -0.7s;
		}
		div:nth-child(6) {
			transform: rotate(150deg);
			animation-delay: -0.6s;
		}
		div:nth-child(7) {
			transform: rotate(180deg);
			animation-delay: -0.5s;
		}
		div:nth-child(8) {
			transform: rotate(210deg);
			animation-delay: -0.4s;
		}
		div:nth-child(9) {
			transform: rotate(240deg);
			animation-delay: -0.3s;
		}
		div:nth-child(10) {
			transform: rotate(270deg);
			animation-delay: -0.2s;
		}
		div:nth-child(11) {
			transform: rotate(300deg);
			animation-delay: -0.1s;
		}
		div:nth-child(12) {
			transform: rotate(330deg);
			animation-delay: 0s;
		}
		@keyframes loader {
			0% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
	`}
`

const StyledLoaderWrapper = styled.div<LoaderProps>`
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	${({ mask }) =>
		mask &&
		`
    background-color: rgba(10, 10, 10, 0.55);
		`}
	${({ overlay }) =>
		overlay &&
		`
		background-color: ${blockColor};
		z-index: 95;
		top: 10px;
	`}
`

export const Loader: FunctionComponent<LoaderProps> = (props) => {
	const { fetching, className, classes, mask, spinner, overlay } = props
	if (!fetching) {
		return null
	}
	const newClasses = classNames(className, classes, "loader-wrapper", {
		mask: mask,
		default: !spinner,
		spinner,
		overlay,
	})
	return (
		<StyledLoaderWrapper {...props} className={newClasses}>
			<StyledLoader {...props} className="loader">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</StyledLoader>
		</StyledLoaderWrapper>
	)
}

export default Loader
