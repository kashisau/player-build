import React, { Component } from 'react';
import EventCard from './components/EventCard/EventCard';
import ReactPlaceholder from 'react-placeholder';
import renderHTML from 'react-render-html';
import "react-placeholder/lib/reactPlaceholder.css";

const EVENT_DATA_URL = '/data/events.json';
/** Stores a "loading" state for re-use whilst retreiving data. */
const LOADING_STATE = { 
  readyState: 0,
  publication: {
    name: '--'
  },
  name: <ReactPlaceholder rows={1} ready={false}>...</ReactPlaceholder>,
  description: <ReactPlaceholder rows={3} ready={!!0}>...</ReactPlaceholder>,
  image: "",
  startDate: "",
  duration: "",
  performer: ""
};

class App extends Component {

  constructor(props) {
    super(props);
    // Initialise our state.
    this.state = LOADING_STATE;
  }

  /**
   * Request data from our JSON endpoint once the component has mounted.
   */
  async componentDidMount() {
    this.updateFromSource();
  }

  /**
   * Performs a Fetch for the JSON endpoint to read the event data.
   */
  updateFromSource = async () => {
    this.setState(LOADING_STATE);
    this.setState({readyState: 2});
    let publicationJson = await fetch(EVENT_DATA_URL);
    this.setState({readyState: 3});
    let publication = JSON.parse(await publicationJson.text());
    this.setState({ publication: publication });
    let events = publication.releasedEvent;
    let randomEventIndex = Math.floor(Math.random() * events.length);
    this.displayEvent(events[randomEventIndex], 0);
  }

  displayEvent = (event, cardNumber) => {
    event.description = renderHTML(`<p>${event.description}</p>`);
    this.setState({readyState: 4, ...event});
    setTimeout(this.updateFromSource, 10000);
  }

  render = () => {
    return <EventCard cardID="eventCard0" {...this.state}></EventCard>
  }
}

export default App;