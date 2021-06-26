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
      <Row basis={1/3}>
        <Loader fetching></Loader>
        <Col basis={1/2}></Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <DemoForm />
      <Row>
        <Col>
          <ButtonLine>
            <Button onClick={onOpenModalClick} disabled>
              Disabled Open modal
            </Button>
            <Button icon="warning" onClick={onOpenModalClick}>
              Open alert modal
            </Button>
            <Button link="https://google.com" icon="warning" target="_blank">
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

