import ClinicalTrialsList from '../components/ClinicalTrialsList';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';
import {compose,withStateHandlers, lifecycle, withProps} from 'recompose';
import {ClinicalTrialFragment} from "../fragments";

export const GET_CLINICAL_TRIALS_LIST_QUERY = gql`    
    query GET_CLINICAL_TRIALS_LIST ($search: String) {
        getClinicalTrialsList (search: $search) {
            totalCount
            edges {
                ...ClinicalTrialInfo
            }
            pageInfo {
                endCursor
                startCursor
            }
        }
    }
    ${ClinicalTrialFragment}
`;

// 1- add queries:
const withQuery = graphql(
    GET_CLINICAL_TRIALS_LIST_QUERY,
    {
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
                const {getClinicalTrialsList={}} = data;
                const {pageInfo={},edges=[], totalCount=0} = getClinicalTrialsList;
                const {endCursor} = pageInfo;
                return {
                    items: edges,
                    total: totalCount,
                    lastCursor: endCursor,
                    loading: data.loading,
                    // loadByStatus(status) {
                    //     return data.fetchMore({
                    //         // query: ... (you can specify a different query. FEED_QUERY is used by default)
                    //         variables: {
                    //             user_id:ownProps.user_id,
                    //             status:status
                    //         },
                    //         updateQuery: (previousResult, {fetchMoreResult}) => {
                    //             if (!fetchMoreResult) { return previousResult; }
                    //             return fetchMoreResult;
                    //         },
                    //     });
                    // },
                    changePage(lastCursor) {
                        // console.log(lastCursor);
                        // console.log(ownProps);
                        return data.fetchMore({
                            // query: ... (you can specify a different query. FEED_QUERY is used by default)
                            variables: {
                                // We are able to figure out which offset to use because it matches
                                // the feed length, but we could also use state, or the previous
                                // variables to calculate this (see the cursor example below)
                                //page: page,
                                cursors: {after: lastCursor}
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                if (!fetchMoreResult) { return previousResult; }

                                return fetchMoreResult;
                                // return Object.assign({}, previousResult, {
                                //     // Append the new feed results to the old one
                                //     planstore: {plans: [...previousResult.planstore.plans, ...fetchMoreResult.planstore.plans]},
                                // });
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
    withProps(props => {
        const tableRef = React.createRef();
        return {
            tableRef
        }
    }),
    lifecycle({
        componentDidMount() {

            /*const {tableRef} = this.props;
            console.log(tableRef.current);
            tableRef.current.addEventListener('scroll', (event) => {
                  let maxScroll = event.target.scrollHeight - event.target.clientHeight
                  let currentScroll = event.target.scrollTop
                  if (currentScroll === maxScroll) {
                     // load more data
                     console.log('aaaaaa');
                  }
                })*/
            } 
    }),
    withStateHandlers(
        (props) => (
            {
            searchText: '',
        }),
        {        
            onSearch: ({searchText},props) =>(value) => (
                {
                    searchText: value.target.value,
                    items: props.items.map((record) => {
                        const match = record.title.match(new RegExp(value.target.value, 'gi'));
                        if (!match) {
                            return null;
                        }                        
                        return {
                            ...record,
                            title: (
                                <span>
                      {record.title.split( new RegExp(value.target.value, 'gi')).map((text, i) => (
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
                    items:props.items
                     })
            })        

);
export default enhance(ClinicalTrialsList);