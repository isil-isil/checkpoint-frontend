import { gql } from "@apollo/client";

export const queryCountries = gql`
    query Countries {
        countries {
            id
            code
            name
            emoji
        }
    }
`;