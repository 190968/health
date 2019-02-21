import React from 'react';
import Team from '../components/Team';
import {compose,withStateHandlers, withHandlers} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {UserInfoFragment} from "../../../../User/fragments";
import { PhoneInfoFragment } from '../../../../../components/FormCustomFields/components/Phone/fragments';

export const GET_CARETEAM_QUERY  = gql`
 query GET_USER_TEAM($user_id:UID, $status: String) {
  patient(id: $user_id) {
     id
     motivation {
        careTeam (status: $status) {
            totalCount,
            edges {
                id
                user {
                    ...UserInfo
                    phone {
                        ...PhoneInfo
                    }
                }
                objectId
                joinedDate
                roleText
            }
        }
     }
  }
}

${UserInfoFragment}
${PhoneInfoFragment}
`;

const withQuery = graphql(GET_CARETEAM_QUERY, {
    options: (ownProps) => {
        return{
            variables: {
                user_id:ownProps.user.id
            },
            fetchPolicy: 'network_only',
        }
    },
    props: ({ data }) => {

        const {patient={}} = data;
        const {motivation={}} = patient;
        const {careTeam={}} = motivation;
        const {edges=[]} = careTeam;

        return {loading: data.loading, members:edges, refetch:data.refetch, changeStatus(status) {
            return data.refetch({status});
        } }
    },
});



const enhance = compose(
    withQuery,
    withStateHandlers(
        (props) => (
            {
            searchText: '',
        }),
        {        
            onSearch: ({searchText},props) =>(value) => (
                {
                    searchText: value.target.value,
                    members: props.members.map((record) => {
                        console.log(record);
                        const match = record.user.fullName.match(new RegExp(searchText, 'gi'));
                        if (!match) {
                            return null;
                        }                        
                        return {
                            ...record,
                            fullName: (
                                <span>
                      {record.user.fullName.split( new RegExp(searchText, 'gi')).map((text, i) => (
                      i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                      ))}
                    </span>
                            ),
                        };
                    }).filter(record => !!record),
            }),
            emitEmpty: ({searchText}) =>(value) => (
                {
                    searchText: ''
                     })
            }),
            withHandlers({
                handleStatus: props => (e) => {
                    const status = e.target.value;
                    props.changeStatus(status);
                }
            })  

);

export default enhance(Team);