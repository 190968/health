import AddSectionModal from '../components/AddSectionModal'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {message} from 'antd';
import {PlanElementPureFragment} from "../../../../../../Plan/components/Plan/fragments";

const AddPlanLessonMutation=gql`
 mutation addPlanActivity($planId: UID!, $title: String!) {
        addPlanActivity(planId: $planId, title: $title) {
            id
            activities {
                id
                title
                elements {
                    ...PlanElement,
                }
            }
        }
    }
    ${PlanElementPureFragment}
`;
 
const withMutation = graphql(AddPlanLessonMutation, {
    props: ({ ownProps, mutate }) => ({
        submitLesson: (title) => {
            return mutate({
                variables: {planId: ownProps.plan.id, title: title},
            }).then((data) => {
                ownProps.onSuccess();
                message.success('Activity has been Added');
            })},
    }),
});



export default withMutation(AddSectionModal);