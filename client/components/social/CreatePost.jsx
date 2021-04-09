import React from 'react';
import axios from 'axios';

import SectionTitle from '../SectionTitle.jsx';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        message: null,
        image: null,
        location: null,
        runDistance: null,
        runPace: null,
        runTime: null,
        runSteps: null,
        runHeartRate: null,
        runCalories: null,
        addRun: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleSubmitLinks = this.handleSubmitLinks.bind(this);
  }
  
  toggleRunDetails() {
    this.setState({
      runDistance: null,
      runPace: null,
      runTime: null,
      runSteps: null,
      runHeartRate: null,
      runCalories: null,
      addRun: !this.state.addRun
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  // handleSubmitLinks(event) {

  //   event.preventDefault();
  //   var body = {
  //     "formName1": this.state.formName1,
  //     "formName2": this.state.formName2,
  //   };
  //   return axios.post('/endpoint', body)
  //     .then(() => {
  //       alert('Record has been Added!');
  //     })
  //     .then(() => {
  //       this.setState({
  //         formName1: '',
  //         formName2: '',
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  render() {
    let runPane = <div></div>
    if(this.state.addRun){
      runPane = <div id='social-run-details-pane'>
        <div>
          <span className='add-run-tag'>Distance:</span>
          <input type='text' className='add-run-data' name='runDistance'></input>
          <span className='add-run-tag'>Avg. Pace:</span>
          <input type='text' className='add-run-data' name='runPace'></input>
          <span className='add-run-tag'>Heart Rate:</span>
          <input type='text' className='add-run-data' name='runHeartRate'></input>
        </div>
        <div>
          <span className='add-run-tag'>Time:</span>
          <input type='text' className='add-run-data' name='runTime'></input>
          <span className='add-run-tag'>Steps:</span>
          <input type='text' className='add-run-data' name='runSteps'></input>
          <span className='add-run-tag'> Calories Burned:</span>
          <input type='text' className='add-run-data' name='runCalories'></input>
        </div>
      </div>
    }
    return (
      <div className="form-modal-wrapper">
        <div className="form-modal-backdrop" onClick={this.props.closeWindow} />
        <div className="form-modal-box">
          <i className="fas fa-times fa-2x" style={{'position': 'absolute', 'left': '95%', 'top': '1.5%', 'float': 'right', 'margin': '-1rem, 1rem, 0, 0', 'cursor': 'pointer'}} onClick={this.props.closeWindow}></i>
          <SectionTitle text={'Message'}></SectionTitle>
          <br></br>
          <div id='add-social-post'>
            <div className='add-social-post-options'>
              <div>
                <input className='social-form-checkbox' type='checkbox' name='addRun' onClick={this.toggleRunDetails.bind(this)}></input>
                <label htmlFor='addRun'>Add Run Details</label>
              </div>
              <div>
                <i className="fas fa-globe-americas feed-icon clickable" name='location'></i>
                <span>Add Location</span>
              </div>
            </div>
            <div className='social-camera-button'>
              <i className="fas fa-camera fa-2x clickable"></i>
            </div>
            {runPane}
            <textarea name='message' placeholder='Tell us how you feel!'></textarea>
            <button onClick={this.props.closeWindow}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;