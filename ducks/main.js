import { all, put, select, take, call, actionChannel } from "redux-saga/effects"
import { buffers } from "redux-saga"
import { Record } from "immutable"
import Router from 'next/router'
import { createSelector } from "reselect"
import _ from "lodash"
import Fetcher from "Services/fetcher"
import API from "Consts/API"
import moment from "moment"

export const moduleName = "main"
const prefix = `${moduleName}`
export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_IN_FAILED = `${prefix}/SIGN_IN_FAILED`
export const SET_OPEN_CLOSE_MODAL_REQUEST = `${prefix}/SET_OPEN_CLOSE_MODAL_REQUEST`
export const SET_OPEN_CLOSE_MODAL_SUCCESS = `${prefix}/SET_OPEN_CLOSE_MODAL_SUCCESS`
export const SIGN_OUT_REQUEST = `${prefix}/SIGN_OUT_REQUEST`
export const SIGN_OUT_SUCCESS = `${prefix}/SIGN_OUT_SUCCESS`
export const SET_MAIN_LOADING = `${prefix}/SET_MAIN_LOADING`
export const SET_OVERLAY_LOADING_REQUEST = `${prefix}/SET_OVERLAY_LOADING_REQUEST`
export const SET_OVERLAY_LOADING_SUCCESS = `${prefix}/SET_OVERLAY_LOADING_SUCCESS`

/**
 * Reducer
 **/

const DEFAULT_STATE = {
	fetching: false,
	overlayFetching: [],
	authenticated: false,
	modalList: {},
}

export const ReducerRecord = Record({
	...DEFAULT_STATE
})

export default function reducer(state = new ReducerRecord(), action) {
	const { type, payload } = action
	switch (type) {
		case SET_OVERLAY_LOADING_SUCCESS:
			return state.set("overlayFetching", payload)
		case SET_MAIN_LOADING:
			return state
			.set("fetching", payload)
		case SIGN_IN_REQUEST:
			return state
			.set("fetching", true)
		case SIGN_IN_SUCCESS:
			return state
				.set("authenticated", true)
				.set("fetching", false)
		case SIGN_IN_FAILED:
			return state
				.set("authenticated", false)
				.set("fetching", false)
		case SIGN_OUT_REQUEST:
			return state
				.set("authenticated", false)
				.set("fetching", true)
		case SIGN_OUT_SUCCESS:
			return new ReducerRecord()
		case SET_OPEN_CLOSE_MODAL_SUCCESS:
			return state.set("modalList", payload)
		default:
			return state
	}
}

/**
 * Selectors
 **/
export const formSelector = state => state["form"]
export const moduleSelector = state => state[moduleName]
export const userSelector = state => state[moduleName].user
export const anketAcceptFormSelector = createSelector(
	formSelector,
	(state) => state.acceptForm
)
export const modalListSelector = createSelector(
	moduleSelector,
	(state) => state.modalList
)

export const authenticatedSelector = createSelector(
	moduleSelector,
	(state) => state.authenticated
)

/**
 * Action Creators
 **/

export function signIn(code) {
	return {
		type: SIGN_IN_REQUEST,
		payload: code,
	}
}

export function popupModal(type, open, options) {
	return {
		type: SET_OPEN_CLOSE_MODAL_REQUEST,
		payload: { type: type, isOpen: open, options: options },
	}
}

export function signOut(code) {
	return {
		type: SIGN_OUT_REQUEST,
		payload: code,
	}
}


/**
 * Sagas
 **/

export const signOutSaga = function*() {
	while (true) {		
		yield take(SIGN_OUT_REQUEST)
		try {
		} catch (e) {
			
		}
		yield put({
			type: SIGN_OUT_SUCCESS
		})
		yield Router.push("/auth")
	}
}

export const popupModalSaga = function* () {
	const requestChan = yield actionChannel(
		SET_OPEN_CLOSE_MODAL_REQUEST,
		buffers.expanding()
	)
	while (true) {
		const { payload } = yield take(requestChan)
		const { type, isOpen } = payload
		const currentModals = _.cloneDeep(yield select(modalListSelector))
		if (isOpen) {
			currentModals[type] = {
				isOpen: true,
				options: payload.options,
			}
		} else {
			delete currentModals[type]
		}
		yield put({
			type: SET_OPEN_CLOSE_MODAL_SUCCESS,
			payload: currentModals,
		})
	}
}

export const signInSaga = function*() {
	while (true) {
		const { payload } = yield take(SIGN_IN_REQUEST)
		try {
			yield put({
				type: SIGN_IN_SUCCESS,
			})
			let page = "/"
			yield Router.push(page)
		} catch (e) {
			yield put({
				type: SIGN_IN_FAILED
			})
		}
	}
}

export const saga = function* () {
	yield all([signInSaga(), popupModalSaga(), signOutSaga()])
}

