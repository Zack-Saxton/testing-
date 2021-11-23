import APICall from "../lib/AxiosLib";

export default async function usrBasicInformation() {
  const email = localStorage.getItem("email");
  let url = "get_profile_picture";
  let param = "";
  const profile_picture = localStorage.getItem("profile_picture");
  let data = {
    email: email,
    user: {
      mobile: {
        profile_picture: profile_picture,
      },
    },
  };
  let method = "POST";
  let addAccessToken = true;
  return APICall(url, param, data, method, addAccessToken);
}
