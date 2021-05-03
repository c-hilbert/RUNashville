import React from 'react';

const RunDetails = (props) => {
  return(
    <div className='social-run-details-pane'>
      <div style={{'textDecoration': 'underline', 'marginBottom': '0.4rem'}}>{props.name}'s Run</div>
      <div className='social-run-details-row'>
        <span>Distance: {props.run.distance} mi.</span>
        <span>Time: {props.run.time} min</span>
        <span>Pace: {props.run.pace} min</span>
      </div>
      <br></br>
      <div className='social-run-details-row'>
        <span>Steps: {props.run.steps}</span>
        <span>Heart Rate: {props.run.heartRate} bpm</span>
        <span>Calories: {props.run.calories}</span>
      </div>
    </div>
  );
}

export default RunDetails;