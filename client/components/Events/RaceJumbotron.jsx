import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import data from '../../resources/dummydata';
import EventInfoModal from './EventInfoModal.jsx';
import moment from 'moment';
// import data from '../../resources/dummydata';
// import EventInfoModal from './EventInfoModal.jsx';
// import runnerImage from './images/leeds_runner.jpg';

class RaceJumbotron extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      races: this.props.races,
      // eventModal: false,
      isModalOpen: false,

    };
    this.onModalOpen = this.onModalOpen.bind(this);
  }

  onModalOpen() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }
  //  handleClose () {
  //    this.setState({eventModal: false});
  //  }
  //  handleShow () {
  //    this.setState({eventModal: true});
  //  }


  render() {
    return (
      <div className = "move-to-back">
        <Carousel>
          {this.state.races.map((race) => (
            <Carousel.Item className="carousel-img" key={race.id}>
              <img
                className="d-block w-100"
                src="./images/leeds_runner.jpg"
                alt="First slide"
                // onClick={this.onModalOpen}
              />
              <Carousel.Caption key={race.id}>
                {/* <div className="carousel-caption"> */}
                  <div className="carousel-text">
                  <div className="race-description">
                    <div>
                      <h1 onClick={this.onModalOpen} className="clickable-header">{race.name}</h1>
                      {this.state.isModalOpen ? (<EventInfoModal event={race} onModalOpen={this.onModalOpen} />) : null}
                    </div>

                    <div>
                      <span className="registration-text"><a href={race.link} target="blank">Click here to register!</a></span>
                    </div>
                    <br></br>
                    <div><span className="race-description-text">{race.description}</span></div>
                  </div>
                  <div className="race-details">
                    <div>
                      <span className="race-date-text">
                        <i style={{'color': 'var(--white)'}} className="fas fa-clock"></i>
                        &nbsp;{moment(race.start_time).format('dddd, MMMM Do YYYY, h:mm a')}
                        {/* &nbsp;{new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(race.start_time))} */}
                      </span>
                    </div>
                    <div>
                      <span className="race-location-text">
                        <i style={{'color': 'var(--white)'}} className="fas fa-globe-americas"></i>
                        &nbsp;{race.start_location}
                      </span>
                    </div>
                  </div>
                  <div className="race-map">
                    <img src="https://i2.wp.com/vincegray2014.com/wp-content/uploads/2020/01/printable-map-of-nashville-tn.jpg"></img>
                  </div>
                </div>
              </Carousel.Caption>
              {/* <EventInfoModal
                event={race}
                show={this.state.eventModal}
                handleClose={this.handleClose.bind(this)}/> */}
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  };
}

export default RaceJumbotron;
