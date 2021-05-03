import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import Button from 'react-bootstrap/Button';
import FriendList from './FriendList.jsx';
import moment from 'moment';



const EventInfoModal = ({event, onModalOpen}) => {

  var difficultyLevel;
  var difficultyStyle;
  if (event.difficulty_level === 'beginner') {
    difficultyLevel = 'Beginner';
    difficultyStyle = 'difficulty-beginner-big';
  } else if (event.difficulty_level === 'intermediate') {
    difficultyLevel = 'Intermediate';
    difficultyStyle = 'difficulty-intermediate-big';
  } else {
    difficultyLevel = 'Advanced';
    difficultyStyle = 'difficulty-advanced-big';
  }

  return (

    <div className="form-modal-wrapper">
    <div className="form-modal-backdrop" onClick={onModalOpen} />
    <div className="form-modal-box" style={{width: "1200px"}}>
    <i className="fas fa-times fa-2x modal-exit-btn" onClick={onModalOpen}></i>
      <div style={{display: "flex", flexDirection: "row", marginTop: "0px"}}>
          {/* left column */}
          <div style={{flexBasis: "50%", marginRight: "10px"}}>
          <div className="mytextdiv">
            <div className="mytexttitle">
              {event.event_title}
            </div>
            <div className="divider"></div>
          </div>
            {/* <img className="thumbnail" src={event.thumbnail_photo}></img>
            <div className="mytextdiv">
            <div className="mytexttitle">
              Route
            </div>
            <div className="divider"></div>
          </div> */}
          {event.name_event_type === 'other' ? (
            <img className="other-event-photo" src={event.map_url}></img>
          ) : (
            <div className="event-modal-map" dangerouslySetInnerHTML={{__html: event.map_url}}>
            </div>
          )}
            {/* <img className="thumbnail" src={event.map_url}></img>&nbsp; */}
          </div>
          {/* right column */}
          <div style={{flexBasis: "50%", marginLeft: "10px", fontSize: "1.6rem", lineHeight: "3rem"}}>
          <div className="mytextdiv">
            <div className="mytexttitle">
              Details
            </div>
            <div className="divider"></div>
          </div>
            <div>
              <i style={{'color': 'var(--black)'}} className="fas fa-clock"></i>&nbsp;
               When:&nbsp;

              <span> {moment(event.start_time).format('dddd, MMMM Do YYYY, h:mm a')}</span>
            </div>
            <div>
              <i style={{'color': 'var(--black)'}} className="fas fa-globe-americas"></i>&nbsp;
              Where:&nbsp;

              <span> {event.start_location}</span>
            </div>
            {/* is meetup a different place */}
            {event.event_type === 'other' ? (
              <>
              </>
            ) : (
                <>
                  <div>  <i style={{ 'color': 'var(--black)' }} className="fas fa-running"></i>&nbsp;
              Length:&nbsp;
              <span> {event.running_distance}</span>
                  </div>
                  <div>Level:&nbsp;
                <span className={difficultyStyle}>&nbsp;{difficultyLevel}&nbsp;</span>
                  </div>
                </>
            )}

            <div><i style={{ 'color': 'var(--black)' }} className="fas fa-user-circle"></i>&nbsp;
              Host:&nbsp;
              <span>{event.name_user}</span>
            </div>
            <div>Description:&nbsp;
              <span> {event.description_events}</span>
            </div>
            {/* <div className="mytextdiv">
              <div className="mytexttitle">
              Attending
            </div>
            <div className="divider"></div>
            </div>
            <button style={{width: "100px"}}>RSVP </button>
            <div>8
              <span> of your friends are attending</span>
            </div>
            <FriendList/> */}
          </div>
        </div>
    </div>
  </div>
  );
};

export default EventInfoModal;
