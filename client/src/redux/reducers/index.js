import { combineReducers } from "redux";
import auth from "./authReducer";
import homePosts from "./postReducer";
import profile from "./profileReducer";
import alert from "./alertReducer";
import explore from "./exploreReducer";
import detailPost from "./detailPostReducer";
import suggestions from "./suggestionsReducer";
import notify from "./notifyReducer";
import socket from "./socketReducer";
import message from "./messageReducer";
import online from "./onlineReducer";
import status from "./statusReducer";
import confirmModal from "./confirmModalReducer";
import updateCmt from "./updateCommentReducer";
import peer from "./peerReducer";
import call from "./callReducer";

export default combineReducers({
  auth,
  homePosts,
  profile,
  alert,
  explore,
  detailPost,
  suggestions,
  notify,
  socket,
  message,
  online,
  status,
  confirmModal,
  updateCmt,
  peer,
  call,
});
