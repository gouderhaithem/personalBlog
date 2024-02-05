import React, { useEffect, useState } from "react";
import { db, storage } from "../config/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import moment from "moment";
import { v4 } from "uuid";
import { toast } from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const CreatePost = () => {
  const [postsList, setPostsList] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // New posts States
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("");
  const [newPostDesc, setNewPostDesc] = useState("");
  const [newPostImg, setNewPostImg] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  const getPostsList = async () => {
    try {
      const data = await getDocs(postsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPostsList(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPostsList();
  }, []);

  const notify = () => {
    toast.success("New post created");
  };

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleRemoveFile = (fileToRemove) => {
    setSelectedFiles(selectedFiles.filter((file) => file !== fileToRemove));
    setNewPostImg(newPostImg.filter((url) => url !== fileToRemove));
  };

  const addPost = async () => {
    try {
      // Check if any image has been uploaded
      if (selectedFiles.length === 0) {
        console.log("Please upload at least one image before submitting.");
        return;
      }

      // Upload each image to storage inside the folder "postImage"
      const uploadPromises = selectedFiles.map(async (file) => {
        const imgRef = ref(storage, `postImage/${v4()}`);
        await uploadBytes(imgRef, file);
        return getDownloadURL(imgRef);
      });

      // Get the download URLs of the uploaded images
      const downloadURLs = await Promise.all(uploadPromises);

      // Add post to Firestore with the download URLs of images
      await addDoc(postsCollectionRef, {
        title: newPostTitle,
        category: newPostCategory,
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        description: newPostDesc,
        images: downloadURLs,
      });
      notify();

      // Clear the form and selected files
      setNewPostTitle("");
      setNewPostCategory("");
      setNewPostDesc("");
      setSelectedFiles([]);
      setNewPostImg([]);

      // Reset the file input value
      const fileInput = document.getElementById("fileInput");
      if (fileInput) {
        fileInput.value = ""; // This will clear the file input
      }

      // Refresh the posts list
      getPostsList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <center>
      <div>
        <input
          value={newPostTitle}
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="post title..."
          onChange={(e) => setNewPostTitle(e.target.value)}
        />

        <select
          id="countries"
          class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
          onChange={(e) => setNewPostCategory(e.target.value)}
        >
          <option value="" disabled selected>
            Select Category
          </option>
          <option value="history">History</option>
          <option value="news">News</option>
          <option value="record">Secord Breaking</option>
          <option value="statistics">Statistics</option>
        </select>

        <textarea
          value={newPostDesc}
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Post Description..."
          onChange={(e) => setNewPostDesc(e.target.value)}
        />

        <div>
          <input
            id="fileInput"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            type="file"
            onChange={(e) => handleUpload(e)}
            multiple
            accept="image/*"
          />

          {selectedFiles.length > 0 && (
            <div>
              <h2>Selected Files:</h2>
              <ul>
                {selectedFiles.map((file, index) => (
                  <li key={index}>
                    {file.name}{" "}
                    <button onClick={() => handleRemoveFile(file)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <br />
        <br />

        <button
          onClick={addPost}
          className="w-full mt-8 px-4 py-2 tracking-wide text-white transition-colors duration-200  bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
        >
          {" "}
          Submit Post
        </button>
      </div>
    </center>
  );
};

export default CreatePost;
