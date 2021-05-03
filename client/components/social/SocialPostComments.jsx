import axios from 'axios';
import React from 'react';

class SocialPostComments extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            submitComment: null,
            comments: null,
            componentActive: true            
        }
        this.updateComment = this.updateComment.bind(this);
        this.submitComment = this.submitComment.bind(this);
    }

    componentDidMount(){
        axios.get(`http://54.173.19.52:3000/api/post/${this.props.postId}/comments`)
            .then((comments) => {
                console.log('comments: ', comments);
                this.setState({comments: comments.data || null});
            })
    }

    updateComment(e){
        this.setState({submitComment: e.target.value}, ()=>{
            console.log(this.state.submitComment);
        });
    }

    submitComment(){
        if(this.state.submitComment === null || this.state.submitComment === ''){
            alert('Comment field is currently empty');
        } else {
            console.log('post req goes here');
            console.log('then a get req w updates');
            console.log('then update state');
        }
    }

    render(){
        let userComments = <div></div>;
        if(this.state.comments){
            userComments = <div className='social-post-comments-list'>
                {this.state.comments.map((comment) => {
                    return(
                        <div key={comment.id} className='full-social-comment'>
                            <div className='social-feed-post-profile'>
                                <img className='profile-pic-round' alt='Profile' src={comment.image_url} />
                                <div style={{'marginLeft': '5px', 'alignSelf': 'flex-start'}}>
                                    <span>{comment.name_user} </span>
                                    <span>{comment.last_name}</span>
                                </div>
                            </div>
                            <p className='social-post-comment-text' style={{'display': 'block'}}>{comment.message_comments}</p>
                        </div>
                    );
                })}
            </div>
        }
        return(
            <div className='social-comment-component'>
                {userComments}
                <textarea className='submit-social-comment' style={{'backgroundColor': 'var(--bg-white'}} name='submitComment' placeholder='Comment on this post...' onChange={this.updateComment}></textarea>
                <button style={{'height': '50px', 'marginBottom': '1rem'}} onClick={this.submitComment}>Submit</button>
            </div>
        );
    }
}

export default SocialPostComments;