import React, { Component } from 'react';
import './../Card/Card.css';

class Card extends Component {
  render() {
    return <article { ...this.props }>{this.props.children}</article>
  }
}

export default Card;
