import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';

import LoadingIcon from '../images/loading.png';

class LoadingButton extends Component{
  render(){
    return (
      <IconButton>
        <img className="circle" src={LoadingIcon} />
      </IconButton>
    );
  }
}

export default LoadingButton;