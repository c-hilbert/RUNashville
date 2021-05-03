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
    this.submitPost = this.submitPost.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    // this.handleSubmitLinks = this.handleSubmitLinks.bind(this);
  }
  
  updateMessage(e) {
    console.log('e:', e.target.value);
    this.setState({message: e.target.value});
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

  submitPost(){
    if(this.state.message === null || this.state.message === '') {
      alert('Cannot submit a post without message text');
    } else {
      console.log('post: ', this.state.message, 'img: ', this.state.image, 'loc: ', this.state.location, 'id: ', this.props.userId);
      axios.post('http://54.173.19.52:3000/api/post', {
        message_post: this.state.message,
        image_url: this.state.image,
        location_post: this.state.location,
        id: this.props.userId
      })
      .then((result)=>{
        console.log(result);
        console.log('post_id returned: ', result.data.insertId);
        console.log('Now do run data');
        console.log('Then do refresh feed');
        console.log('Then close modal');
        
      });
    }
  }

  render() {
    let runPane = <div></div>
    if(this.state.addRun){
      runPane = <div id='social-run-details-pane'>
        <div>
          <div className='add-run-left add-run-top'>
            <span className='add-run-tag'>Distance:</span>
            <input type='text' className='add-run-data' name='runDistance'></input>
          </div>
          <div className='add-run-center add-run-top'>
            <span className='add-run-tag'>Avg. Pace:</span>
            <input type='text' className='add-run-data' name='runPace'></input>
          </div>
          <div className='add-run-right add-run-top'>
            <span className='add-run-tag'>Heart Rate:</span>
            <input type='text' className='add-run-data' name='runHeartRate'></input>
          </div>
        </div>
        <div className='add-run-left add-run-bottom'>
          <div>
            <span className='add-run-tag'>Time:</span>
            <input type='text' className='add-run-data' name='runTime'></input>
          </div>
          <div className='add-run-center add-run-bottom'>
            <span className='add-run-tag'>Steps:</span>
            <input type='text' className='add-run-data' name='runSteps'></input>
          </div>
          <div className='add-run-right add-run-bottom'>
            <span className='add-run-tag'> Calories:</span>
            <input type='text' className='add-run-data' name='runCalories'></input>
          </div>
        </div>
      </div>
    }
    return (
      <div className="form-modal-wrapper">
        <div className="form-modal-backdrop" onClick={this.props.closeWindow} />
        <div className="form-modal-box">
          <i className="fas fa-times fa-2x modal-exit-btn" onClick={this.props.closeWindow}></i>
          <SectionTitle text={'Message'}></SectionTitle>
          <br></br>
          <div id='add-social-post'>
            <div className='add-social-post-options'>
              <div>
                <input className='social-form-checkbox' type='radio' name='addRun' onClick={this.toggleRunDetails.bind(this)}></input>
                <label htmlFor='addRun'>Add Run Details</label>
              </div>
              <div>
                <i className="fas fa-globe-americas feed-icon clickable" name='location'></i>
                <span>Add Location</span>
              </div>
            </div>
            <div className='social-camera-button'>
              <i className="fas fa-camera fa-2x clickable"></i>
              <input type='text' className='social-post-add-image' placeholder='Add an image URL here!'/>
            </div>
            {runPane}
            <textarea name='message' placeholder='Tell us how you feel!' onChange={(e)=>{this.updateMessage(e)}}></textarea>
            <button onClick={this.submitPost.bind(this)}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;