import React, { Component } from 'react';
import DogsList from './dogsList/dogsList.js';
import Gallery from './gallery/gallery.js';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogs: [],
      images: []
    };

  }
  componentDidMount() {
    fetch('https://dog.ceo/api/breeds/list')
      .then((res) => {
        return res.json();
      })
      .then((dogs) => {
        this.setState({
          isShown:false,
          dogs: dogs.message,
          selectedDog: []
        });
        return fetch(`https://dog.ceo/api/breed/${dogs.message[0]}/images`)
      })
  }

  dogClicked = (breed) => {
    this.setState({
      isShown:true,
      images: [],
      selectedDog: breed
    });
    fetch(`https://dog.ceo/api/breed/${breed}/images`)
      .then((res) => {
        return res.json();
      })
      .then((images) => {
        this.setState({
          images: images.message
        });
      })
  }

  render() {
    return (
      <div className="content-container">
        <div className="row">
          <div className="col-3">
            <DogsList dogs={this.state.dogs} selectedDog={this.state.selectedDog} handleClick={this.dogClicked}/>
          </div>
          <div className="col-9">
            <Gallery isShown={this.state.isShown} images={this.state.images} />
          </div>        
        </div>
      </div>
      );
  }
}
export default App;
