import TrackerCardValuePure from '../components/TrackerCardValue';
import { withToggleModal } from '../../../../../../../components/Modal';
import {compose, withHandlers, withProps} from 'recompose';
import { message } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TrackerInfoFragment, TrackerSummaryReportInfoFragment } from '../../../fragments';
import { withLoadingState } from '../../../../../../../components/Loading';
import { GET_TRACKER_HISTORY_QUERY } from '../../../../../../../components/Tracker/containers/TrackerHistory';
import { GET_PATIENT_POINTS_QUERY } from '../../../../../../../layouts/components/Header/components/RightMenu/containers/HeaderPoints';


const TRACKER_REPORT_MUTATION = gql`
    mutation trackerReport($id: UID!, $userId: UID!, $date: Date, $input: TrackerReportInput!) {
        trackerReportFull(id:$id, date:$date, userId:$userId, input: $input) {
            ...TrackerInfo
        }
    }
    ${TrackerInfoFragment}
`;

const GET_TRACKER_QUERY = gql`
    query getTracker($id: UID!, $date: Date!, $userId: UID!, $withSummary: Boolean=false) {
        getTracker (id: $id)  {
            ...TrackerInfo
            summary (date:$date, userId:$userId) @include(if: $withSummary) {
                date
                reports {
                    ...TrackerSummaryReportInfo
                }
            }
        }
    }
    ${TrackerInfoFragment}
    ${TrackerSummaryReportInfoFragment}
`;
 
const withMutation = graphql(TRACKER_REPORT_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        trackerReport: (input) => {
            // console.log(input);
            // console.log(ownProps);
            const {date, user, measurement, updateHistory=false} = ownProps;
            const {id:userId} = user || {};
            //const {measurement} = tracker || {};
            const {id} = measurement || {};
            let refetchQueries = [{
                query: GET_TRACKER_QUERY,
                variables: {
                    id,
                    userId,
                    date,
                    withSummary:true
                },
            },
            {
                query: GET_PATIENT_POINTS_QUERY,
                variables: {
                    userId: userId,
                },
            }
        
        
        ];
            // if we need to update history
            if (updateHistory) {
                refetchQueries.push({
                    query: GET_TRACKER_HISTORY_QUERY,
                    variables: {
                        id,
                        userId,
                        date
                    },
                })
            }
            return mutate({
                variables: { input: input, date:date, id, userId },
                refetchQueries: refetchQueries,
            });
        },
    }),
});
  

const getTrackerLastReport = reports => {
	if (reports.length > 0) {
		const report = reports[reports.length-1];
		return report;
	}
	return {};
}

export const withTrackerReportMutation = compose(
    withProps(props => {
		const {measurement} = props;
		const {reports=[]} = measurement || {};
		let {report} = props;
		if (!report) {
			report = getTrackerLastReport(reports);
		}
		return {
			report
		}
	}),
    withMutation,
    withLoadingState,
    withHandlers({
        reportOnTracker: props => (value) => {



            const {  report, reportKey, column } = props;
            let input = {id:(report && report.id ? report.id : 0), value, reportKey, column};
    
            // const {value} = info;
            // const {report} = props;
            //console.log(e);
            // e.preventDefault();
            // e.stopPropagation();
            //let input = {id:report.id}
            // const {isTaken=false, order, report} = props;
            // input.isTaken = !isTaken;
            // if (order >= 0) {
            //     input.order = order;
            // }
            
            // if (report) {
            //     input.id = report.id;
            // }

            // if (props.time) {
            //     input.time = props.time;
            // }
            const hide = message.loading('Saving...');
            props.setLoadingState(true);
            props.trackerReport(input).then(({data}) => {
                hide();
                props.setLoadingState(false);
                    message.success('Report has been saved');

                }).catch((error) => {
                message.error(error.message);
            });
        }
    }),
    withHandlers({
        onChange: props => (value) => {
            props.reportOnTracker(value);
        }
    })
)

export const enhance  = compose(
    withTrackerReportMutation,
    withProps(
        props => {
            const {tracker} = props;
            const {measurement} = tracker || {};
            const {reports=[]} = measurement || {};
            
            const showModal = reports.length === 0;
    
            return {showModal}
        }
    ),
    withToggleModal
)




export const TrackerCardValue = enhance(TrackerCardValuePure);