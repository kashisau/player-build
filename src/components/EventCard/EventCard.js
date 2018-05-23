import React, { Component } from 'react';
import Card from './../Card/Card';
import Player from './../Player/Player';
import ReactPlaceholder from 'react-placeholder';
import renderHTML from 'react-render-html';
import './EventCard.css';
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

class EventCard extends Component {

  constructor(props) {
    super(props);
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
    let publication = await publicationJson.json().catch(function() { throw new Error("Could not parse JSON for event data.")});
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

  /**
   * Takes a ISO-8601 timestamp and (as a string) and returns the number
   * of days/hours/minutes/seconds ago the supplied time elapsed compared
   * to the current time.
   * @param {string} time An ISO8601 timestamp (with timezone) to derive
   *                      the chronological difference from.
   * @return {JSX} Returns a <time> HTMLElement with the datetime attribute
   *               set and reading 'n [day|hour|min|second](s) ago'
   */
  timeAgo = (time) => {
    if ( ! time)
      return (<time dateTime="TBA">--</time>);
    
    let suppliedTime = Date.parse(time);
    let currentTime = new Date();
    let timeDiff = (currentTime - suppliedTime) / 1000;
    
    const timeUnits = {
      day: 86000,
      hour: 3600,
      min: 60,
      second: 1
    };

    for (const unit in timeUnits) {
      if ( ! timeUnits.hasOwnProperty(unit)) continue;
      let secondsInUnit = timeUnits[unit];
      let timeDiffInUnits = timeDiff / secondsInUnit;
      if (timeDiffInUnits > 1) {
        timeDiffInUnits = Math.ceil(timeDiffInUnits);
        return <time dateTime={time}>{timeDiffInUnits} {unit}{timeDiffInUnits > 1? 's' : ''} ago</time>;
      }
    }
  };

  render() {
    return (
      <Card className="Card EventCard" aria-labelledby={`${this.state.cardID}__title`}>
        <Player aria-labelledby={`${this.state.cardID}__header`} name={this.state.name} image={this.state.image} />
        <section className="Card__content" tabIndex="0">
          <h1 id={`${this.props.cardID}__title`}>{ this.state.name }</h1>
          { this.state.description }
        </section>
        <section className="Card__actions" aria-label="event actions">
          <button className="Button Button--large Button--plus icon-add Card__Cta" onClick={() => this.state.subscribe(this.state["@id"])}>Follow this event</button>
        </section>
        <footer className="Card__footer" role="contentinfo">
          <section className="Card__publication-info" aria-label="Event details">
            <ul className="FlatList FlatList--slash FlatList--spread">
              <li>Presented By <address aria-label="Event presenter">{ this.state.performer }</address></li>
              <li aria-label="Event time">{ this.timeAgo(this.state.startDate) }</li>
              <li aria-label="Context"><a title="Tag" rel="tag">{ this.state.publication.name }</a></li>
            </ul>
          </section>
          <hr />
          <section className="Card__social-sharing" aria-label="Social sharing">
            <ul className="FlatList FlatList--grid FlatList--buttons">
              <li><a className="icon-save" title="Save this event" role="button">Save</a></li>
              <li><a className="icon-comments" title="Number of comments" role="button" aria-label="comments">26</a></li>
              <li><a className="icon-share" title="Share this event on social media" role="button">Share</a></li>
            </ul>
          </section>
        </footer>
      </Card>
    );
  }
}

export default EventCard;
