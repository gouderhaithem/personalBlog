import Container from "@components/Container";
import Layout from "@components/Layout";
import { LoginComponent } from "@components/LoginComponent";
import Head from "next/head";

export default function login() {
  return (
    <Layout>
      <Head>
        <title>Auth &mdash; Login</title>
      </Head>
      <Container>
        <LoginComponent />
      </Container>
    </Layout>
  );
}
