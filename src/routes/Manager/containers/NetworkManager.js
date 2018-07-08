import NetworkManager from '../components/NetworkManager';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {compose,withStateHandlers} from 'recompose';
import React from 'react';

export const GET_NETWORK_MANAGERS_LIST  = gql`
query GET_NETWORKSTAFF($search: String, $role: RoleEnum!, $cursors: CursorInput, $status: RoleStatusEnum) {
    management {
      getNetworkStaff(search: $search, role: $role, cursors: $cursors, status: $status) {
        totalCount
        edges {
          id
          role
          roleTitle
          startDate
          joinedDate
          lastLoginDate
          invitedDate
          accessLevel
          user {
            id
            firstName
            lastName
            fullName
            phone{
              code
              number
            }
          }
          getTotalPatients
        }
      }
    }
  }
  
 `;

const withQuery = graphql(GET_NETWORK_MANAGERS_LIST, {
    options: (ownProps) => {
        return{
            variables: {
                search:'',
                role:'manager',
                status:'active',  
            }
        }
    },
    props: ({ownProps, data }) => {
        if (!data.loading) {
            return {
                management: data.management.getNetworkStaff.edges,
                totalCount: data.management.getNetworkStaff.totalCount,
                loadByStatus(status) {
                    console.log(status);
                    return data.fetchMore({
                        // query: ... (you can specify a different query. FEED_QUERY is used by default)
                        variables: {
                            status:"pending"
                        },
                        updateQuery: (previousResult, {fetchMoreResult}) => {
                            if (!fetchMoreResult) { return previousResult; }
                            return fetchMoreResult;
                        },
                    });
                },
            //     loadByStatus:({searchText},props) =>(value) => (
            //         {
            //         management: data.fetchMore({
            //             // query: ... (you can specify a different query. FEED_QUERY is used by default)
            //             variables: {
            //                 status:value
            //             },
            //             updateQuery: (previousResult, {fetchMoreResult}) => {
            //                 if (!fetchMoreResult) { return previousResult; }
            //                 return fetchMoreResult;
            //             },
            //         })
            //     }
            // ),
                testq:  () =>(console.log("===========pasha======")),
                loading: data.loading,
               
                loadMoreEntries() {
            
                    return data.fetchMore({
                        // query: ... (you can specify a different query. FEED_QUERY is used by default)
                        variables: {
                            // We are able to figure out which offset to use because it matches
                            // the feed length, but we could also use state, or the previous
                            // variables to calculate this (see the cursor example below)
                            page: ownProps.page+1,
                        },
                        updateQuery: (previousResult, {fetchMoreResult}) => {
                            if (!fetchMoreResult) { return previousResult; }
            
                            return fetchMoreResult;
                            return Object.assign({}, previousResult, {
                                // Append the new feed results to the old one
                                planstore: {plans: [...previousResult.planstore.plans, ...fetchMoreResult.planstore.plans]},
                            });
                        },
                    });
                }
            }
        }
        else {
            return {loading: data.loading}
        }
    },
   
});

const enhance = compose(
    withQuery,
    withStateHandlers(
        (props) => ({
        showButton: false,
        selectedCount:0,
        searchText: '',
        }),
        {
            openShowButton: ({ counter }) => (value) => ({
                showButton: true,
                selectedCount:value
            }),
            hideShowButton: ({ counter }) => (value) => ({
                showButton: false
            }),
            onSearch: ({searchText},props) =>(value) => (
                {
                    searchText: value.target.value,
                    management: props.management.map((record) => {
                        console.log(record);
                        const match = record.user.fullName.match(new RegExp(value.target.value, 'gi'));
                        if (!match) {
                            return null;
                        }                        
                        return {
                            ...record,
                            fullName: (
                                <span>
                      {record.user.fullName.split( new RegExp(value.target.value, 'gi')).map((text, i) => (
                      i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                      ))}
                    </span>
                            ),
                        };
                    }).filter(record => !!record),
            }),
            emitEmpty:({searchText},props) =>(value) => (
                {
                    searchText: '',
                    management:props.management
                     })

        }
        )
);

export default enhance(NetworkManager);