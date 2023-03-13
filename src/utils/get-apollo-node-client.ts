import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";
import fetch from "cross-fetch";

export const getApolloNodeClient = (uri: string) => {
  const apolloClient = new ApolloClient({
    link: new HttpLink({
      uri,
      fetch,
    }),
    cache: new InMemoryCache(),
  });

  return apolloClient;
};
