import Container from "@components/Container";
import Layout from "@components/Layout";

import { RegisterComponent } from "@components/RegisterComponent";
import Head from "next/head";

export default function signup() {
  return (
    <Layout>
      <Head>
        <title>Auth &mdash; Sign Up</title>
      </Head>
      <Container>
        <RegisterComponent />
      </Container>
    </Layout>
  );
}
