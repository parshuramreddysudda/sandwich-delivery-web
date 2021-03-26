import React from 'react';
import img from '../LoadingBar/giphy.webp';
import '../LoadingBar/index.css';

const LoadingBar = () => {

    return (
      <div className="loader">
        <img src={img}/>
      </div>
    );
}
 
export default LoadingBar;