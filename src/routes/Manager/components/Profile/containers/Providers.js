import React from 'react';
import Providers from '../components/Providers';
import {compose, withState, withStateHandlers} from 'recompose';
import { graphql } from 'react-apollo';
import moment from 'moment';
import gql from 'graphql-tag';
import {UserInfoFragment} from "../../../../User/fragments";
const dateFormat = 'YYYY/MM/DD';
const fakeData = [{id:1,provider:{id:1,"name":"bbqbbb"},sender:{},joinedDate:moment("2018/06/01", dateFormat)},
{id:2,provider:{id:2,"name":"aaafaa"},sender:{},joinedDate:moment("2018/06/05", dateFormat)},
{id:3,provider:{id:3,"name":"ccgccc"},sender:{},joinedDate:moment("2018/06/15", dateFormat)}];

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
        return {loading: data.loading, providers:fakeData }
    },
});

const enhance = compose(
    withQuery,
    withStateHandlers(
        (props) => ({
            searchText: ''
        }),
        {
            onInputChange: ({searchText})=>(value) => ({ 
                searchText: value.target.value 
            }),
            onSearch: ({searchText}) =>(value) => ({
                    filterDropdownVisible: false,
                    filtered: !!searchText,
                    providers: fakeData.map((record) => {
                        const match = record.provider.name.match(new RegExp(searchText, 'gi'));
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
            }),
            onChange: ({searchText}) =>(date, dateString)=> ({
                providers: fakeData.map((record) => {
                        return {
                            ...record,
                            joinedDate:(
                                (record.joinedDate > dateString[0] && record.joinedDate < dateString[1])? record.date : null
                            ),
                        };
                    }).filter((data)=>{return data.date != null}),
           })
            })        

);

export default enhance(Providers);