import React, { Component } from 'react';
import './../Card/Card.css';

class Card extends Component {
  render() {
    return <article { ...this.props } role="main">{this.props.children}</article>
  }
}

export default Card;
