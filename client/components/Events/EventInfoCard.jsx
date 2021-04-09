import React from 'react';
import moment from 'moment';
import EventInfoModal from './EventInfoModal';

class EventInfoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    // this.formatAMPM = this.formatAMPM.bind(this);
    this.onModalOpen = this.onModalOpen.bind(this);
  }

  // formatAMPM(date) {
  //   var hours = date.getHours();
  //   var minutes = date.getMinutes();
  //   var ampm = hours >= 12 ? 'pm' : 'am';
  //   hours = hours % 12;
  //   hours = hours ? hours : 12; // the hour '0' should be '12'
  //   minutes = minutes < 10 ? '0'+minutes : minutes;
  //   var strTime = hours + ':' + minutes + ' ' + ampm;
  //   return strTime;
  // }

  onModalOpen() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  render() {
    var { event } = this.props;

    if (event.event_type === 'daily_run') {
      let difficultyLevel;
      let difficultyStyle;
      if (event.difficulty_level === 'beginner') {
        difficultyLevel = 'Beginner';
        difficultyStyle = 'difficulty-beginner-small';
      } else if (event.difficulty_level === 'intermediate') {
        difficultyLevel = 'Intermediate';
        difficultyStyle = 'difficulty-intermediate-small';
      } else {
        difficultyLevel = 'Advanced';
        difficultyStyle = 'difficulty-advanced-small';
      }

      // <div>
// <h1 onClick={this.onModalOpen} >{race.name}</h1>
// {this.state.isModalOpen ? (<EventInfoModal event={race} onModalOpen={this.onModalOpen} />) : null}
// </div>

      return (
        <>
          <div className="event-info-card">
            <img onClick={this.onModalOpen}  className="event-info-card-photo clickable-image" height="180" width="290" src={event.thumbnail_photo} alt="photo"></img>
            <br></br>
            <br></br>
            <span onClick={this.onModalOpen}  className="clickable-header event-title">{event.name}</span>
            <br></br>
            <div className="event-card-details-container">
              <span className="low-priority-text">
                <i style={{ 'color': 'var(--black)' }} className="fas fa-clock"></i>
                &nbsp;{moment(event.start_time).format('ddd, MMMM Do YYYY, h:mm a')}
                {/* &nbsp;{new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(event.start_time))} */}
              </span>
              <span className="low-priority-text">
                <i style={{ 'color': 'var(--black)' }} className="fas fa-running"></i>
                &nbsp;{event.running_distance}
              </span>
              <span className={difficultyStyle}>&nbsp;{difficultyLevel}&nbsp;</span>
            </div>
            <br></br>
            <span className="event-description">{event.description}</span>
            <br></br>
            <br></br>
            <div className="event-card-details-container">
              <div>
                <span className="low-priority-text">
                  <i style={{ 'color': 'var(--black)' }} className="fas fa-globe-americas"></i>
                  &nbsp;{event.start_location}
                </span>
              </div>
              <div>
                <span className="event-card-icon"><i style={{ 'color': 'var(--black)' }} className="fas fa-user-circle fa-2x"></i></span>
                <span className="low-priority-text">&nbsp;Hosted by: {event.leader}</span>
              </div>
            </div>
          </div>
          <br></br>
          {this.state.isModalOpen ? (<EventInfoModal event={event} onModalOpen={this.onModalOpen} />) : null}
        </>
      );
    } else {
      return (
        <>
          <div className="event-info-card">
            <img onClick={this.onModalOpen} className="event-info-card-photo clickable-image" height="180" width="290" src={event.thumbnail_photo} alt="photo"></img>
            <br></br>
            <br></br>
            <span onClick={this.onModalOpen} className="event-title clickable-header">{event.name}</span>
            <br></br>
            <br></br>
            <span className="event-description">{event.description}</span>
          </div>
          <br></br>
          {this.state.isModalOpen ? (<EventInfoModal event={event} onModalOpen={this.onModalOpen} />) : null}
        </>
      );
    }
  }

}

// const EventInfoCard = ({ event }) => {
//   if (event.event_type === 'daily_run') {

//     var difficultyLevel;
//     var difficultyStyle;
//     if (event.difficulty_level === 'beginner') {
//       difficultyLevel = 'Beginner';
//       difficultyStyle = 'difficulty-beginner';
//     } else if (event.difficulty_level === 'intermediate') {
//       difficultyLevel = 'Intermediate';
//       difficultyStyle = 'difficulty-intermediate';
//     } else {
//       difficultyLevel = 'Advanced';
//       difficultyStyle = 'difficulty-advanced';
//     }

//     return (
//       <>
//         <div className="event-info-card">
//           <img className="event-info-card-photo" height="180" width="290" src="./images/nashville.jpeg" alt="photo"></img>
//           <br></br>
//           <br></br>
//           <span className="event-title">{event.name}</span>
//           <br></br>
//           <div className="event-card-details-container">
//             <span className="low-priority-text">
//               <i style={{ 'color': 'var(--black)' }} className="fas fa-clock"></i>
//               &nbsp;{moment(event.start_time).format('ddd, MMMM Do YYYY, h:mm a')}
//               {/* &nbsp;{new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(event.start_time))} */}
//             </span>
//             <span className="low-priority-text">
//               <i style={{ 'color': 'var(--black)' }} className="fas fa-running"></i>
//               &nbsp;{event.running_distance}
//             </span>
//             <span className={difficultyStyle}>&nbsp;{difficultyLevel}&nbsp;</span>
//           </div>
//           <br></br>
//           <span className="event-description">{event.description}</span>
//           <br></br>
//           <br></br>
//           <div className="event-card-details-container">
//             <div>
//               <span className="low-priority-text">
//                 <i style={{ 'color': 'var(--black)' }} className="fas fa-globe-americas"></i>
//                 &nbsp;{event.start_location}
//               </span>
//             </div>
//             <div>
//               <span className="event-card-icon"><i style={{ 'color': 'var(--black)' }} className="fas fa-user-circle fa-2x"></i></span>
//               <span className="low-priority-text">&nbsp;Hosted by: {event.leader}</span>
//             </div>
//           </div>
//         </div>
//         <br></br>
//       </>
//     );
//   } else {
//     return (
//       <>
//         <div className="event-info-card">
//           <img className="event-info-card-photo" height="180" width="290" src="./images/nashville.jpeg" alt="photo"></img>
//           <br></br>
//           <br></br>
//           <span className="event-title">{event.name}</span>
//           <br></br>
//           <br></br>
//           <span className="event-description">{event.description}</span>
//         </div>
//         <br></br>
//       </>
//     );
//   }
// };

export default EventInfoCard;
