import React from 'react';
import moment from 'moment';
import EventInfoModal from './EventInfoModal';

class SmallEventCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.onModalOpen = this.onModalOpen.bind(this);
  }

  onModalOpen() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  render() {
    const { event, user } = this.props;

    if (event.event_type === 'daily_run') {
      let difficultyLevel;
      let difficultyStyle;
      if (event.name_difficulty_level === 'beginner') {
        difficultyLevel = 'Beginner';
        difficultyStyle = 'difficulty-beginner-small';
      } else if (event.name_difficulty_level === 'intermediate') {
        difficultyLevel = 'Intermediate';
        difficultyStyle = 'difficulty-intermediate-small';
      } else {
        difficultyLevel = 'Advanced';
        difficultyStyle = 'difficulty-advanced-small';
      }

      return (
        <>
          <div className="event-info-card">
            <img onClick={this.onModalOpen} className="event-info-card-photo clickable-image" height="180" width="290" src={event.thumbnail_photo} alt="photo" />
            <br />
            <br />
            <span onClick={this.onModalOpen} className="clickable-header event-title">{event.event_title}</span>
            <br />
            <div className="event-card-details-container">
              <span className="low-priority-text">
                <i style={{ color: 'var(--black)' }} className="fas fa-clock" />
                &nbsp;
                {moment(event.start_time).format('ddd, MMMM Do YYYY, h:mm a')}
                {/* &nbsp;{new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(event.start_time))} */}
              </span>
              <span className="low-priority-text">
                <i style={{ color: 'var(--black)' }} className="fas fa-running" />
                &nbsp;
                {event.running_distance}
              </span>
              <span className={difficultyStyle}>
                {difficultyLevel}
&nbsp;
              </span>
            </div>
            <br />
            <span className="event-description">{event.description_events}</span>
            <br />
            <br />
            <div className="event-card-details-container">
              <div>
                <span className="low-priority-text">
                  <i style={{ color: 'var(--black)' }} className="fas fa-globe-americas" />
                  &nbsp;
                  {event.start_location}
                </span>
              </div>
              <div>
                <span className="event-card-icon"><i style={{ color: 'var(--black)' }} className="fas fa-user-circle fa-2x" /></span>
                <span className="low-priority-text">
                  &nbsp;Hosted by: {user}
                </span>
              </div>
            </div>
          </div>
          <br />
          {this.state.isModalOpen ? (<EventInfoModal event={event} onModalOpen={this.onModalOpen} />) : null}
        </>
      );
    }
    return (
      <>
        <div className="small-event-info-card" onClick={this.onModalOpen}>
          <img onClick={this.onModalOpen} className="event-info-card-photo clickable-image" height="45" width="72.5" src={event.thumbnail_photo ? event.thumbnail_photo : null} alt="photo" />
          <br />
          <span onClick={this.onModalOpen} className="event-title clickable-header">{event.event_title}</span>
          <br />
          <span className="event-description">{event.description_events}</span>
        </div>
        {this.state.isModalOpen ? (<EventInfoModal event={event} onModalOpen={this.onModalOpen} />) : null}
      </>
    );
  }
}


export default SmallEventCard;
