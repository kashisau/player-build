import React, { Component } from 'react';
import EventCard from './components/EventCard/EventCard';
import ReactPlaceholder from 'react-placeholder';
import renderHTML from 'react-render-html';
import "react-placeholder/lib/reactPlaceholder.css";

/** Interval between refreshes (in milliseconds) */
const REFRESH_CARD_INTERVAL = 10000;

/** Endpoint to hit for JSON data. */
const EVENT_DATA_URL = '/data/events.json';

/** Endpoint to hit for JSON data. */
const EVENT_SUBSCRIPTION_URL = '/subscriptions';

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

  /**
   * Submits a POST request to initiate a subscription to a specified
   * Event.
   * 
   * @param {string} eventID  The ID of the event to supply to the
   *                          server.
   */
  subscribe = async (eventID) => {
    try {
      const subscribeRequest = await fetch(EVENT_SUBSCRIPTION_URL, {
        body: JSON.stringify({ eventID: eventID }),
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "content-type": "application/json"
        },
        method: "POST",
        mode: "cors"
      });
      let success = JSON.parse(subscribeRequest.text());
      if (success) this.setState({ subscription: true });
    } catch (e) {
      console.warn(`The request to ${EVENT_SUBSCRIPTION_URL} could not be made.`);
    }
  }

  displayEvent = (event, cardNumber) => {
    event.description = renderHTML(`<p>${event.description}</p>`);
    this.setState({readyState: 4, ...event});
    setTimeout(this.updateFromSource, REFRESH_CARD_INTERVAL);
  }

  render = () => {
    return <EventCard cardID="eventCard0" {...this.state} subscribe={this.subscribe}></EventCard>
  }
}

export default App;