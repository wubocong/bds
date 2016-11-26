import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router';

import HomeIcon from '../images/home.png';

class HomeIconButton extends Component{

  constructor(props){
    super(props);
  }

  render(){
    const { href } = this.props;
    return (
      <Link to={href}>
        <IconButton tooltip="首页">
          <img src={HomeIcon} />
        </IconButton>
      </Link>
    );
  }
}

export default HomeIconButton;