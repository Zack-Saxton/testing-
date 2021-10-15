const   tokenExpiryCheck = (error) => {
 
    if( error.response.data === "Unauthorized" || error.response.data === "Access token has expired"){
        localStorage.clear();
        localStorage.setItem("redirec", JSON.stringify({ to: "/select-amount" }));
        window.location.replace("/login");
    }
    return null;
}
 
export default tokenExpiryCheck;