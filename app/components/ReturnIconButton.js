import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router';

import ReturnIcon from '../images/return.png';

class ReturnIconButton extends Component{

  constructor(props){
    super(props);
  }

  render(){
    const { href } = this.props;
    return (
      <Link to={href}>
        <IconButton tooltip="返回">
          <img src={ReturnIcon} />
        </IconButton>
      </Link>
    );
  }
}

export default ReturnIconButton;