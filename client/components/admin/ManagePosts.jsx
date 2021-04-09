import React from 'react';
import SocialPost from '../social/SocialPost';
import axios from 'axios';

class ManagePosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allPosts: [],
      updatedPosts: [],
      hide: false
    };
    this.getAllPosts = this.getAllPosts.bind(this);
    this.onHideClick = this.onHideClick.bind(this);
  }

  componentDidMount() {
    this.getAllPosts();
  }

  getAllPosts() {
    axios.get('api/post/reported')
      .then((res) => {
        this.setState({ allPosts: res.data });
      })
      .catch((err) => console.log('ERROR GETTING POSTS: ', err));
  }

  onHideClick() {
    // this.setState((state) => {
    //   const updatedPosts = state.updatedPosts.concat({ post_id: this.state.allPosts });
    //   return { allPosts };
    // });
    // this.setState({hide: !this.state.hide})
    this.setState(prevState => ({ hide: !prevState.hide }));
  };


  updatePosts() {
    const body = {
      url_short: this.state.urlShort,
      url_link: this.state.urlLink,
      linked_ref: this.props.linked_ref,
      linked_ref_id: this.props.linked_ref_id,
    };
    return axios.post('/links', body)
      .then(() => {
        alert('Link has been Added!');
      })
      .then(() => {
        this.setState({
          urlShort: '',
          urlLink: '',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { allPosts } = this.state;
    console.log('ALL POSTS', allPosts);

    return (
      <div>
        <div className="manage-heading">MANAGE POSTS</div>

        <div className="listItems"><ul className="no-bullets">
          {allPosts.map((post) => (


            <li key={post.id}>
            <div class="mytextdiv">
                <div class="mytexttitle manage-mytext">
                  {post.name_user + " " + post.last_name}&nbsp;</div>
          <div class="divider"></div>
          </div>
          <div className="manage-check">
              <label>
                Hide?:<input
                  name="hide"
                  type="checkbox"
                  checked={this.state.hide}
                  onChange={this.onHideClick} />
              </label>
              </div>
              <br></br>
              Post Name: {post.name}
              <br></br>
              Created: {post.created_at}
              <br></br>
              Location: {post.location_post}
              <br></br>
              Post: {post.message_post}
              <br></br>
              {post.image_url}
              {post.run}
            </li>
          ))}</ul>
        </div>



        {/* {allPosts.map((post) => (
          <div>{post.name_user + " " + post.last_name}
            <label>
              Hide?:
          <input
                name="isGoing"
                type="checkbox"
                checked={this.state.hide}
                onChange={this.onHideClick} />
            </label>
            <SocialPost key={post.date + post.post} propic={post.propic} name={post.name} date={post.created_at} location={post.location_post} image={post.image_url} run={post.run} post={post.message_post} /></div>
        ))} */}
      </div>
    );
  }
}

export default ManagePosts;
