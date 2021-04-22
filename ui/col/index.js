import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import "./styles.scss"

function Col(props) {
    const { className, classes, children, noGrow } = props
    const newClasses = classNames(className, classes, "col", {
        grow: !noGrow
    })
    return <div className={newClasses}>
        {children}
    </div>
}

Col.propTypes = {
    /** html id for main button dom element */
    id: PropTypes.string,
    /** custom class list */
    classes: PropTypes.string,
    /** custom class list */
    className: PropTypes.string,
    /** content inside button wrapper */
    children: PropTypes.any,
    /** col will take all height but width will depends on content */
    noGrow: PropTypes.bool,
}

export default Col
