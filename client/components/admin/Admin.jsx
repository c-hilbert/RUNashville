import React from 'react';
import ManageUsers from './ManageUsers';
import ManagePosts from './ManagePosts';
import ManageEvents from './ManageEvents';

const Admin = class extends React.Component {
  constructor() {
    super();
    this.state = {
      toRender: '',
    };
    this.handleUsersClick = this.handleUsersClick.bind(this);
    this.handlePostsClick = this.handlePostsClick.bind(this);
    this.handleEventsClick = this.handleEventsClick.bind(this);
  }

  handleUsersClick() {
    this.setState({ toRender: 'users' });
  }

  handlePostsClick() {
    this.setState({ toRender: 'posts' });
  }

  handleEventsClick() {
    this.setState({ toRender: 'events' });
  }


  getAllUsers() {
    axios.get('http://54.173.19.52:3000/api/posts')
      .then(res => {
        this.setState({ allPosts: res.data });
      })
      .catch(err => console.log('ERROR GETTING POSTS: ', err));
  }


  render() {
    const toRender = this.state.toRender
    return (
      <div>

        <div className="with-sidebar">
          <div>
            {/* <!-- intermediary wrapper --> */}

            <div className="sidebar">
              <br />
              <div className="sidebar-contents">
                <i className="fas fa-running fa-3x sidebar-icon" onClick={this.handleUsersClick} />
                <div className="sidebarText">Manage Users</div>
                <i className="fas fa-exclamation-triangle fa-3x sidebar-icon" onClick={this.handlePostsClick} />
                <div className="sidebarText">Report Posts</div>
                <i className="fas fa-clipboard-list fa-3x sidebar-icon" onClick={this.handleEventsClick} />
                <div className="sidebarText">Manage Events</div>
                <i className="fas fa-envelope-open-text fa-3x future" />
                <div className="sidebarText future">Email Members</div>
              </div>
            </div>


            <div className="not-sidebar">
              <div>
                {toRender === 'users' ? <ManageUsers /> : null}
              </div>
              <div>
                {toRender === 'posts' ? <ManagePosts /> : null}
              </div>
              <div>
                {toRender === 'events' ? <ManageEvents /> : null}
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Admin;
