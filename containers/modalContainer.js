import React from "react"
import { withRouter } from "next/router"
import { connect } from "react-redux"
import { modalListSelector, popupModal } from "App/ducks/main"
import PropTypes from "prop-types"
import classNames from "classnames"
import Modal from "App/ui/modal"

import AlertModal from "../modals/alert"
import ConfirmModal from "../modals/confirm"

const MODALS_LIST_MAP = {
	alert: AlertModal,
	confirm: ConfirmModal,
}

function ModalContainer(props) {
	const {
		className,
		classes,
		modalList,
		location,
		popupModal,
	} = props
	const newClasses = classNames(className, classes, "modal-container")
	const path = location && location.pathname
	const handleCloseModal = (type, onClose) => {
		if (onClose) onClose()
		if (type) {
			popupModal(type, false)
		}
	}
	return (
		<div className={newClasses}>
			{Object.keys(modalList).map((key, index) => {
				let options = modalList[key].options || {}
				const notShowPath = options.notShowPath || ""
				if (modalList[key].isOpen && notShowPath.indexOf(path) === -1)
					return (
						<Modal
							key={key}
							className={key}
							subModal={options.subModal}
							modalConfirm={options.modalConfirm}
							modalDiscount={options.modalDiscount}
							noExit={options.noExit}
							title={options.title}
							intoClass={options.intoClass}
							isOpen={modalList[key].isOpen}
							onCloseModal={() => handleCloseModal(key, options.onClose)}
						>
							{React.createElement(MODALS_LIST_MAP[key], {
								hideModal: handleCloseModal,
								type: key,
								...options,
							})}
						</Modal>
					)
			})}
		</div>
	)
}

ModalContainer.propTypes = {
  /** custom class list */
	className: PropTypes.string,
  /** custom class list */
	classes: PropTypes.string,
  /** list of active modals */
	modalList: PropTypes.shape({
		type: PropTypes.string,
		isOpen: PropTypes.bool,
		options: PropTypes.shape({
			subModal: PropTypes.bool,
			modalConfirm: PropTypes.bool,
			modalDiscount: PropTypes.bool,
			title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
			onClose: PropTypes.func,
			startWindow: PropTypes.bool,
			notShowPath: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
			player: PropTypes.string,
		}),
	}).isRequired,
  /** function for dispatch open or close modal action */
	popupModal: PropTypes.func.isRequired,
}

ModalContainer.defaultProps = {}

export default withRouter(
	connect(
		(state) => ({
			modalList: modalListSelector(state),
		}),
		{ popupModal }
	)(ModalContainer)
)

export const PopupContext = React.createContext(popupModal)
