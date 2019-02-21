import TrackerHistoryPure from '../components/TrackerHistory';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TrackerReportInfoFragment } from '../../../routes/Plan/components/BiometricPlan/fragments';

export const GET_TRACKER_HISTORY_QUERY = gql`    
    query GetTrackerHistory ($id: UID!, $userId:UID!, $date: Date)  {
        trackerMeasurement(id: $id) {
            id
            getHistoryReports (date:$date, userId:$userId) {
                totalCount
                edges {
                    ...TrackerReportInfo
                }
                pageInfo {
                    endCursor
                }
            }
        }
    }
    ${TrackerReportInfoFragment}
`;

const withQuery = graphql(
    GET_TRACKER_HISTORY_QUERY,
    {
        //name: 'PlanstorePlans',
        options: (ownProps) => ({
            variables: {
                id:ownProps.measurement.id,
                userId:ownProps.user.id,
                date:ownProps.date
            },
            fetchPolicy: 'network-only'

        }),
        props: ({ ownProps, data }) => {
            if (!data.loading) {
                const {trackerMeasurement} = data;
                const {getHistoryReports} = trackerMeasurement || {};
                const {edges, totalCount, pageInfo} = getHistoryReports || {};
                const {endCursor} = pageInfo || {};
                //console.log(summary);
                return {
                    reports: edges,
                    totalReports:totalCount,
                    //units: units,
                    //graph: trackerMeasurement.graph,
                    loading: data.loading,
                    loadMoreEntries() {
                        //console.log(endCursor);
                        return data.fetchMore({
                            // query: ... (you can specify a different query. FEED_QUERY is used by default)
                            variables: {
                                cursors: {before: endCursor}
                            },
                           
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                if (!fetchMoreResult) { return previousResult; }
                                
                                // console.log(fetchMoreResult);
                                const {trackerMeasurement} = fetchMoreResult;
                                const {getHistoryReports} = trackerMeasurement;
                                const {edges, pageInfo} = getHistoryReports;
                                const {endCursor} = pageInfo;
                                // console.log(previousResult);
                                const {trackerMeasurement:preTrackerMeasurement} = previousResult;
                                const {getHistoryReports:prevHistoryReports} = preTrackerMeasurement;
                                const {edges:prevEdges, pageInfo:prevPageInfo} = prevHistoryReports;
                                // console.log({...previousResult,
                                //     getHistoryReports : {
                                //         ...prevHistoryReports, edges: [...prevEdges, ...edges]
                                        
                                //     }
                                // });
                                // console.log(previousResult);
                                // console.log(items);
                                // console.log({...previousResult, getHistoryReports: {...prevHistoryReports, getHistoryReports: {}} ...previousResult.trackerMeasurement});
                                return {...previousResult,
                                    trackerMeasurement: {
                                        ...preTrackerMeasurement, getHistoryReports : {
                                            ...prevHistoryReports, edges: [...prevEdges, ...edges], pageInfo: {
                                                ...prevPageInfo, 
                                                endCursor: endCursor
                                            }
                                        }
                                    }
                                };
                                // return Object.assign({}, previousResult, {
                                //     getHistoryReports
                                //     // Append the new feed results to the old one
                                //     trackerMeasurement: {...previousResult.trackerMeasurement, : [...previousResult.planstore.plans, ...fetchMoreResult.planstore.plans]},
                                // });
                            }
                        });
                    }
                    /*increment() {
                         ownProps.increment(data.plans['actionplans']);
                    },
                    doubleAsync() {
                         // reset list of plans
                        ownProps.increment([]);
                    }*/
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
)

export const TrackerHistory = withQuery(TrackerHistoryPure);