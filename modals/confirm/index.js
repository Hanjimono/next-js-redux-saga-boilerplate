import React from "react"
import PropTypes from "prop-types"
import ButtonLine from "App/ui/buttonLine"
import Button from "App/ui/button"
import "./styles.scss"

function ConfirmModal(props) {
	const { onConfirm, onCancel, onCloseModal, text, confirmText, cancelText } = props
	const handleConfirm = () => {
		if (onConfirm) {
			onConfirm()
		}
		onCloseModal()
	}
	const handleCancel = () => {
		if (onCancel) {
			onCancel()
		}
		onCloseModal()
	}
	return (
		<div className="confirm-modal">
			<div className="confirm-text">{text}</div>
			<ButtonLine right>
				<Button onClick={handleCancel} noBg>
					{cancelText}
				</Button>
				<Button onClick={handleConfirm} info>
					{confirmText}
				</Button>
			</ButtonLine>
		</div>
	)
}

ConfirmModal.propTypes = {
	onConfirm: PropTypes.func,
	onCancel: PropTypes.func,
	onCloseModal: PropTypes.func,
	text: PropTypes.string,
	confirmText: PropTypes.string,
	cancelText: PropTypes.string,
}

ConfirmModal.defaultProps = {
	confirmText: "OK",
	cancelText: "Cancel",
}

export default ConfirmModal
