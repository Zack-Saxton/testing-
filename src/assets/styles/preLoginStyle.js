import { makeStyles } from "@mui/styles";

//Styling
const preLoginStyle = makeStyles((theme) => ({
  mainDiv: {
    backgroundColor: "#f6f6f6",
    minHeight: "500px !important"
  },
  smallText: {
    color: "#4a4e57",
    fontSize: ".8rem"
  },
  blueBackground:{
    backgroundColor:"#013474"
  },
  blueBox:{
    backgroundImage:"linear-gradient(90deg, rgb(8 29 64) 0%, #1c488a 100% )",
    margin:"auto",
    borderRadius:"10px"
  },
  goldIcon:{
    width:"97px",
    height:"97px"
  },
  
}));

export { preLoginStyle };
