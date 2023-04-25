import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

let client: ApolloClient<any> | null = null;

const SPACE = process.env.NEXT_PUBLIC_SPACE;
const TOKEN = process.env.NEXT_PUBLIC_TOKEN;
const URL = `https://graphql.contentful.com/content/v1/spaces/${SPACE}`;

const link = new HttpLink({
  uri: URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

const cache = new InMemoryCache();

export const getClient = () => {
  if (!client || typeof window === "undefined") {
    client = new ApolloClient({
      link,
      cache,
    });
  }

  return client;
};
