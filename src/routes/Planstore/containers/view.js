import PlanstorPlanLayout from '../components/PlanstorePlanLayout'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { ifPageExists } from '../../../components/App/app-context';
import { PlanCardFragment } from '../../Plan/components/Plan/fragments';

const PLANSTORE_PLAN = gql`
    query GET_PLANSTORE_PLAN ($id: UID!) {
        plan (id: $id) {
            ...PlanCardInfo,
            description,
            benefits,
            start_date,
            end_date,
            gender,
            elements,
            language,
            alreadyDownloadedUserPlan {
                id
            }
            isFixedDated
            categories {
                id,
                name
            },

        }
    }
    ${PlanCardFragment}
`;


// 1- add queries:
const withQuery = graphql(
    PLANSTORE_PLAN,
    {
        options: (ownProps) => ({
            variables: {
                id: ownProps.match.params.id
            }
        }),
        props: ({data }) => {
            if (!data.loading) {
                const {plan} = data;
                const {alreadyDownloadedUserPlan} = plan || {};
                return {
                    plan: data.plan,
                    alreadyDownloaded: alreadyDownloadedUserPlan !== null,
                    alreadyDownloadedUserPlan,
                    loading: data.loading,
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
);


export default  ifPageExists('aps', 'planstore', false)(withQuery(PlanstorPlanLayout));