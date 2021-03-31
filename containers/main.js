import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "next/router"
import {
	authenticatedSelector,
	overlayFetchingSelector,
  fetchingSelector,
	popupModal,
} from "App/ducks/main"
import { useEventListener } from "App/services/globalEvents"
import Loader from "App/ui/loader"
import ModalContainer from "Containers/modalContainer"

export function MainContainer(props) {
	const {
		fetching,
		overlayFetching,
		authenticated
	} = props
  //listen to popup modal from any component inside the main container via global events
	const popup = (prop) => {
		props.popupModal(prop.type, prop.isOpen, prop.options)
	}
	useEventListener("popupEvent", popup)
  //check that overlay list is not empty
	let needToShowOverlay = overlayFetching && overlayFetching.length > 0
	return (
		<div id="main-wrapper">
			<div className="main-container">
				{needToShowOverlay && <Loader overlay fetching={true} />}
				{!needToShowOverlay && props.children}
			</div>
			<ModalContainer />
			{!needToShowOverlay && <Loader mask className="main-loader" fetching={fetching} />}
		</div>
	)
}

MainContainer.propTypes = {
  /** user authenticated flag */
	authenticated: PropTypes.bool,
  /** when true show main loader */
	fetching: PropTypes.bool,
  /** when not empty show overlay loader */
	overlayFetching: PropTypes.array,
  /** dispatch action to open/close modal */
	popupModal: PropTypes.func,
}

MainContainer.defaultProps = {
	overlayFetching: [],
	showPlanPanel: false,
	forced: false,
}

export default withRouter(
	connect(
		(state) => ({
			authenticated: authenticatedSelector(state),
			fetching: fetchingSelector(state),
			overlayFetching: overlayFetchingSelector(state),
		}),
		{ popupModal }
	)(MainContainer)
)