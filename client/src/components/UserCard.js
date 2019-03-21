import React from "react";

const UserCard = props => {
  return (
    <div>
      <h2>{props.user.name}</h2>
    </div>
  );
};

export default UserCard;
