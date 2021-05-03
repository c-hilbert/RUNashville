import React from 'react';
import EventInfoCard from './EventInfoCard';
import EventInfoModal from './EventInfoModal';
// import data from '../../resources/dummydata';

class EventsCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: this.props.events.slice(0, 3),
      hiddenEventsRight: this.props.events.slice(3),
      hiddenEventsLeft: [],
      showNextButton: this.props.events.length > 3 ? true : false,
      showPreviousButton: false,
      // isModalOpen: false,
    };
    this.handleNextEventClick = this.handleNextEventClick.bind(this);
    this.handlePreviousEventClick = this.handlePreviousEventClick.bind(this);
    // this.onModalOpen = this.onModalOpen.bind(this);
  }

  // onModalOpen() {
  //   this.setState({ isModalOpen: !this.state.isModalOpen });
  // }

  componentDidUpdate(prevProps) {
    if (this.props.events !== prevProps.events) {
      this.setState({
        events: this.props.events.slice(0, 3),
        hiddenEventsRight: this.props.events.slice(3),
        hiddenEventsLeft: [],
        showNextButton: this.props.events.length > 3 ? true : false,
        showPreviousButton: false,
      });
    }
  }

  handleNextEventClick() {
    var updatedHiddenEventsLeft = this.state.hiddenEventsLeft;
    var updatedEvents = this.state.events;
    var updatedHiddenEventsRight = this.state.hiddenEventsRight;
    updatedHiddenEventsLeft.push(updatedEvents.shift());
    updatedEvents.push(updatedHiddenEventsRight.shift());
    this.setState({
      events: updatedEvents,
      hiddenEventsRight: updatedHiddenEventsRight,
      hiddenEventsLeft: updatedHiddenEventsLeft,
      showNextButton: updatedHiddenEventsRight.length > 0 ? true : false,
      showPreviousButton: true,
    });
  }

  handlePreviousEventClick() {
    var updatedHiddenEventsLeft = this.state.hiddenEventsLeft;
    var updatedEvents = this.state.events;
    var updatedHiddenEventsRight = this.state.hiddenEventsRight;
    updatedHiddenEventsRight.unshift(updatedEvents.pop());
    updatedEvents.unshift(updatedHiddenEventsLeft.pop());
    this.setState({
      events: updatedEvents,
      hiddenEventsRight: updatedHiddenEventsRight,
      hiddenEventsLeft: updatedHiddenEventsLeft,
      showNextButton: true,
      showPreviousButton: updatedHiddenEventsLeft.length > 0 ? true : false,
    });
  }

  render() {
    const { events } = this.state;
    return (
      <div className="events-carousel">
        <div className="events-carousel-track">
          {this.state.showPreviousButton ? (
            <button onClick={this.handlePreviousEventClick} className={"events-carousel-previous-button"}>
              <i className="fas fa-chevron-left">
              </i></button>) : (
                <div className="button-no-show">&nbsp;&nbsp;&nbsp;</div>
              )}

          {events.map((event) => <EventInfoCard event={event} key={event.id} />)}
          <button onClick={this.handleNextEventClick} className={this.state.showNextButton ? "events-carousel-next-button" : "hide-button"}>
            <i className="fas fa-chevron-right">
            </i></button>
        </div>
      </div>
    );
  }
}



export default EventsCarousel;
