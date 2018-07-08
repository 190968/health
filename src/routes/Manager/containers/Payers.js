import Payers from '../components/Payers';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';
import {compose,withStateHandlers} from 'recompose';
export const GET_CANCER_STAGES_QUERY = gql`    
query GET_PAYERS {
    getPayers {
        totalCount
        edges {
            id
            name
            code
        }
    }
}
`;

// 1- add queries:
const withQuery = graphql(
    GET_CANCER_STAGES_QUERY,
    {
        //name: 'PlanstorePlans',
        options: (ownProps) => {
            return {
                //skip: !ownProps.ready,
                /*variables: {
                    user_id: ownProps.user_id,
                    status: 'active'
                    //date:ownProps.date
                },*/
                fetchPolicy: 'network-only'
            }

        },
        props: ({ ownProps, data }) => {
            if (!data.loading) {

                return {
                    getPayers: data.getPayers.edges,
                    total: data.getPayers.totalCount,
                    loading: data.loading,
                    loadByStatus(status) {
                        return data.fetchMore({
                            // query: ... (you can specify a different query. FEED_QUERY is used by default)
                            variables: {
                                user_id:ownProps.user_id,
                                status:status
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                if (!fetchMoreResult) { return previousResult; }
                                return fetchMoreResult;
                            },
                        });
                    },
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

            } else {
                return {loading: data.loading}
            }
        },
    }
);

const enhance = compose(
   withQuery,
    withStateHandlers(
        (props) => (
            {
            searchText: '',
            searchTextCode: '',
        }),
        {        
            onSearch: ({searchText},props) =>(value) => (
                {
                    searchText: value.target.value,
                    getPayers: props.getPayers.map((record) => {
                        const match = record.name.match(new RegExp(value.target.value, 'gi'));
                        if (!match) {
                            return null;
                        }                        
                        return {
                            ...record,
                            name: (
                                <span>
                      {record.name.split( new RegExp(value.target.value, 'gi')).map((text, i) => (
                      i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                      ))}
                    </span>
                            ),
                        };
                    }).filter(record => !!record),
            }),
            emitEmpty: ({searchText},props) =>(value) => (
                {
                    searchText: '',
                    getPayers: props.getPayers
                     }),
            onSearchCode: ({searchTextCode},props) =>(value) => (
                        {
                            searchTextCode: value.target.value,
                            getPayers: props.getPayers.map((record) => {
                                const match = record.code.match(new RegExp(value.target.value, 'gi'));
                                if (!match) {
                                    return null;
                                }                        
                                return {
                                    ...record,
                                    code: (
                                        <span>
                              {record.code.split( new RegExp(value.target.value, 'gi')).map((text, i) => (
                              i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                              ))}
                            </span>
                                    ),
                                };
                            }).filter(record => !!record),
                    }),
            emitEmptyCode: ({searchTextCode},props) =>(value) => (
                        {
                            searchTextCode: '',
                            getPayers: props.getPayers
                             })
            })        

);
export default enhance(Payers);