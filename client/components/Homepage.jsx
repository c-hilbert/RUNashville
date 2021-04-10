import React from 'react';
import RaceJumbotron from './Events/RaceJumbotron';
import EventsCarousel from './Events/EventsCarousel';
import AddEventForm from './Events/AddEventForm';
import SocialFeed from './social/SocialFeed';
import data from '../resources/dummydata';
import feedData from '../resources/dummyFeedData';
import SectionTitle from './SectionTitle';
import axios from 'axios';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eventData: data.events,
      eventData: [],
      feedData: feedData.posts,
      isModalOpen: false,
      apiData: '',
    };
    this.fetchEvents = this.fetchEvents.bind(this);
    this.onModalOpen = this.onModalOpen.bind(this);
  }
//click handlingfunctions for AddEventForm. These will get moved!

  handleSubmitEvent() {
    this.setState({addEvent: false});
  }

  componentDidMount() {
    axios.get('/api/events')
    .then((apiData) => {
      console.log('apiData.data:', apiData.data);
      this.setState({ eventData: apiData.data });
    })
    .catch((err) => console.log(err));
    // this.fetchEvents();
  }

  onModalOpen() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  fetchEvents() {
    axios.get('/api/events')
      .then((apiData) => {
        this.setState({ eventData: apiData.data });
        console.log('apiData.data:', apiData.data);
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { eventData, feedData } = this.state;
    // console.log('eventData:', eventData);
    return (
      <>
        <RaceJumbotron races={eventData.filter((event) => event.name_event_type === 'race')} />
        <div>
          <button style={{ display: "inline", width: "300px" }} onClick={this.onModalOpen}>NEW EVENT FORM</button>
<<<<<<< HEAD
        </div>
        <div>MAP GOING HERE MAYBE

=======
>>>>>>> 84868fc8d7536d5ba567be747eb2ea7e358649ee
        </div>
        <div className="homepage-body">
          <div className="events">
            <SectionTitle text="Daily" />
            <EventsCarousel events={eventData.filter((event) => event.name_event_type === 'daily_run')} />
            <SectionTitle text="Announcements and Other Events" />
            <EventsCarousel events={eventData.filter((event) => event.name_event_type === 'other')} />
            {this.state.isModalOpen ? (<AddEventForm fetchEvents={this.fetchEvents} onModalOpen={this.onModalOpen} />) : null}
          </div>
          <div className="homepage-social-feed">
            <SectionTitle text="Latest Posts" />
            <SocialFeed posts={feedData} />
          </div>
        </div>
      </>
    );
  }
}

export default Homepage;
