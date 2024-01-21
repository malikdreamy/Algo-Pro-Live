import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!){
    login(email:$email, password:$password){
        token
        user{
            _id
            
        }
    }
}

`


export const ADD_USER = gql`
mutation addUser($email:String!,$password:String!, $username: String,){
    addUser(email:$email,password:$password, username: $username){
     token
     user{
            _id
            
        }
    }
}
`

export const SAVE_WORK = gql`
mutation saveWork($solutionData: WorkInput!){
    saveWork(solutionData: $solutionData){
        username
    }
}
`

export const REMOVE_WORK = gql`
mutation removeWork($id: ID){
    removeWork(_id: $id){
        username
    }
}`



export const UPDATE_USERNAME =gql`
mutation updateUsername($username:String!){
    updateUsername(username:$username){
        username
        email
    }
}


`


