/* eslint-disable react/destructuring-assignment */
import React from 'react';
import axios from 'axios';

class ManagePosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allPosts: [],
      toggledPosts: [],
    };
    this.getAllPosts = this.getAllPosts.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitManagePost = this.handleSubmitManagePost.bind(this);

  }

  componentDidMount() {
    this.getAllPosts();
  }


  getAllPosts() {
    axios.get('http://54.173.19.52:3000/api/post/reported')
    // axios.get('/api/post/reported')
      .then((res) => {
        console.log('RES DATA ===', res.data)
        this.setState({ allPosts: res.data });
      })
      .catch((err) => console.log('ERROR GETTING POSTS: ', err));
  }

  handleChange(event) {
    const value = event.target.value;
    let tempArr = this.state.toggledPosts;

    if (tempArr.indexOf(value) === -1) {
      tempArr.push(value);
    } else {
      tempArr.splice(tempArr.indexOf(value), 1);
    }
    this.setState({ toggledPosts: tempArr });
  }

  handleSubmitManagePost(event) {
    console.log('CLICKED')
    event.preventDefault();
    var body = {
      "toggleHidePosts": this.state.toggledPosts
    };
    return axios.put('http://54.173.19.52:3000/api/post/reported', body)
      .then(() => {
        alert('Posts have been Updated!');
      })
      .then(() => {
        this.setState({
          toggledPosts:[]
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    const allPosts = this.state.allPosts;
    console.log('ALL POSTS', allPosts, 'REPORTED POSTS', this.state.toggledPosts);

    return (
      <div>
        <div className="manage-heading">MANAGE POSTS</div>

        <div className="listItems">
          <ul className="no-bullets">
            {allPosts.map((post) => (

            <li key={post.id}>

              <div className="mytextdiv">
                <div className="mytexttitle manage-mytext">
                  {post.name_user + " " + post.last_name}&nbsp;</div>
                    <div className="divider"></div>
                </div>

                <input id={post.id} type="checkbox" value={post.id} defaultChecked={post.hide_post ? "checked" : null} onChange={this.handleChange} />
                <label htmlFor={post.id}>&nbsp;<span className="span-label">Hide Post?</span></label>
              <br></br>
                <strong>Post:</strong> {post.message_post}
              <br></br>
                <strong>Post Name: </strong>{post.name}
              <br></br>
                <strong>Created:</strong> {post.created_at}
              <br></br>
                <strong>Location: </strong>{post.location_post}
              <br></br>
              {post.image_url}
              {post.run}
            </li>
            ))}
          </ul>
          <button onClick={this.handleSubmitManagePost}>SUBMIT CHANGES</button>
        </div>
      </div>
    );
  }
}

export default ManagePosts;
