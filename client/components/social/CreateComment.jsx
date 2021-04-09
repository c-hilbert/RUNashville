import React from 'react';

class CreateComment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            comment: null,
            active: true
        }
    }
    updateComment(e){
        this.setState({comment: e.target.value});
    }

    submitComment(){
        console.log('post req goes here');
    }
    
    render(){
        return(
            <div className='social-comment'>
                <textarea name='comment' placeholder=''></textarea>
                <button onClick={this.props.toggleComment}>Submit</button>
            </div>
        );
    }
}

export default CreateComment;