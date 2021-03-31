import React from "react"
import PropTypes from "prop-types"
import ButtonLine from "App/ui/buttonLine"
import Button from "App/ui/button"
import "./styles.scss"

function AlertModal(props) {
	const { onConfirm, onCloseModal, text, confirmText } = props
	const handleConfirm = () => {
		if (onConfirm) {
			onConfirm()
		}
		onCloseModal()
	}
	return (
		<div className="alert-modal">
			<div className="alert-text">{text}</div>
			<ButtonLine right>
				<Button info onClick={handleConfirm}>
					{confirmText}
				</Button>
			</ButtonLine>
		</div>
	)
}

AlertModal.propTypes = {
	onConfirm: PropTypes.func,
	onCloseModal: PropTypes.func,
	text: PropTypes.oneOfType([
		PropTypes.arrayOf(
			PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func])
		),
		PropTypes.element,
		PropTypes.string,
		PropTypes.func,
	]),
	confirmText: PropTypes.string,
}

AlertModal.defaultProps = {
	confirmText: "OK",
}

export default AlertModal
