import React from 'react'
import PropTypes from 'prop-types'
import Form from "Ui/form"
import Input from "Ui/input"
import {Field} from "Ui/field"

function DemoForm(props) {
  const handleChange = (e) => {
  }
  return (
    <Field label="Text input without redux" noRedux>
      <Input label="Text input without redux" name="first-input" type="text" onChange={handleChange} />
    </Field>
  )
}

DemoForm.propTypes = {

}

export default DemoForm

