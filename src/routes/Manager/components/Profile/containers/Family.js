import React from 'react';
import Family from '../components/Family';
import { compose, withStateHandlers, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { FamilyMemberInfoFragment } from "../components/Family/fragments";

export const GET_USER_FAMILY_QUERY = gql`
 query GET_USER_FAMILY($user_id:UID, $status: String) {
  patient(id: $user_id) {
     id
     motivation {
        family (status: $status) {
            totalCount,
            edges{
                ...FamilyMemberInfo
            }
        }
     }
  }
}

${FamilyMemberInfoFragment}
`;

const withQuery = graphql(GET_USER_FAMILY_QUERY, {
    options: (ownProps) => {
        return {
            variables: {
                user_id: ownProps.user.id,
                status: 'active'
            }
        }
    },
    props: ({ data }) => {
        //console.log(data);
        const { patient = {}, variables,refetch } = data;
        const { motivation = {} } = patient;
        const { family = {} } = motivation;
        const { edges = [] } = family;
        const {status} = variables || {};

        return {
            loading: data.loading, 
            members: edges, 
            status:status,
            refetch:refetch,
            changeStatus(status) {
                return refetch({ status });
            }
        }
    },
});



const enhance = compose(
    withQuery,
    withHandlers({
        handleStatus: props => (e) => {
            const status = e.target.value;
            props.changeStatus(status);
        }
    }),
    withStateHandlers(
        (props) => (
            {
                searchText: '',
            }),
        {
            onSearch: ({ searchText }, props) => (value) => (
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
                                    {record.user.fullName.split(new RegExp(searchText, 'gi')).map((text, i) => (
                                        i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                                    ))}
                                </span>
                            ),
                        };
                    }).filter(record => !!record),
                }),
            emitEmpty: ({ searchText }) => (value) => (
                {
                    searchText: ''
                })
        })

);


export default enhance(Family);