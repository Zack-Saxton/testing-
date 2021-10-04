
import React, { useEffect, useState } from "react";
import "../AppBar/SideNav.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {getNoticationData} from "../../controllers/NotificationController";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({

    customBadge: {
        backgroundColor: "#ffd524",
        color: "black",
    },
}));

export default function Notification() {
const classes = useStyles();
const [anchorEl, setAnchorEl] = useState(null);
const [messages, setMessages] = useState([]);
const [badgeCount, setbadgeCount] = useState(0);
const [openDialog, setOpenDialog] = React.useState(false);
const [messageTitle, setMessageTitle] = useState([]);
const [messageContent, setMessageContent] = useState([]);
const open = Boolean(anchorEl);

async function notificationData() {
    let responseData = await (getNoticationData())
    let messagesData = responseData?.data?.data?.messages ? responseData?.data?.data?.messages : []
    setMessages(messagesData)
    let badge = responseData?.data?.data?.messages ? responseData?.data?.data?.messages.length : 0
    setbadgeCount(badge)
    }

 useEffect(() => {
    notificationData();
  }, []);

  const handleClickOpen = (title,content) => {
    setMessageTitle(title)
    setMessageContent(content)
    setOpenDialog(true);
  };
  
  const handleClose1 = () => {
    setOpenDialog(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

return (
    <div>
<IconButton aria-label="show 17 new notifications" color="inherit" onClick={handleClick}>
<Badge classes={{ badge: classes.customBadge }} badgeContent={ badgeCount? badgeCount : 0}>
    <NotificationsIcon />
</Badge>
</IconButton>

        < Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        style={{top:"4%"}}
      >
     {  messages.length? 
        messages.map((val,index) => (
        <MenuItem key={index} onClick={() => {handleClickOpen(val.message_title,val.message)}}><span style={{marginRight:"2%" ,color:"#0F4EB3 !important"}} className="material-icons icon-bg-circle brandColorBG small">stars</span> {val.message_title}</MenuItem>
        )) : "No Data"
    
    }
      </Menu>

      <Dialog
        open={openDialog}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        {messageTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" >
            {messageContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      </div>
)

}