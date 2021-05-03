import React from 'react';

const friendCard = (friend, onClick) => (
  <div key={friend.id} onClick={() => { onClick(friend.id) }} className="friendCard">
    <img className="friendCardProfileImg" src={friend.image_url !== '' ? friend.image_url : './defaultProf.png'} alt="default" />
    <div className="friendCardName">{friend.name_user +' '+friend.last_name}</div>
  </div>
);

export default friendCard;
