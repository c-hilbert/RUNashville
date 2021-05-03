/* eslint-disable react/destructuring-assignment */
import React from 'react';
import axios from 'axios';

class ManageEvents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allEvents: [],
      toggledEvents: [],
    };
    this.getAllEvents = this.getAllEvents.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitManageEvents = this.handleSubmitManageEvents.bind(this);

  }

  componentDidMount() {
    this.getAllEvents();
  }


  getAllEvents() {
    axios.get('http://54.173.19.52:3000/api/events/reported')
    // axios.get('/api/post/reported')
      .then((res) => {
        console.log('RES DATA ===', res.data)
        this.setState({ allEvents: res.data });
      })
      .catch((err) => console.log('ERROR GETTING POSTS: ', err));
  }

  handleChange(event) {
    const value = event.target.value;
    let tempArr = this.state.toggledEvents;

    if (tempArr.indexOf(value) === -1) {
      tempArr.push(value);
    } else {
      tempArr.splice(tempArr.indexOf(value), 1);
    }
    this.setState({ toggledEvents: tempArr });
  }

  handleSubmitManageEvents(event) {
    console.log('CLICKED')
    event.preventDefault();
    var body = {
      "toggleHideEvents": this.state.toggledEvents
    };
    return axios.put('http://54.173.19.52:3000/api/post/reported', body)
      .then(() => {
        alert('Events have been Updated!');
      })
      .then(() => {
        this.setState({
          toggledEvents:[]
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    const allEvents = this.state.allEvents;
    console.log('ALL EVENTS', allEvents, 'REPORTED EVENTS', this.state.toggledEvents);

    return (
      <div>
        <div className="manage-heading">MANAGE EVENTS</div>

        <div className="listItems">
          <ul className="no-bullets">
            {allEvents.map((event) => (

            <li key={event.id}>

              <div className="mytextdiv">
                <div className="mytexttitle manage-mytext">
                  {event.event_title}&nbsp;</div>
                    <div className="divider"></div>
                </div>

                <input id={event.id} type="checkbox" value={event.id} defaultChecked={event.hide_event ? "checked" : null} onChange={this.handleChange} />
                <label htmlFor={event.id}>&nbsp;<span className="span-label">Hide Event?</span></label>
                <br></br>
                <br></br>
                <span className='groupText'>User:  </span>&nbsp;&nbsp; {event.name_user}<br></br>
                <span className='groupText'>Description Events:  </span>&nbsp;&nbsp; {event.description_events}<br></br>
                <span className='groupText'>Attendees:  </span>&nbsp;&nbsp; {event.attendees}<br></br>
                <span className='groupText'>Start Time:  </span>&nbsp;&nbsp; {event.start_time}&nbsp;<span className='groupText'>&nbsp;|&nbsp;</span>&nbsp;
                <span className='groupText'>End Time:  </span>&nbsp;&nbsp; {event.end_time}<br></br>
                <span className='groupText'>Start Location:  </span>&nbsp;&nbsp; {event.start_location}&nbsp;<span className='groupText'>&nbsp;|&nbsp;</span>&nbsp;
                <span className='groupText'>End Location:  </span>&nbsp;&nbsp; {event.end_location}<br></br>
                <span className='groupText'>Event Type:  </span>&nbsp;&nbsp; {event.name_event_type}<br></br>
                <span className='groupText'>Difficulty Level:  </span>&nbsp;&nbsp; {event.name_difficulty_level}<br></br>
                <span className='groupText'>Running Distance:  </span>&nbsp;&nbsp; {event.running_distance}<br></br>
                <span className='groupText'>Created At:  </span>&nbsp;&nbsp; {event.created_at}<br></br>
            </li>
            ))}
          </ul>
          <button onClick={this.handleSubmitManageEvents}>SUBMIT CHANGES</button>
        </div>
      </div>
    );
  }
}

export default ManageEvents;
