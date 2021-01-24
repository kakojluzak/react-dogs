import React, { Component } from 'react';
import './gallery.css';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class Gallery extends Component {
  constructor(props, context) {
    super(props, context);
    
    this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.state = {
      isShown: this.props.isShown,
      images: this.props.images,
      randomNumber: 0
		};
	}

	handleClose = () =>{
		this.setState({ isShown: false });
	}

	handleShow = () =>{
		this.setState({ isShown: true });
	}

  handleReload = () => {
    const choosenNumber = Math.floor(Math.random() * this.props.images.length);
		this.setState({ isShown: true, randomNumber: choosenNumber});
  }

  checkNumbers = () => { 
    return this.state.randomNumber? this.state.randomNumber:Math.floor(Math.random() * this.props.images.length);
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.images !== prevProps.images && this.props.images) {
      this.setState({ isShown: this.props.isShown });
    }
  }
  
  
  render() {
    let image = [];
    const random = this.checkNumbers(this.props.images.length);
    image.push(
            <img key={random} className="card-img-top" src={this.props.images[random]} alt="Loading"></img>
    )
    return ( 
      <div>
          <Modal show={this.state.isShown} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Who let the dogs out</Modal.Title>
            </Modal.Header>
            <Modal.Body>{image}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.handleReload}>
                Reload
              </Button>
            </Modal.Footer>
				</Modal>
      </div>
    )
  }
}

export default Gallery;