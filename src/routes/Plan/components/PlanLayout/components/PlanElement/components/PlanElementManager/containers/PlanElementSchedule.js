import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PlanElementSchedule from '../components/PlanElementSchedule';


const GET_PLAN_SCHEDULE = gql`
    query GET_PLAN_SCHEDULE ($planId: UID!) {
        plan(id: $planId) {
            id
            schedule {
                type
                startDate
                endDate
                limitStartDow
                relativeEndDay
                dows
            }
        }
    }
`;


const PlanElementScheduleWithQuery = graphql(
    GET_PLAN_SCHEDULE,
    {
        options: (ownProps) => ({
            skip: !ownProps.schedule,
            variables: {
                planId: ownProps.planId || ownProps.plan.id,
            },
            //fetchPolicy: 'cache-only'
        }),
        props: ({data}) => {
            const {schedule} = data.plan || {};
            return {
                planSchedule: schedule,
                loading: data.loading,
            }
        },
    }
)(PlanElementSchedule);

export default PlanElementScheduleWithQuery;
