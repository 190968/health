import TrackerChartPure from '../components/TrackerChart';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TrackerSummaryReportInfoFragment } from '../../BiometricPlan/fragments';

export const GET_TRACKER_SUMMARY_QUERY = gql`    
    query GetTrackerSummary ($id: UID!, $userId:UID!, $date: Date)  {
        trackerMeasurement(id: $id) {
            id
            units {
                id
                name
                getLabels
            }
            summary (date:$date, userId:$userId)  {
                date
                reports {
                    ...TrackerSummaryReportInfo
                }
            }
        }
    }
    ${TrackerSummaryReportInfoFragment}
`;

const withQuery = graphql(
    GET_TRACKER_SUMMARY_QUERY,
    {
        //name: 'PlanstorePlans',
        options: (ownProps) => ({
            variables: {
                id:ownProps.item.id,
                userId:ownProps.user.id,
                date:ownProps.date
            },
            fetchPolicy: 'network-only'

        }),
        props: ({ ownProps, data }) => {
            if (!data.loading) {
                const {trackerMeasurement} = data;
                const {summary=[], units} = trackerMeasurement || {};
                //console.log(summary);
                return {
                    data: summary,
                    units: units,
                    //graph: trackerMeasurement.graph,
                    loading: data.loading,
                    // loadMoreEntries() {

                    //     return data.fetchMore({
                    //         // query: ... (you can specify a different query. FEED_QUERY is used by default)
                    //         variables: {
                    //             // We are able to figure out which offset to use because it matches
                    //             // the feed length, but we could also use state, or the previous
                    //             // variables to calculate this (see the cursor example below)
                    //             page: ownProps.page+1,
                    //         },
                    //         updateQuery: (previousResult, {fetchMoreResult}) => {
                    //             if (!fetchMoreResult) { return previousResult; }

                    //             return fetchMoreResult;
                    //         },
                    //     });
                    // }
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
);

export const TrackerChart = withQuery(TrackerChartPure); 
export default TrackerChart;