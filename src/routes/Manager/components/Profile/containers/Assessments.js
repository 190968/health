import Assessments from '../components/Assessments';
import { compose, defaultProps } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ifModuleExists, withActiveUserSimple } from '../../../../../components/App/app-context';
import moment from 'moment';
import { UserAssessmentReportPureFragment } from '../../Assessments/fragments';

export const GET_USER_ASSESSMENTS_QUERY = gql`
 query GET_USER_ASSESSMENTS($userId:UID, $date: Date, $status: GeneralStatusEnum) {
  patient(id: $userId) {
     id
     getAssessments (date:$date, status:$status) {
         edges {
            id
            assessment {
                id
                name
                isForm
            }
            startDate
            endDate
            canReport
            getLatestReport (date: $date) {
                ...UserAssessmentReportPure
            }
        }
     }
  }
}
${UserAssessmentReportPureFragment}
`;

const withQuery = graphql(GET_USER_ASSESSMENTS_QUERY, {
    options: (ownProps) => {
        return {
            variables: {
                userId: ownProps.user.id,
                date: ownProps.date,
                status: 'active',
            },
            fetchPolicy: 'network-only',
        }
    },
    props: ({ data }) => {

        const { patient , refetch } = data;
        const { getAssessments } = patient || {};
        const { edges = [] } = getAssessments || {};
        const {status} = data.variables || {};
        return {
            loading: data.loading, assessments: edges, status: status, refetch,
            loadByStatus(status) {
                return data.refetch({
                    status: status
                });
            }
        }
    },
});



const enhance = compose(
    ifModuleExists('assessments'),
    defaultProps({
        date: moment().format('YYYY-MM-DD')
    }),
    withQuery,
    withActiveUserSimple
);

export const UserAssessments = enhance(Assessments);
export default UserAssessments;