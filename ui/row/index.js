import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import "./styles.scss"

function Row(props) {
    const { className, classes, children, noGrow } = props
    const newClasses = classNames(className, classes, "row", {
        grow: !noGrow,
    })
    return <div className={newClasses}>{children}</div>
}

Row.propTypes = {
    /** html id for main button dom element */
    id: PropTypes.string,
    /** custom class list */
    classes: PropTypes.string,
    /** custom class list */
    className: PropTypes.string,
    /** content inside button wrapper */
    children: PropTypes.any,
    /** row will take all width but height will depend on content */
    noGrow: PropTypes.bool,
}

export default Row
