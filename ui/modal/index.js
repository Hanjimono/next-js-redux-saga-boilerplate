import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import classNames from "classnames"
import "./styles.scss"
import Icon from "App/ui/icon"

function Modal(props) {
	const {
		className,
		classes,
		children,
		noOverlay,
		subModal,
		isOpen,
		onCloseModal,
		title,
		...rest
	} = props
	const [el, setEl] = useState(null)
	useEffect(() => {
		const tempEl = document.createElement("div")
		setEl(tempEl)
		const modalRoot = document.getElementById("modal-root")
		const subModalRoot = document.getElementById("sub-modal-root")
		if (subModal) {
			subModalRoot.appendChild(tempEl)
		} else {
			modalRoot.appendChild(tempEl)
		}
		return () => {
			if (el) {
				if (subModal) {
					subModalRoot.removeChild(el)
				} else {
					modalRoot.removeChild(el)
				}
			}
		}
	}, [])
	const newClasses = classNames(className, classes, "modal", {
		"no-overlay": noOverlay,
	})
	const handleStopPropagation = (e) => {
		e.stopPropagation()
	}
	const modalChildren = isOpen ? (
		<div
			onClick={noOverlay ? () => false : () => onCloseModal()}
			className={newClasses}
		>
			<div onClick={(e) => handleStopPropagation(e)} className="modal-border">
				<div className="modal-body-container">
					<div className="modal-header">
						<div className="modal-title">
							<h3>{title}</h3>
						</div>
						<div
							className="modal-header-buttons"
							onClick={() => onCloseModal()}
						>
							<Icon name="close" size={26} />
						</div>
					</div>
					<div className="modal-child-wrapper">
						{React.cloneElement(children, { onCloseModal: onCloseModal, rest })}
					</div>
				</div>
			</div>
		</div>
	) : null

	if (el) return ReactDOM.createPortal(modalChildren, el)
	return null
}

Modal.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(
			PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func])
		),
		PropTypes.element,
		PropTypes.string,
		PropTypes.func,
	]),
	noOverlay: PropTypes.bool,
	subModal: PropTypes.bool,
	isOpen: PropTypes.bool,
	onCloseModal: PropTypes.func,
	title: PropTypes.string,
}

Modal.defaultProps = {}

export default Modal
