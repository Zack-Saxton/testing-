const tokenExpiryCheck = (error) => {

    if (error?.response?.data === "Unauthorized" || error?.response?.data === "Access token has expired") {
        //alert("Your session has been ended, Please login again to continue");
        localStorage.setItem("token", JSON.stringify(userToken));
        localStorage.setItem("cred", JSON.stringify({email: "", password: "" }));
        localStorage.setItem("accountDetails", JSON.stringify({ }));
        localStorage.setItem("branchname", JSON.stringify({ }));
        localStorage.setItem("branchopenstatus", JSON.stringify({ }));
        localStorage.setItem("login_date", JSON.stringify({ }));
        localStorage.setItem("user", JSON.stringify({ }));
        localStorage.setItem("branchphone", JSON.stringify({ }));
        localStorage.setItem("profile_picture", JSON.stringify({ }));
        localStorage.setItem("redirec", JSON.stringify({ to: "/select-amount" }));
        window.location.replace("/login");
    }
    return null;
}

export default tokenExpiryCheck;
