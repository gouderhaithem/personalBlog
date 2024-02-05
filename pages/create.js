import CreatePost from "@components/CreatePost";
import Layout from "@components/Layout";
import Container from "@components/Container";
import Head from "next/head";

export default function Create() {
  return (
    <Layout>
      <Head>
        <title>Posts &mdash; WebNextjs</title>
      </Head>
      <Container>
        <CreatePost />
      </Container>
    </Layout>
  );
}
