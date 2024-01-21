import { gql } from '@apollo/client';

export const QUERY_FILES = gql`
  query savedFiles($_id: ID) {
    savedFiles(_id: $_id) {
      savedWork {
        question
        solution
      }
    }
  }
`;

export const QUERY_USER =gql`

query oneUser($email: String!){
    oneUser(email:$email){
        email
        username

    }
}

`
