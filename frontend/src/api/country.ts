import { gql } from "@apollo/client";

export const queryCountry = gql`
  query Country($code: String!) {
    country(code: $code) {
      id
      code
      name
      emoji
      continent {
        name
      }
    }
  }
`;
