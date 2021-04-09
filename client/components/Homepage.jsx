import React from 'react';
import RaceJumbotron from './Events/RaceJumbotron';
import EventsCarousel from './Events/EventsCarousel';
import AddEventForm from './Events/AddEventForm';
import SocialFeed from './social/SocialFeed';
import data from '../resources/dummydata';
import feedData from '../resources/dummyFeedData';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: data,
      feedData: feedData.posts,
      isModalOpen: false,
    };

    this.onModalOpen = this.onModalOpen.bind(this);
  }
//click handlingfunctions for AddEventForm. These will get moved!

  handleSubmitEvent() {
    this.setState({addEvent: false});
  }


  onModalOpen() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }


  render() {
    const { eventData, feedData } = this.state;
    return (
      <>
        <RaceJumbotron races={eventData.events.filter((event) => event.event_type === 'race')} />

        <div>
          <button style={{ display: "inline", width: "300px" }} onClick={this.onModalOpen}>NEW EVENT FORM</button>
        </div>
        <div>MAP GOING HERE MAYBE

        </div>
        <div className="homepage-body">
          <div className="events">
          <div className="mytextdiv">
            <div className="mytexttitle">
              Daily Runs
            </div>&nbsp;
            <div className="divider"></div>
          </div>
          {/* <h4 classNameName="events-header">Daily Runs</h4> */}
            <EventsCarousel events={eventData.events.filter((event) => event.event_type === 'daily_run')} />
            <div className="mytextdiv">
              <div className="mytexttitle">
              Announcements and Other Events
              </div>&nbsp;
              <div className="divider"></div>
            </div>
            {/* <h4 className="events-header">Announcements and Other Events</h4> */}
            <EventsCarousel events={eventData.events.filter((event) => event.event_type === 'other')} />
            {this.state.isModalOpen ? (<AddEventForm onModalOpen={this.onModalOpen} />) : null}
          </div>
          <div className="homepage-social-feed">
          <div className="mytextdiv">
            <div className="mytexttitle">
              Latest Posts
            </div>&nbsp;
            <div className="divider"></div>
          </div>
            <SocialFeed posts={feedData} />
          </div>
        </div>
      </>
    );
  }
}


export default Homepage;
