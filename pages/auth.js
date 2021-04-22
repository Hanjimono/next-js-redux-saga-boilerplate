import React from 'react'
import PropTypes from 'prop-types'
import Auth from "Components/auth"

function AuthPage(props) {
  return (
    <div className="auth-view-wrapper">
      <Auth />
    </div>
  )
}

AuthPage.propTypes = {

}

export default AuthPage

