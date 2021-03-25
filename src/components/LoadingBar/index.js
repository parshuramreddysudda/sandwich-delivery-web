import React, { Component } from 'react';
import img from '../LoadingBar/giphy.webp';
import '../LoadingBar/index.css';

export default class componentName extends Component {
  render() {
    return (
      <>
        <div className="loader">
            <img src={img}/>
        </div>
      </>
    )
  }
}
