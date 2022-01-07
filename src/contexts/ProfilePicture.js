import React, { createContext, useState } from "react";

export const ProfilePicture = createContext();

const ProfilePictureContext = (props) => {
	const [dataProfile, setData] = useState({
		profile_picture_url : "",

	});

	const resetProfilePicture = () => {
		setData({
			profile_picture_url : "",
		})
	}

	return (
		<ProfilePicture.Provider value={{ dataProfile: dataProfile, setData: setData, resetProfilePicture: resetProfilePicture  }}>
			{props.children}
		</ProfilePicture.Provider>
	);
};

export default ProfilePictureContext;
