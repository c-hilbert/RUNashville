import React from 'react';
import RunDetails from './RunDetails.jsx';
import SocialPostComments from './SocialPostComments.jsx';

class SocialPost extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      commentsActive: false,
      likes: 0
    }
    this.toggleComments = this.toggleComments.bind(this);
    this.likePost = this.likePost.bind(this);
  }

  toggleComments(){
    this.setState({commentsActive: !this.state.commentsActive});
  }

  likePost(){
    //axios.put, then setState likes = likes + 1
  }

  render(){
    let comments = <div></div>
    let runDetails = <div></div>;
    let userImage = <div></div>;
    if(this.state.commentsActive){
      comments = <SocialPostComments postId={this.props.id} toggleComments={this.toggleComments}></SocialPostComments>
    }
    if (this.props.run) {
      runDetails = <RunDetails name={this.props.name} run={this.props.run}></RunDetails>;
    }
    if (this.props.image) {
      userImage = <div className='social-post-thumbnail-container'><img className="social-post-thumbnail" src={this.props.image} alt="pic" /></div>;
    }
    return (
      <div className="social-feed-post">
        <div className='social-feed-post-header'>
          <div className='social-feed-post-profile'>
            <img className='profile-pic-round' alt='Profile' src={this.props.propic} />
            <div style={{'marginLeft': '5px', 'alignSelf': 'flex-start'}}>
              <span>{this.props.name} </span>
              <span>{this.props.lastName}</span>
            </div>
          </div>
          <div style={{float: 'right', 'alignSelf': 'center'}}>
            <div className='feed-event-info' style={{'marginBottom': '0.5rem'}}>
              <i className="fas fa-clock feed-icon"></i>
              <time dateTime={this.props.date} className='low-priority-text'></time>
            </div>
            <div>
              <div className='feed-event-info'>
                <i className="fas fa-globe-americas feed-icon"></i>
                <span className='low-priority-text'>{this.props.location}</span>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        {runDetails}
        <span>{this.props.post}</span>
        {userImage}
        <div className='social-post-reactions'>
          <i className="fas fa-comment-dots feed-icon" style={{'cursor': 'pointer'}} onClick={()=>{this.toggleComments()}}></i>
          <i className="fas fa-plus-circle feed-icon" style={{'cursor': 'pointer'}}></i>
          <i className="fas fa-heartbeat feed-icon" style={{'cursor': 'pointer'}} onClick={()=>{this.likePost()}}></i>
          <span className='social-post-likes'>({this.state.likes})</span>
          {/* {props.emotes.map((emote)=>{
            <img className='emote' src={emote}/>
          })} */}
          <span style={{'float': 'right', 'textDecoration': 'underline', 'cursor': 'pointer'}} className='low-priority-text'>Report</span>
          {comments}
        </div>
      </div>
    );
  }
}

export default SocialPost;
