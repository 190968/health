import React from 'react';
import Providers from '../components/Providers';
import {compose, withState, withStateHandlers} from 'recompose';
import { graphql } from 'react-apollo';
import moment from 'moment';
import gql from 'graphql-tag';
import {UserInfoFragment} from "../../../../User/fragments";
const dateFormat = 'YYYY/MM/DD';
const fakeData = [];

const GET_PROVIDERS_QUERY  = gql`
 query GET_USER_PROVIDERS($user_id:UID) {
  patient(id: $user_id) {
     id
     getProviders {
         edges {
            id
            provider {
                id
                name
            }
            sender {
                ...UserInfo
            }
            joinedDate
        }
     }
  }
}

${UserInfoFragment}
`;

const withQuery = graphql(GET_PROVIDERS_QUERY, {
    options: (ownProps) => {
        return{
            variables: {
                user_id:ownProps.user.id
            }
        }
    },
    props: ({ data }) => {
        const {patient={}} = data;
        const {getProviders={}} = patient;
        const {edges=[]} = getProviders;
        return {loading: data.loading, providers:edges }
    },
});

const enhance = compose(
    withQuery,
    withStateHandlers(
        {        
            // onSearch: onSearch
        //     onChange: ({searchText}) =>(date, dateString)=> ({
        //         providers: fakeData.map((record) => {
        //                 return {
        //                     ...record,
        //                     joinedDate:(
        //                         (record.joinedDate > dateString[0] && record.joinedDate < dateString[1])? record.date : null
        //                     ),
        //                 };
        //             }).filter((data)=>{return data.date != null}),
        //    })
            })        

);

export default enhance(Providers);