import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import "./styles.scss"

function Container(props) {
    const { className, classes, total, children, flex, centered, fixed, maxHeight } = props
    const newClasses = classNames(className, classes, "container", {
        total,
        flex,
        centered,
        fixed,
        "maximum-height": maxHeight
    })
    return <div className={newClasses}>{children}</div>
}

Container.propTypes = {
    /** html id for main button dom element */
    id: PropTypes.string,
    /** custom class list */
    classes: PropTypes.string,
    /** custom class list */
    className: PropTypes.string,
    /** content inside button wrapper */
    children: PropTypes.any,
    /** will take all space on the screen absolutely */
    total: PropTypes.bool,
    /** add display flex and flex-direction column to container */
    flex: PropTypes.bool,
    /** add left anr right margin auto to container */
    centered: PropTypes.bool,
    /** add fixed max-width defined in global variables */
    fixed: PropTypes.bool,
    /** take all available height */
    maxHeight: PropTypes.bool,
}

export default Container
