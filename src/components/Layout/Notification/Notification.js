
import { CircularProgress } from '@mui/material';
import Badge from "@mui/material/Badge";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from "@mui/material/IconButton";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from "@mui/styles";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import { getNoticationData, setUnread } from "../../Controllers/NotificationController";
import { ButtonPrimary, ButtonSecondary } from "../../FormsUI";
import "../AppBar/SideNav.css";

//Material UI css class
const useStyles = makeStyles(() => ({
  customBadge: {
    backgroundColor: "#ffd524",
    color: "black",
  },
}));

export default function Notification() {
  const classes = useStyles();
  const [ anchorEl, setAnchorEl ] = useState(null);
  const [ messages, setMessages ] = useState([]);
  const [ badgeCount, setbadgeCount ] = useState(0);
  const [ openDialog, setOpenDialog ] = React.useState(false);
  const [ messageTitle, setMessageTitle ] = useState([]);
  const [ messageContent, setMessageContent ] = useState([]);
  const [ notificationId, setNotificationId ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ messageDelLoading, setmessageDelLoading ] = useState(false);
  const [ id, setID ] = useState('');
  const open = Boolean(anchorEl);
  const { data: notificationResponse, refetch } = useQuery('notification', getNoticationData);

  useEffect(() => {
    if (notificationResponse) {
      let messagesData = notificationResponse?.data?.notificationsToShow ? notificationResponse?.data?.notificationsToShow.message_data : [];
      setMessages(messagesData);
      setNotificationId(notificationResponse?.data?.notificationsToShow ? notificationResponse?.data?.notificationsToShow._id : '');
      let badge = notificationResponse?.data?.user ? notificationResponse?.data?.user?.extensionattributes?.unread_messages : 0;
      setbadgeCount(badge);
      setLoading(false);
      setmessageDelLoading(false);
    }
    return () => {
      setMessages({});
      setNotificationId({});
      setbadgeCount({});
    };
  }, [ notificationResponse ]);

  //Open Notification content popup
  const handleClickOpen = async (title, content, mid, active) => {
    setOpenDialog(true);
    setMessageTitle(title);
    setMessageContent(content);
    setID(mid);
    if (active) {
      setOpenDialog(true);
      setLoading(true);
      await setUnread(notificationId, mid, false);
      refetch();
    }
  };

  //Close Notification content popup
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  //Notification delete
  const handleDelete = async () => {
    setmessageDelLoading(true);
    await setUnread(notificationId, id, true);
    refetch();
    setOpenDialog(false);
  };

  //Menu close
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Badge onclick
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //View
  return (
    <div>
      <IconButton className="noPaddingIcon" aria-label="show 17 new notifications" onClick={ handleClick }>
        <Badge classes={ { badge: classes.customBadge } } badgeContent={ badgeCount ? badgeCount : 0 }>
          <NotificationsNoneIcon />
        </Badge>
      </IconButton>

      < Menu id="notification-menu" anchorEl={ anchorEl } open={ open } onClose={ handleClose } MenuListProps={ { 'aria-labelledby': 'basic-button' } } style={ { top: "4%", minWidth: "200px" } } >
        { messages.length ?
          messages.map((val, index) => (
            val.message_id ?
              <MenuItem key={ index } style={ val?.active ? { fontWeight: "bold" } : { fontWeight: "normal", minWidth: "200px" } } onClick={ () => { handleClickOpen(val.message_id.message_title, val.message_id.message, val.message_id._id, val.active); } }><span
                style={ { marginRight: "2%", background: "#0F4EB3 !important" } }
                className="material-icons icon-bg-circle brandColorBG small">stars</span> { val?.message_id.message_title }</MenuItem>
              : <MenuItem> You have no New Notifications </MenuItem>)) : <MenuItem> You have no New Notifications</MenuItem>
        }
      </Menu>
      <Dialog open={ openDialog } onClose={ handleCloseDialog } aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          { messageTitle }
        </DialogTitle>
        <DialogContent style={ { textAlign: 'justify' } }>
          <DialogContentText id="alert-dialog-description" >
            { messageContent }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          { loading ? <CircularProgress style={ { width: "25px", height: "25px", marginRight: "31px" } } /> :
            <>
              <ButtonSecondary
                stylebutton='{"background": "", "color":"" }'
                onClick={ handleDelete }
                autoFocus
                disabled={ messageDelLoading }
              >
                Delete
                <i
                  className="fa fa-refresh fa-spin customSpinner"
                  style={ {
                    marginRight: "10px",
                    color: "blue",
                    display: messageDelLoading ? "block" : "none",
                  } }
                />
              </ButtonSecondary>
              <ButtonPrimary stylebutton='{"background": "", "color":"" }' onClick={ handleCloseDialog }>
                Ok
              </ButtonPrimary> </> }

        </DialogActions>
      </Dialog>
    </div>
  );

}