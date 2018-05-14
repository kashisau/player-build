import React, { Component } from 'react';
import Card from './../Card/Card';
import Player from './../Player/Player';
import './EventCard.css';

class EventCard extends Component {
  render() {
    return (
      <Card className="Card EventCard">
        <Player />
        <div className="Card__content">
          <h2>Heading goes here.</h2>
          <p>Description goes here.</p>
          <button className="Button"></button>
          <footer className="Card__footer Card__footer--sharing">
            <aside>
              <ul>
                <li><a href={window.location.href} title="Save this event">Save</a></li>
                <li><a href="#comments" title="Read comments for this event">xx comments</a></li>
                <li><a href="#share" title="Share this event on social media">Share</a></li>
              </ul>
            </aside>
          </footer>
        </div>
      </Card>
    );
  }
}

export default EventCard;
