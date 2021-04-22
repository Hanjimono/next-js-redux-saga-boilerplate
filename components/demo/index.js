import React from 'react'
import PropTypes from 'prop-types'
import DemoForm from "./form"
import Container from "Ui/container"
import Row from "Ui/row"
import Col from "Ui/col"
import Button from 'Ui/button'
import ButtonLine from "Ui/buttonLine"
import Loader from "Ui/loader"
import {popup} from "Services/globalEvents"

function Demo(props) {
  const onOpenModalClick = () => popup("alert", {title: "Alert", text: "This is an alert modal"})
  return (
    <Container flex maxHeight>
      <Row>
        <Col></Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <DemoForm />
      <Row noGrow>
        <Col>
          <ButtonLine>
            <Button onClick={onOpenModalClick} disabled>
              Disabled Open modal
            </Button>
            <Button icon="warning" onClick={onOpenModalClick}>
              Open alert modal
            </Button>
          </ButtonLine>
        </Col>
      </Row>
    </Container>
  )
}

Demo.propTypes = {

}

export default Demo

