import buildClient from "../api/build-client";

export default function Home({currentUser}) {
  return currentUser ? <h1>You are signed in!</h1> : <h1>You aren't signed in!</h1>
}

Home.getInitialProps = async ({ req }) => {
  const client = buildClient({ req });
  const { data } = await client.get("/api/users/currentuser");

  return data;
};