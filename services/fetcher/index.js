import axios from "axios"
import React, { Component } from "react"
import ReactDOM from "react-dom"
import API from "App/assets/consts/API"
import { popup } from "App/services/globalEvents"

class FetcherService {
	get(url, params) {
		for (const k in params) {
			if (params[k] !== undefined && params.hasOwnProperty(k)) {
				url = this.addGetParam(url, k, params[k])
			}
		}
		const config = {
			headers: {},
		}
		config.headers = this.addApiKey(config.headers)
		return axios({ method: "get", url, ...config })
	}

	post(url, params) {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		}
		config.headers = this.addApiKey(config.headers)
		return axios({
			method: "post",
			url,
			data: params ? JSON.stringify(params) : null,
			...config,
		})
	}

	put(url, params) {
		const body = `data=${encodeURIComponent(JSON.stringify(params))}`
		const config = {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
			},
		}
		config.headers = this.addApiKey(config.headers)
		return axios({ method: "put", url, data: body, ...config })
	}

	delete(url) {
		const config = {
			headers: {},
		}
		config.headers = this.addApiKey(config.headers)
		return axios({ method: "delete", url, ...config })
	}

	addGetParam(url, name, value) {
		if (value !== undefined && value !== null) {
			if (value instanceof Array) {
				value = JSON.stringify(value)
			}
			if (value instanceof Date) {
				value = `${n(value.getDate()).format("00")}.${n(
					value.getMonth() + 1
				).format("00")}.${value.getFullYear()}`
			}
			let parts = url.split("?")
			let params = parts[1] || ""
			params += (!!params ? "&" : "") + name + "=" + value
			return parts[0] + "?" + params
		}
		return url
	}

	getExternal(url, params) {
		const newParams = {
			type: "GET",
			url: url,
		}
		let extUrl = API.externalUrl
		for (const k in newParams) {
			if (newParams[k] !== undefined && newParams.hasOwnProperty(k)) {
				extUrl = this.addGetParam(extUrl, k, newParams[k])
			}
		}
		const body = `data=${encodeURIComponent(JSON.stringify(params))}`
		const config = {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
			},
		}
		return axios.post(extUrl, body, config)
	}

	postExternal(url, params, formParams) {
		const newParams = {
			type: "POST",
			url: url,
		}
		params = {
			...params,
			formParams: formParams,
		}
		let extUrl = API.externalUrl
		for (const k in newParams) {
			if (newParams[k] !== undefined && newParams.hasOwnProperty(k)) {
				extUrl = this.addGetParam(extUrl, k, newParams[k])
			}
		}
		const body = `data=${encodeURIComponent(JSON.stringify(params))}`
		const config = {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
			},
		}
		return axios.post(extUrl, body, config)
	}

	addApiKey(headers) {
		if (typeof localStorage !== "undefined"){
			const apiStorage = localStorage.getItem(process.env.NEXT_PUBLIC_APP_NAME+"_stored_api_key")
			if (apiStorage) {
				const data = JSON.parse(apiStorage)
				const apiKey = data.apiKey
				headers.Authorization = "Bearer " + apiKey
			}
		}
		return headers
	}

	addApiKeyToUrl(url) {
		if (process.env.NEXT_PUBLIC_NODE_ENV === "dev") {
			if (typeof localStorage !== "undefined"){
			const apiStorage = localStorage.getItem(process.env.NEXT_PUBLIC_APP_NAME+"_stored_api_key")
				if (apiStorage) {
					const data = JSON.parse(apiStorage)
					const apiKey = data.apiKey
					return url + "?api_token=" + apiKey
				}
			}
		}
		return url
	}

	getProperUrl(url, options) {
		let properUrl = process.env.NEXT_PUBLIC_BASE_API_PATH + url
		if (options instanceof Object) {
			let regexp,
				prevUrl = properUrl
			for (var k in options) {
				regexp = new RegExp(":" + k, "gi")
				properUrl = properUrl.replace(regexp, options[k])
				if (prevUrl != properUrl) {
					prevUrl = properUrl
					delete options[k]
				}
			}
		}
		return this.addApiKeyToUrl(properUrl)
	}

	readUrlFromApiConsts(api, options) {
		let url = api
		if (api instanceof Object) {
			url = this.getProperUrl(api.url, options)
		} else {
			url = this.getProperUrl(url, options)
		}
		return url
	}

	readTypeFromApiConsts(api) {
		let type = "GET"
		if (api instanceof Object) {
			type = api.type
		}
		return type
	}

	do(baseName, subName, params) {
		let url = ""
		let type = "GET"
		if (subName && API[baseName][subName]) {
			url = this.readUrlFromApiConsts(API[baseName][subName], params)
			type = this.readTypeFromApiConsts(API[baseName][subName])
		} else {
			url = this.readUrlFromApiConsts(API[baseName], params)
			type = this.readTypeFromApiConsts(API[baseName])
		}
		switch (type) {
			case "POST":
				return this.post(url, params)
				break
			case "PUT":
				return this.put(url, params)
				break
			case "DELETE":
				return this.delete(url, params)
				break
			case "GET":
			default:
				return this.get(url, params)
		}
	}

	doCatch(baseName, subName, params) {
		return this.do(baseName, subName, params)
			.then(this.onSuccess)
			.catch(this.onFailure)
	}

	baseDoCatch(baseName, params) {
		return this.do(baseName, null, params)
			.then(this.onSuccess)
			.catch(this.onFailure)
	}

	onSuccess(response) {
		let { data } = response
		if (data instanceof Object && data.status === "ok") {
			return data.response
		}

		return Promise.reject(data)
	}

	onFailure(error) {
		if (!axios.isCancel(error)) {
			const status = (error.response && error.response.status) || null
			const errorData = error.response.data
			const errorObject = {
				status,
				...errorData,
				requestId: error.response.headers["x-request-id"] || null,
			}
			switch (status) {
				case 400:
					//validation error
					errorObject.fieldsError = errorObject.details
					return Promise.reject(errorObject)
				case 422:
					errorObject.message = errorData.details
					//validation pass but logic error
					return Promise.reject(errorObject)
				case 404:
					//not found
					errorObject.message = "This method can not be found"
					errorObject.type = "not-found"
					popup("apiError", errorObject)
					return Promise.reject(errorObject)
				case 403:
					//forbidden
					errorObject.message = "You do not have access to this action"
					errorObject.type = "forbidden"
					popup("apiError", errorObject)
					return Promise.reject(errorObject)
				case 401:
					//wrong token
					errorObject.message = "Your session is expired. Please sign in again"
					errorObject.type = "token"
					popup("apiError", errorObject)
					return Promise.reject(errorObject)
				default:
					popup("apiError", errorObject)
					return Promise.reject(errorObject)
			}
		}
	}
}

export default new FetcherService()
