import React from 'react';
import axios from 'axios';
import SocialFeed from './SocialFeed';
import CreatePost from './CreatePost';
import friendCard from './friendCard';
import SectionTitle from '../SectionTitle';
import AddEventForm from '../Events/AddEventForm';
import SmallEventCard from '../Events/SmallEventCard';

const Profile = class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentUserID: 1,
      userPosts: [],
      userProfile: {
      },
      friendsList: [
      ],
      milestones: {
        avgMilePace: '10:03',
        recordMilePace: '9:34',
        monthMiles: 25.2,
        lifetimeMiles: 40008.3,
        lifetimeRaces: 22,
        eventsAttended: 18,
      },
      userEvents: [],
      addEventActive: false,
      createPostActive: false,
    };

    this.updateDisplayedProfile = this.updateDisplayedProfile.bind(this);
  }

  componentDidMount() {
    const { currentUserID } = this.state;
    this.updateDisplayedProfile(currentUserID);
  }

  
  updateDisplayedProfile(userID) {
    this.setState({ currentUserID: userID }, () => {
      axios.get(`http://54.173.19.52:3000/api/user/${this.state.currentUserID}`)
        .then((newProfile) => {
          axios.get(`http://54.173.19.52:3000/api/friends/${this.state.currentUserID}`)
            .then((newFriends) => {
              axios.get(`http://54.173.19.52:3000/api/events/${this.state.currentUserID}`)
                .then((newEvents) => {
                  axios.get(`http://54.173.19.52:3000/api/post?id=${this.state.currentUserID}`)
                    .then((newPosts) => {
                      console.log('posts: ', newPosts.data);
                      this.setState({
                        userProfile: newProfile.data[0] || {},
                        friendsList: newFriends.data || [],
                        userEvents: newEvents.data || [],
                        userPosts: newPosts.data || []
                      });
                    })
                });
            });
        });
    });
  }
  // axios.get(`/api/post/id=${this.state.currentUserID}`)
  // .then((newPosts) => {
  //   console.log('posts: ', newPosts.data);

  activateCreatePost() {
    this.setState({ createPostActive: !this.state.createPostActive });
  }

  activateAddEvent() {
    this.setState({ addEventActive: !this.state.addEventActive });
  }

  render() {
    const {
      userProfile, friendsList, milestones, userEvents,
    } = this.state;
    const {
      name_user, last_name, image_url, banner_url, bio_description,
    } = userProfile;
    let addEvent = <div />;
    let createPost = <div />;
    if (this.state.addEventActive) {
      addEvent = <AddEventForm onModalOpen={this.activateAddEvent.bind(this)} />;
    }
    if (this.state.createPostActive) {
      createPost = <CreatePost userId={this.state.currentUserID} closeWindow={this.activateCreatePost.bind(this)} />;
    }
    if (userProfile.name_user) {
      return (
        <div>
          {createPost}
          {addEvent}
          <div className="social-profile-banner">
            <img className="social-profile-banner-img" src={banner_url} />
            <img className="social-profile-banner-profile-pic profile-pic-round" src={image_url} />
            <span className="social-profile-banner-name">
              {name_user}
              {' '}
              {last_name}
            </span>
          </div>
          <div id="social-feeds">
            <div className="side-column">
              <div className="contentBox">
                <SectionTitle text={`${name_user}'s Stats`} />
                <div className="statistics">
                  <div className="statLine">
                    <div className="statDescriptor">AVERAGE MILE PACE: </div>
                    <div className="stat">{milestones.avgMilePace}</div>
                  </div>
                  <div className="statLine">
                    <div className="statDescriptor">RECORD MILE PACE: </div>
                    <div className="stat">{milestones.recordMilePace}</div>
                  </div>
                  <div className="statLine">
                    <div className="statDescriptor">THIS MONTH&apos;S MILES: </div>
                    <div className="stat">{milestones.monthMiles.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                  </div>
                  <div className="statLine">
                    <div className="statDescriptor">LIFETIME MILES: </div>
                    <div className="stat">{milestones.lifetimeMiles.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                  </div>
                  <div className="statLine">
                    <div className="statDescriptor">LIFETIME RACES: </div>
                    <div className="stat">{milestones.lifetimeRaces.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                  </div>
                  <div className="statLine">
                    <div className="statDescriptor">EVENTS ATTENDED: </div>
                    <div className="stat">{milestones.eventsAttended.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                  </div>
                </div>
              </div>
              <div className="contentBox">
                <SectionTitle text={`${name_user}'s Events`} />
                <div className="eventsFeed">{userEvents.map((event) => (<SmallEventCard event={event} user={`${name_user} ${last_name}`} />))}</div>
              </div>
              <div className="contentBox">
                <SectionTitle text={`${name_user}'s Recent Activities`} />
                <div className="recentActivityFeed" />
              </div>
            </div>
          <div id="center-column">
            <div id="social-feed-buttons">
              <button className="social-button" onClick={() => { this.activateCreatePost(); }}>+ New Post</button>
              <button className="social-button" onClick={() => { this.activateAddEvent(); }}>+ Create Run</button>
            </div>
            <SectionTitle text={`${name_user}'s Feed`} />
            <div className="contentBox">
              <SocialFeed posts={this.state.userPosts} />
            </div>
          </div>
          <div className="side-column">
            <div className="contentBox"
            // height="fit-content" max-height="40vh"
            >
              <button className="social-follow-button">
                Follow
                  {' '}
                {name_user}
              </button>
              <SectionTitle text={`${name_user}'s Bio`} />
              <div className="userBio">{bio_description}</div>
            </div>
            <div className="contentBox">
              <SectionTitle text={`${name_user}'s Friends`} />
              <div className="friendsList">
                {friendsList.map((friend) => (friendCard(friend, this.updateDisplayedProfile)))}
              </div>
            </div>
            <div className="contentBox">
              <SectionTitle text={`${name_user}'s Friends Feed`} />
              <div className="friendFeed">
              <SocialFeed posts={this.state.userPosts} />
                </div>
            </div>
          </div>
        </div>
        </div >
      );
    }
return null;
  }
};

export default Profile;
