/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import React, { FunctionComponent } from "react"
import Icon from "Ui/icon"
import classNames from "classnames"
import ReactTooltip from "react-tooltip"
import {
	tooltipBorder,
	tooltipBorderHover,
	tooltipIconColor,
	tooltipIconColorHover,
	tooltipShowBgColor,
	tooltipShowBorder,
	tooltipShowBorderRadius,
	tooltipShowFontColor,
	tooltipShowFontSize,
	tooltipShowLineHeight,
} from "App/assets/scss/variables"

type Place = "top" | "right" | "bottom" | "left"

interface TooltipProps {
	/** element content */
	children?: React.ReactNode
	/** custom class list */
	className?: string
	/** custom class list */
	classes?: string
	/** content of popup tooltip */
	content?: React.ReactNode
	/** icon size */
	size?: number
	/** hide icon */
	noIcon?: boolean
	/** render tooltip without border */
	noBorder?: boolean
	/** placement of tooltip */
	place: Place
	/** material icon name */
	icon: string
}

const StyledTooltipContainer = styled.div<TooltipProps>`
	display: flex;
	align-items: center;
	width: fit-content;
	border-bottom: ${tooltipBorder};
	i {
		color: ${tooltipIconColor};
		cursor: default;
	}

	&:hover {
		border-bottom: ${tooltipBorderHover};

		i {
			color: ${tooltipIconColorHover};
		}
	}

	.__react_component_tooltip {
		background: ${tooltipShowBgColor};
		border: ${tooltipShowBorder};
		border-radius: ${tooltipShowBorderRadius};
		color: ${tooltipShowFontColor};
		font-size: ${tooltipShowFontSize};
		line-height: ${tooltipShowLineHeight};

		&:before {
			bottom: -5px;
		}

		&:after {
			border-right: ${tooltipShowBorder}!important;
			border-bottom: ${tooltipShowBorder}!important;
			width: 8px;
			height: 8px;
			transform: rotate(45deg);
			background: ${tooltipShowBgColor};
			border-left: none !important;
			border-top: none !important;
			bottom: -6px !important;
			margin-left: -5px !important;
		}
	}

	${({ children }) =>
		!children &&
		`
    border: none;

    &:hover {
      border: none;
    }
  `}

	${({ noBorder }) =>
		noBorder &&
		`
    border: none;

    &:hover {
      border: none;
    }
  `}
  
  ${({ place }) =>
		place == "bottom" &&
		`
    .__react_component_tooltip {
      &:after {
        border-left: ${tooltipShowBorder}!important;
        border-top: ${tooltipShowBorder}!important;
        border-right: none!important;
        border-bottom: none!important;
      }
    }
  `}
  
  ${({ place }) =>
		place == "right" &&
		`
    .__react_component_tooltip {
      max-width: 350px;
      &:after {
        border-left: ${tooltipShowBorder}!important;
        border-top: none!important;
        border-right: none!important;
        border-bottom: ${tooltipShowBorder}!important;
        bottom: 6px!important;
        margin-right: 5px!important;
        right: -6px!important;
        left: 0!important;
      }
    }
  `}
`

export const Tooltip: FunctionComponent<TooltipProps> = (props) => {
	const {
		className,
		classes,
		children,
		content,
		size,
		noIcon,
		noBorder,
		place,
		icon,
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
