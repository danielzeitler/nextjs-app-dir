import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

let client: ApolloClient<any> | null = null;

const SPACE = "0cfjh78xn2oy";
const TOKEN = "sZ8NV-Z7ryN-hS1MclJcCM1mv-1HcRxgyLesSlh7WUQ";
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
