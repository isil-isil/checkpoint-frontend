import { gql } from "@apollo/client";

export const queryContinents = gql`
  query Continents {
    continents {
      id
      name
    }
  }
`;