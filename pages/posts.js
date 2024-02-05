import Layout from "@components/Layout";
import CardPost from "@components/CardPost";
import Container from "@components/Container";
import mockPosts from "../utils/posts";
import { useEffect, useState } from "react";
import SectionHeader from "@components/SectionHeader";
import Head from "next/head";
import { collection, getDocs } from "firebase/firestore";
import { db } from "config/firebase";
export default function Posts() {
  const [posts, setPosts] = useState(mockPosts);
  const [postsList, setPostsList] = useState([]);
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
  console.log(postsList);
  return (
    <Layout>
      <Head>
        <title>Posts &mdash; WebNextjs</title>
      </Head>
      <Container>
        <SectionHeader>All Posts</SectionHeader>
        {!postsList.length ? (
          <div className="text-center py-20">
            <h2 className="text-6xl">No result 😥</h2>
            <p className="text-xl mt-4 text-white/60 md:w-6/12 w-full mx-auto">
              We couldn’t find any posts with the keyword `yahahahayuk`. Please
              try another keyword.
            </p>
          </div>
        ) : (
          <div className="flex -mx-4 flex-wrap mt-6">
            {postsList.map((post) => (
              <div key={post.id} className="md:w-4/12 w-full px-4 py-6">
                <CardPost {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </Layout>
  );
}
