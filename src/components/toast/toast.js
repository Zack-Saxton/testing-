
import {  toast } from "react-toastify";
import "./toast.css";
const message_position = "bottom-center";
const msg_show_time = 2500;
/*****
 *          Display Error Message
 *                                  *****/
export async function Error(Message) {
  if (!toast.isActive("closeToast")) {
    toast.error(Message, {
      position: message_position,
      autoClose: msg_show_time,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "message_box",
      
      
      // onClose: Close,
    });
  }
}
/*****
 *        Display Success Message
 *                                    *****/
export async function Success(Message) {
  if (!toast.isActive("closeToast")) {
    toast.success(Message, {
      position: message_position,
      autoClose: msg_show_time,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "message_box",
    });
  }
}
/*****
 *          Display Warning  Message
 *                                      *****/
export async function Warning(Message) {
  if (!toast.isActive("closeToast")) {
    toast.warning(Message, {
      position: message_position,
      autoClose: msg_show_time,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "message_box",
    });
  }
}
/*****
 *          Display Information  Message
 *                                      *****/
export async function Info(Message) {
  if (!toast.isActive("closeToast")) {
    toast.info(Message, {
      position: message_position,
      autoClose: msg_show_time,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "message_box",
    });
  }
}
