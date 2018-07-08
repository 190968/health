import BuildBody from '../components/BuildBody';
import { PlanElementPureFragment, PlanCardFragment } from '../../../../Plan/components/Plan/fragments';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const PB_PLAN_BODY_QUERY = gql`
    query PB_PLAN_BODY ($id: UID!) {
        plan (id: $id) {
            ...PlanCardInfo,
            lessons {
                id
                title
                elements {
                    ...PlanElement,
                }
            }
            activities {
                id
                title
                elements {
                    ...PlanElement,
                }
            }            
            intro {
                 ...PlanElement,
            }

        }
    }
    ${PlanCardFragment}
    ${PlanElementPureFragment}
`;

const withQuery = graphql(PB_PLAN_BODY_QUERY, {
	options: (ownProps) => {
		return {
			variables: {
				id: ownProps.plan.id
			}
		};
	},
	props: ({ ownProps, data }) => {
		const { loading, plan = {} } = data;
		const lessons = plan.lessons || [];
		const activities = plan.activities || [];
		const intro = plan.intro || [];
		return {
			loading,
			plan,
			lessons,
			activities,
			intro
		};
	}
});

export default withQuery(BuildBody);
