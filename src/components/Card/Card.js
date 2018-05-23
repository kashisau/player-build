import React, { Component } from 'react';
import './../Card/Card.css';

/**
 * This abstract Card component is used to isolate discrete Cards in an an app
 * that arranges a series of Cards. This is used to manage basic Card styling
 * as well as error handling.
 **/
class Card extends Component {

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.error(error);
  }

  render() {
    if (this.state.hasError) return <article role="main"><h1>Error</h1></article>
    return <article { ...this.props } role="main">{this.props.children}</article>
  }
}

export default Card;
