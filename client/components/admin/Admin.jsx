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
    axios.get('/posts')
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
              <i className="fas fa-running fa-3x"  onClick={this.handleUsersClick} />
              <div className="sidebarText">Manage Users</div>
                <i className="fas fa-exclamation-triangle fa-3x" onClick={this.handlePostsClick} />
                <div className="sidebarText">Report Posts</div>
                <i className="fas fa-clipboard-list fa-3x" onClick={this.handleEventsClick} />
                <div className="sidebarText">Manage Events</div>
                <i className="fas fa-envelope-open-text fa-3x future" />
                <div className="sidebarText future">Email Members</div>
              </div>


            <div className="not-sidebar">
             {toRender === 'users'
            ? <ManageUsers />
                : toRender === 'posts'
                ? <ManagePosts />
                  : toRender === 'events'
                  ? <ManageEvents />
                  : null
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Admin;
