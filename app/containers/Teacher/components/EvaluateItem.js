import React, { Component } from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Divider from 'material-ui/Divider';

const RadioButtonStyle = {
  display: 'inline-block',
  width: '20%',
  fontSize: '0.75rem'
};
const IconStyle = {
  width: 20,
  height: 20
};

class EvaluateItem extends Component {
  render() {
    const { itemName, changeHandler, defaultValue } = this.props;
    return (
      <div style={{
        maxWidth: 500,
        margin: '10px auto',
        padding: '0 10px'
      }}>
        <div style={{
          fontSize: '1rem',
          margin: '5px 0',
          color: 'rgb(0, 188, 212)',
          textAlign:'center'
        }}>{itemName}</div>
        <RadioButtonGroup defaultValue={defaultValue} onChange={changeHandler} name={itemName} style={{
          margin: '10px 0'
        }} >
          <RadioButton
            value="0"
            label="优秀"
            style={RadioButtonStyle}
            iconStyle={IconStyle}
            />
          <RadioButton
            value="1"
            label="良好"
            style={RadioButtonStyle}
            iconStyle={IconStyle}
            />
          <RadioButton
            value="2"
            label="中等"
            style={RadioButtonStyle}
            iconStyle={IconStyle}
            />
          <RadioButton
            value="3"
            label="及格"
            style={RadioButtonStyle}
            iconStyle={IconStyle}
            />
          <RadioButton
            value="4"
            label="不及格"
            style={RadioButtonStyle}
            iconStyle={IconStyle}
            />
        </RadioButtonGroup>
        <Divider />
      </div>
    );
  }
}

export default EvaluateItem;