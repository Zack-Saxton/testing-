import PropTypes from "prop-types";
import React, { createContext, useState } from 'react';
export const ProfilePicture = createContext();

function ProfilePictureContext(props) {
  const [ data, setData ] = useState({
    profilePictureURL: '',
  });

  const resetProfilePicture = () => {
    setData({
      profilePictureURL: '',
    });
  };

  return (
    <ProfilePicture.Provider
      value={ {
        dataProfile: data,
        setData,
        resetProfilePicture,
      } }
    >
      { props.children }
    </ProfilePicture.Provider>
  );
}
ProfilePictureContext.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func ]),
};

export default ProfilePictureContext;
