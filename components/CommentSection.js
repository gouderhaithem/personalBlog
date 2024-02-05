// CommentSection.js
import React, { useEffect, useState } from "react";
import { db } from "config/firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import styles from "../styles/comment.module.css";
import { auth } from "config/firebase";
import moment from "moment";
import { toast } from "react-hot-toast";
import SingleComment from "./SingleComment";
import { useRouter } from "next/router";

const CommentSection = ({ postid }) => {
  const router = useRouter();
  const loginNotify = () => {
    toast.error("You have to log in first to comment ", {});
    router.push("/auth/login", { scroll: false });
  };
  const notify = () => {
    toast.success("New comment added");
  };

  const [commentsList, setCommentsList] = useState([]);
  const [newPostComment, setNewPostComment] = useState("");
  const commentsCollectionRef = collection(db, "comments");

  const fetchCommentsList = async (callback) => {
    try {
      const q = query(commentsCollectionRef, where("postid", "==", postid));
      const querySnapshot = await getDocs(q);
      const comments = [];
      querySnapshot.forEach((doc) => {
        comments.push({ id: doc.id, ...doc.data() });
      });
      // Sort comments by date before setting the state
      const sortedComments = comments.sort((a, b) => {
        return moment(b.date).diff(moment(a.date));
      });
      setCommentsList(sortedComments);
      if (callback) {
        callback(); // Callback to update any component after fetching comments
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    if (postid) {
      fetchCommentsList();
    }
  }, [postid]);

  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const onSubmitComment = async () => {
    try {
      if (!user) {
        loginNotify(); // Redirect to the login page when currentUser is null

        return;
      }
      await addDoc(commentsCollectionRef, {
        userid: user.uid,
        postid,
        userName: user.displayName,
        userImg: user.photoURL,
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        text: newPostComment,
      });
      fetchCommentsList();
      setNewPostComment("");
      notify();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="md:w-10/12 w-full mx-auto my-10">
      <div className={styles.addcomment}>
        <div className={styles.typingTextarea}>
          <textarea
            className={styles.typingTextarea2}
            id="chat-input"
            spellCheck="false"
            placeholder="Enter your comment here"
            value={newPostComment}
            onChange={(e) => setNewPostComment(e.target.value)}
            required
          ></textarea>
          <span
            id="send-btn"
            onClick={onSubmitComment}
            className={styles.span1}
          >
            <img
              style={{ width: "25px", height: "25px" }}
              src="/send.png"
              alt=""
            />
          </span>
        </div>
      </div>

      <div className={styles.allcomments}>
        {commentsList.map((singleComment) => (
          <SingleComment
            key={singleComment.id}
            comment={singleComment}
            fetchCommentsList={fetchCommentsList} // Pass the callback function
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
