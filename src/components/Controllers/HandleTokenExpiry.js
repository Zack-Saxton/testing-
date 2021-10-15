const tokenExpiryCheck = (error) => {

    if (error?.response?.data === "Unauthorized" || error?.response?.data === "Access token has expired") {
        //alert("Your session has been ended, Please login again to continue");
        localStorage.clear();
        localStorage.setItem("redirec", JSON.stringify({ to: "/select-amount" }));
        window.location.replace("/login");
    }
    return null;
}

export default tokenExpiryCheck;
