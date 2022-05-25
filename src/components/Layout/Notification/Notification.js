
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { CircularProgress } from '@mui/material';
import Badge from "@mui/material/Badge";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grow from '@mui/material/Grow';
import IconButton from "@mui/material/IconButton";
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import { makeStyles } from "@mui/styles";
import React, { useEffect, useRef, useState } from "react";
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
  const [ openDialog, setOpenDialog ] = useState(false);
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


  const [ option, setOpenOption ] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpenOption((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenOption(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(option);
  useEffect(() => {
    if (prevOpen.current === true && option === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = option;
  }, [ option ]);


  //View
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <div>

          <IconButton
          data-testid='BellButton'
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            className="noPaddingIcon" aria-label="show 17 new notifications"
          // onClick={ handleClick }
          >
            <Badge overlap="rectangular" classes={{ badge: classes.customBadge }} badgeContent={badgeCount ? badgeCount : 0}>
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>


          <Popper
            open={option}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start"
                      ? "left top"
                      : "left bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <div id="notification-menu">
                      {messages.length ?
                        messages.map((val, index) => (
                          val.message_id ?
                            <MenuItem key={index} className={val?.active ? "notificationMenuItem" : "notificationMenuItemNormal"} onClick={() => { handleClickOpen(val.message_id.message_title, val.message_id.message, val.message_id._id, val.active); }}>
                              <span id="spanNotificationMenu" className="material-icons icon-bg-circle brandColorBG small">stars</span> {val?.message_id.message_title}</MenuItem>
                            : <MenuItem> You have no New Notifications </MenuItem>)) : <MenuItem> You have no New Notifications</MenuItem>
                      }
                    </div>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>

      </Stack>



      <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {messageTitle}
        </DialogTitle>
        <DialogContent className="notificationDialogContent">
          <DialogContentText id="alert-dialog-description" >
            {messageContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {loading ? <CircularProgress className="notificationCircular" /> :
            <>
              <ButtonSecondary
                stylebutton='{"background": "", "color":"" }'
                onClick={handleDelete}
                autoFocus
                disabled={messageDelLoading}
              >
                Delete
                <i
                  className="fa fa-refresh fa-spin customSpinner"
                  style={{
                    marginRight: "10px",
                    color: "blue",
                    display: messageDelLoading ? "block" : "none",
                  }}
                />
              </ButtonSecondary>
              <ButtonPrimary stylebutton='{"background": "", "color":"" }' onClick={handleCloseDialog}>
                OK
              </ButtonPrimary> </>}

        </DialogActions>
      </Dialog>
    </div>
  );

}