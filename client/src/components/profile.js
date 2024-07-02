import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useSelector, useDispatch } from 'react-redux'

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const appUser = useSelector((state) => state.user.value.user);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && !!appUser && (
      <div style={{display: 'inline-block', width:"100%"}}>
        {/* <img src={user.picture} alt={user.name} /> */}
        <h2 style={{textAlign:"right"}}>{appUser.name}</h2>
        {/* <p>{user.email}</p> */}
      </div>
    )
  );
};

export default Profile;