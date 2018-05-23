import React, { Component } from 'react';
import EventCard from './components/EventCard/EventCard';
import ReactPlaceholder from 'react-placeholder';
import renderHTML from 'react-render-html';
import "react-placeholder/lib/reactPlaceholder.css";

class App extends Component {

  render = () => {
    return <EventCard cardID="eventCard0"></EventCard>
  }
}

export default App;
