// SingleComment.js
import React, { useState, useEffect } from "react";
import styles from "../styles/comment.module.css";
import moment from "moment";
import { auth, db } from "config/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import PostsAuthor from "./PostsAuthor";

const SingleComment = ({ comment, fetchCommentsList }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);
  const notify = () => {
    toast.success("comment deleted successfuly");
  };

  const deleteComment = async (id) => {
    const commentDoc = doc(db, "comments", id);
    await deleteDoc(commentDoc);
    fetchCommentsList(); // Trigger the fetching of updated comment list
    notify();
  };

  return (
    <div className={styles.commentcontainer}>
      {/*<div className={styles.user}>
        <img alt="avatar" src={comment.userImg} />
        <div className={styles.info}>
          <span id="logo">{comment.userName}</span>
          <p>{moment(comment.date).fromNow()}</p>
        </div>
      </div>*/}
      <PostsAuthor
        authorAvatar={comment.userImg ? comment.userImg : "/avatar1.png"}
        authorName={comment.userName}
        authorJob={moment(comment.date).fromNow()}
      />

      <div className={styles.singlecomment}>{comment.text}</div>
      {user && user.uid === comment.userid && (
        <span
          className={styles.deleteIcon}
          onClick={() => {
            const shouldDelete = window.confirm(
              "Are you sure you want to delete this comment?"
            );
            if (shouldDelete) {
              deleteComment(comment.id);
            }
          }}
        >
          🗑️
        </span>
      )}
    </div>
  );
};

export default SingleComment;
