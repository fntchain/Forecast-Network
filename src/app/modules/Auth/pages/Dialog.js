import React from 'react'
import { Modal, Button } from 'react-bootstrap'
class Dialog extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)

    this.state = {
      show: false,
    }
  }
  componentDidMount() {
    this.props.handleShow(this.handleShow)
  }

  handleClose() {
    this.setState({ show: false })
    this.props.history.push({pathname:'/',state: 'register' })
  }

  handleShow() {
    this.setState({ show: true })
  }

  render() {
    return (
      <>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          centered
          backdrop={false}
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.children}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleClose}>
              I have remember
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default Dialog
