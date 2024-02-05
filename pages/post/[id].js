import Container from "@components/Container";
import Layout from "@components/Layout";
import PostsMetaTitle from "@components/PostsMetaTitle";
import PostsAuthor from "@components/PostsAuthor";
import Head from "next/head";
import CommentSection from "@components/CommentSection";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "config/firebase";
import moment from "moment/moment";

export default function SinglePst() {
  const router = useRouter();
  const { id } = router.query;
  const [postDetail, setPostDetail] = useState(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const postDocRef = doc(db, "posts", id);
        const postSnapshot = await getDoc(postDocRef);
        if (postSnapshot.exists()) {
          setPostDetail({ id: postSnapshot.id, ...postSnapshot.data() });
        } else {
          console.log("Document not found");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    if (id) {
      fetchPostDetail();
    }
  }, [id]);

  return (
    <Layout>
      <Head>
        <title>Details &mdash; WebNextjs</title>
      </Head>
      <Container>
        {postDetail ? (
          <>
            <div className="md:w-6/12 w-full mx-auto flex items-center flex-col">
              <PostsMetaTitle
                category={postDetail.category}
                title={postDetail.title}
                date={moment(postDetail.date).fromNow()}
                center
              />
              <PostsAuthor
                authorAvatar="/avatar1.png"
                authorName="Gouder Haithem"
                authorJob="Author"
              />
            </div>
            <div className="md:w-10/12 w-full mx-auto my-10">
              {postDetail.images && postDetail.images.length > 0 && (
                <img src={postDetail.images[0]} className="w-full rounded-lg" />
              )}
            </div>
            <div className="md:w-10/12 w-full mx-auto leading-relaxed">
              {postDetail.description}
            </div>
            <CommentSection postid={id} />
          </>
        ) : (
          <div>Loading...</div>
        )}
      </Container>
    </Layout>
  );
}
