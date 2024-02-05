import { useEffect, useState } from "react";
import Head from "next/head";

import FeaturePost from "@components/FeaturedPost";
import CardPost from "@components/CardPost";
import Container from "@components/Container";
import Layout from "@components/Layout";
import mockPosts from "../utils/posts.json";
import { collection, getDocs } from "firebase/firestore";
import { db } from "config/firebase";

export default function Home() {
  const [postsList, setPostsList] = useState([]);
  const [posts, setPosts] = useState(mockPosts);
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
  // console.log(postsList);
  return (
    <Layout>
      <Head>
        <title>Home &mdash; KooraNews</title>
      </Head>
      <Container>
        <FeaturePost />
        <div className="flex -mx-4 flex-wrap mt-6">
          {postsList.map((post, index) => (
            <div key={index} className="md:w-4/12 w-full px-4 py-6">
              <CardPost {...post} />
            </div>
          ))}
        </div>
      </Container>
    </Layout>
  );
}
