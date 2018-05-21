import React, { Component } from 'react';
import Card from './../Card/Card';
import Player from './../Player/Player';
import './EventCard.css';

class EventCard extends Component {

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
      <Card className="Card EventCard" aria-labelledby={`${this.props.cardID}__title`}>
        <Player aria-labelledby={`${this.props.cardID}__header`} name={this.props.name} image={this.props.image} />
        <section className="Card__content" tabIndex="0">
          <h1 id={`${this.props.cardID}__title`}>{ this.props.name }</h1>
          { this.props.description }
        </section>
        <section className="Card__actions" aria-label="event actions">
          <button className="Button Button--large Button--plus icon-add Card__Cta" onClick={() => this.props.subscribe(this.props["@id"])}>Follow this event</button>
        </section>
        <footer className="Card__footer" role="contentinfo">
          <section className="Card__publication-info" aria-label="Event details">
            <ul className="FlatList FlatList--slash FlatList--spread">
              <li>Presented By <address aria-label="Event presenter">{ this.props.performer }</address></li>
              <li aria-label="Event time">{ this.timeAgo(this.props.startDate) }</li>
              <li aria-label="Context"><a title="Tag" rel="tag">{ this.props.publication.name }</a></li>
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
