import React from 'react';

class ManageEvents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reportedEvents: ''
    };


  }


  render() {

    return (
      <div>
        ADD NEW EVENT
        <br></br>
        MANAGE EVENTS
      </div>
    );
  }

}

export default ManageEvents;
