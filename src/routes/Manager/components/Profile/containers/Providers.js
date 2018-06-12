import Providers from '../components/Providers';
import React from 'react';
import {compose,withStateHandlers} from 'recompose';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {UserInfoFragment} from "../../../../User/fragments";
const faceData = [{id:1,provider:{id:1,"name":"bbqbbb"},sender:{},joinedDate:"2016-01-01"},
{id:2,provider:{id:2,"name":"aaafaa"},sender:{},joinedDate:"2016-02-01"},
{id:3,provider:{id:3,"name":"ccgccc"},sender:{},joinedDate:"2016-02-01"}];

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
        return {loading: data.loading, providers:faceData }
    },
});

const enhance = compose(
    withQuery,
    withStateHandlers(
        (props) => ({
            searchText: '',
            data:faceData
        }),
        {
            onInputChange: ({searchText})=>(value) => ({ 
                searchText: value.target.value 
            }),
            onSearch: ({searchText}) =>(value) => ({
        
                    filterDropdownVisible: false,
                    filtered: !!searchText,
                    data: faceData.map((record) => {
                        const match = record.provider.name.match(new RegExp(searchText, 'gi'));
                        console.log(match,new RegExp(searchText, 'gi'));
                        if (!match) {
                            return null;
                        }
                        return {
                            ...record,
                            name: (
                                <span>
                      {record.provider.name.split( new RegExp(searchText, 'gi')).map((text, i) => (
                      i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                      ))}
                    </span>
                            ),
                        };
                    }).filter(record => !!record),
            })
            })        
);

export default enhance(Providers);