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
   * @return {string} Returns a string 'n [day|hour|min|second](s) ago'
   *                  indicating how much time has passed since.
   */
  timeAgo = (time) => {
    if ( ! time)
      return (<time dateTime="2018-05-12 12:00:00T">59m ago</time>);
    
    let suppliedTime = Date.parse(time);
    let currentTime = new Date();
    let timeDiff = (currentTime - suppliedTime) / 1000;
    
    const timeUnits = {
      day: 86000,
      hour: 3600,
      min: 60,
      second: 1
    };

    for (const [unit, secondsInUnit] of Object.entries(timeUnits)) {
      let timeDiffInUnits = timeDiff / secondsInUnit;
      if (timeDiffInUnits > 1) {
        timeDiffInUnits = Math.ceil(timeDiffInUnits);
        return `${timeDiffInUnits} ${unit}${timeDiffInUnits > 1? 's' : ''} ago`;
      }
    }
  };

  render() {
    return (
      <Card className="Card EventCard" aria-labelledby={`${this.props.cardID}__title`}>
        <Player aria-labelledby={`${this.props.cardID}__header`} {...this.props} />
          <section className="Card__content" tabIndex="0">
            <h1 id={`${this.props.cardID}__title`}>{ this.props.name }</h1>
            { this.props.description }
            <button className="Button Button--large Button--plus icon-add Card__Cta">Follow this event</button>
          </section>
          <footer className="Card__footer" role="contentinfo">
            <section className="Card__publication-info" aria-label="Event details">
              <ul className="FlatList FlatList--slash FlatList--spread" tabIndex="0">
                <li>Presented By <address aria-label="Event presenter">{ this.props.performer }</address></li>
                <li aria-label="Event time">{ this.timeAgo(this.props.startDate) }</li>
                <li aria-label="Context"><a title="Tag" rel="tag">{ this.props.publication.name }</a></li>
              </ul>
            </section>
            <hr />
            <section className="Card__social-sharing" aria-label="Social sharing">
              <ul className="FlatList FlatList--grid FlatList--buttons">
                <li><a href={window.location.href} className="icon-save" title="Save this event" role="button">Save</a></li>
                <li><a href="#comments" className="icon-comments" title="Number of comments" role="button">26</a></li>
                <li><a href="#share" className="icon-share" title="Share this event on social media" role="button">Share</a></li>
              </ul>
            </section>
          </footer>
      </Card>
    );
  }
}

export default EventCard;
