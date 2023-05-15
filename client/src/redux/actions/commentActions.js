import { GLOBALTYPES } from "./globalTypes";
import { POST_TYPES } from "./postActions";
import { deleteAPI, patchAPI, postAPI } from "../../utils/fetchAPI";
import { EditData, DeleteData } from "./globalTypes";
import { createNotify, removeNotify } from "./notifyActions";

export const createComment =
  ({ post, newComment, auth, socket }) =>
  async (dispatch) => {
    const newPost = {
      ...post,
      comments: [...post.comments, newComment],
    };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    try {
      const data = {
        ...newComment,
        postId: post._id,
        postUserId: post.user._id,
      };
      const res = await postAPI("comment", data, auth.token);

      const newData = { ...res.data.newComment, user: auth.user };
      const newPost = {
        ...post,
        comments: [...post.comments, newData],
      };

      socket.emit("createComment", newPost);

      const msg = {
        id: res.data.newComment._id,
        text: newComment.reply
          ? "đã nhắc đến bạn trong một bình luận."
          : "đã bình luận bài viết của bạn.",
        recipients: newComment.reply ? [newComment.tag._id] : [post.user._id],
        url: `/post/${post._id}`,
        content: post.content,
        image: post.images[0].url,
      };

      dispatch(createNotify({ msg, auth, socket }));

      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const likeComment =
  ({ comment, post, auth, socket }) =>
  async (dispatch) => {
    const newComment = { ...comment, likes: [...comment.likes, auth.user] };

    const newComments = EditData(post.comments, comment._id, newComment);

    const newPost = { ...post, comments: newComments };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    socket.emit("likePost", newPost);

    const msg = {
      id: auth.user._id,
      text: "đã thích bình luận của bạn.",
      recipients: [comment.user],
      url: `/post/${post._id}`,
      content: post.content,
      image: post.images[0].url,
    };

    dispatch(createNotify({ msg, auth, socket }));

    try {
      await patchAPI(`comment/${comment._id}/like`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const unLikeComment =
  ({ comment, post, auth, socket }) =>
  async (dispatch) => {
    const newComment = {
      ...comment,
      likes: DeleteData(comment.likes, auth.user._id),
    };

    const newComments = EditData(post.comments, comment._id, newComment);

    const newPost = { ...post, comments: newComments };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    socket.emit("unLikePost", newPost);

    try {
      await patchAPI(`comment/${comment._id}/unlike`, null, auth.token);

      const msg = {
        id: auth.user._id,
        text: "đã thích bình luận của bạn.",
        recipients: [comment.user],
        url: `/post/${post._id}`,
      };

      dispatch(removeNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const deleteComment = 
  ({ post, comment, auth, socket }) => 
  async ( dispatch ) => {
  
    const deleteArr = [...post.comments.filter(cm => cm.reply === comment._id), comment];
    
    const newPost = {
        ...post,
        comments: post.comments.filter(cm => !deleteArr.find(da => cm._id === da._id))
    };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    socket.emit('deleteComment', newPost);
    try {
      deleteArr.forEach(item => {
        deleteAPI(`comment/${item._id}`, auth.token);

        const msg = {
            id: item._id,
            recipients: comment.reply ? [comment.tag._id] : [post.user._id],
            url: `/post/${post._id}`,
        };

        dispatch(removeNotify({msg, auth, socket}));
      })
    } catch (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg} });
    }

  };

export const updateComment = 
  ({ comment, post, auth, updateContent }) => 
  async ( dispatch ) => {
    const newComments = EditData(post.comments, comment._id, {...comment, content: updateContent});
    const newPost = {...post, comments: newComments};
    
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    try {
      patchAPI(`comment/${comment._id}`, { content: updateContent }, auth.token);
    } catch (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg} })
    }
  };
