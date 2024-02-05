import Container from "@components/Container";
import Layout from "@components/Layout";
import PostsMetaTitle from "@components/PostsMetaTitle";
import PostsAuthor from "@components/PostsAuthor";
import Head from "next/head";
import CommentSection from "@components/CommentSection";

export default function Details() {
  return (
    <Layout>
      <Head>
        <title>Details &mdash; WebNextjs</title>
      </Head>
      <Container>
        <div className="md:w-6/12 w-full mx-auto flex items-center flex-col">
          <PostsMetaTitle
            category="UI DESIGN"
            title="Understanding color theory: the color wheel and finding complementary colors"
            date="July 2, 2021"
            center
          />
          <PostsAuthor
            authorAvatar="/author1.png"
            authorName="Leslie Alexander"
            authorJob="UI DESIGN"
          />
        </div>
        <div className="md:w-10/12 w-full mx-auto my-10">
          {/*post images */}
          <img src="/details-image.png" className="w-full rounded-lg" />
        </div>
        <div className="md:w-8/12 w-full mx-auto leading-relaxed">
          {/*text descreption */}
        </div>
        <CommentSection />
      </Container>
    </Layout>
  );
}
