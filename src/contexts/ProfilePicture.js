import PropTypes from "prop-types";
import React, { createContext, useState } from 'react';
export const ProfilePicture = createContext();

function ProfilePictureContext(props) {
  const [ dataProfile, setData ] = useState({
    profile_picture_url: '',
  });

  const resetProfilePicture = () => {
    setData({
      profile_picture_url: '',
    });
  };

  return (
    <ProfilePicture.Provider
      value={ {
        dataProfile,
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
