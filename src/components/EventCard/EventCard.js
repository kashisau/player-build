import React, { Component } from 'react';
import Card from './../Card/Card';
import Player from './../Player/Player';
import './EventCard.css';

class EventCard extends Component {
  render() {
    return (
      <Card className="Card EventCard">
        <Player />
        <section className="Card__content" role="main">
          <h1>How is it that we can identify someone to be the same person at one time, as she is at some other time?</h1>
          <p>That’s the question that John Locke attempts to answer in his theory of identity. For Locke, identity is predicated on psychological continuity, and this continuity is established by our ability to recall memories of actions and events to which we were present. The dichotomy of human being and person is a crucial distinction in Locke’s thesis: one can be the same human being over time, occupying the same body, but their personality is solely contingent on the mind and the integrity of its memory of events. Importantly, Locke does not assert that we must each have perfect recall to claim a persistent identity, but if we can be prompted somehow to recall memories of some previous time, then we can be said to be the same person as when those separate events took place (Law, 301–2).</p>
          <p>Locke’s theory of personal identity is motivated by a shift away from the study of essences, a pursuit that he argues has been arrested by a larger esoteric discussion. To wrest the conversation away from this philosophical impasse, Locke admonishes the essentialist tradition of meditation and pure reasoning, appealing to an empirical understanding of self —  explaining what he observes in the forensic application of identity — that is, to do with the punishment and reward of moral agents (Law, 301–2).</p>
          <button className="Button Button--large Button--plus icon-add Card__Cta">Follow this event</button>
        </section>
        <footer className="Card__footer" role="contentinfo">
          <aside className="Card__publication-info" aria-label="Event details">
            <ul className="FlatList FlatList--slash FlatList--spread">
              <li>Presented By <address aria-label="Event presenter">Oscar Verbinius</address></li>
              <li aria-label="Event time"><time dateTime="2018-05-12 12:00:00T">59m ago</time></li>
              <li aria-label="Context"><a title="Tag" rel="tag">Tag</a></li>
            </ul>
          </aside>
          <hr />
          <aside className="Card__social-sharing" aria-label="Social sharing">
            <ul className="FlatList FlatList--grid FlatList--buttons">
              <li><a href={window.location.href} className="icon-save" title="Save this event" role="button">Save</a></li>
              <li><a href="#comments" className="icon-comments" title="Number of comments" role="button">26</a></li>
              <li><a href="#share" className="icon-share" title="Share this event on social media" role="button">Share</a></li>
            </ul>
          </aside>
        </footer>
      </Card>
    );
  }
}

export default EventCard;
