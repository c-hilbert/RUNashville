import React from 'react';
import SocialPost from './SocialPost.jsx';

const SocialFeed = (props) => {
  return(
    <div>
      {props.posts.map((post) => {
        return (
        <SocialPost 
          key={post.id} 
          id={post.id}
          name={post.name_user} 
          lastName={post.last_name} 
          propic={post.user_image_url} 
          date={post.created_at} 
          location={post.location_post} 
          image={post.post_image_url} 
          post={post.message_post} >
          {/* // run={post.run}>//FIX ME!!!! */}
        </SocialPost>
        );
      })}
    </div>
  );
}

export default SocialFeed;