import PlanElementBox from '../components/PlanElementBox';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {message} from 'antd';
import { compose,  withHandlers } from 'recompose';
import { PlanElementFragment } from '../../../../Plan/fragments';
import { GET_PATIENT_POINTS_QUERY } from '../../../../../../../layouts/components/Header/components/RightMenu/containers/HeaderPoints';

const PLAN_FIELD_REPORT_MUTATION = gql`
    mutation planFieldReport($id: UID!, $date: Date!, $input: [String]!, $upid: UID!) {
        planElementReport(id:$id, upid: $upid, date: $date, value: $input) {
                ...PlanElementWithReports
        }
    }
    ${PlanElementFragment}
`;

// const GET_USER_PLAN_PROGRESS_QUERY = gql`
// mutation planFieldReport($id: UID!, $date: Date!, $input: [String]!, $upid: UID!) {
//     planElementReport(id:$id, upid: $upid, date: $date, value: $input) {
//             ...PlanElementWithReports
//     }
// }
// ${PlanElementFragment}
// `;



export const PlanElementWithMutation = graphql(PLAN_FIELD_REPORT_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        makeReport: (upid, id, date, input) => {
            let refetchQueries = [];
            const {user} = ownProps;
            if (user) {
                refetchQueries.push({
                    query: GET_PATIENT_POINTS_QUERY,
                    variables: {
                        userId: ownProps.user.id,
                    }
                });
            }
            return mutate({
                variables: { upid:upid, id: id, date, input},
                refetchQueries:refetchQueries
                // refetchQueries: [{
                //     query: GET_USER_PLAN_PROGRESS_QUERY,
                //     variables: {tagId, tagType, parentId},
                // }],
                // update: (store, { data: { planFieldReport } }) => {

                //     /*store.writeFragment({
                //         id: 'PlanBodyElement:'+id,
                //         fragment: Plan.fragments.element,
                //         data: {
                //             reports: planElementReport.reports,
                //         },
                //     });*/

                //     // find ins PlanBodyElement:178368. and replace reports date
                //     /*// Read the data from our cache for this query.
                //     const data = store.readQuery({
                //         query: medication,
                //         variables: {
                //             id: id,
                //             user_id: uid
                //         }
                //     });
                //     if (id) {
                //         // add new to the list
                //     }


                //     // Add our comment from the mutation to the end.
                //     //data = medicationUpdate;
                //     // Write our data back to the cache.
                //     store.writeQuery({
                //         query: medication,
                //         data: {medication: medicationUpdate},
                //         variables: {
                //             id: id,
                //             user_id: uid
                //         }});*/
                // },
            })
        },

    }),
});

const enhance = compose(
    PlanElementWithMutation,
    withHandlers({
        onChange: props => (value) => {
            if (props.isBuilderMode || props.isPreviewMode) {
                return;
            }
            const {upid, element, date} = props;
            if (!date) {
                return;// plug for now
            }
            //console.log(props,'Making a report');
            const hide = message.loading('Saving in progress..', 0);
  
            props.makeReport(upid, element.id, date, value).then(() => {
                hide();
                message.success('Saved');
            });
        }
    })
);



export default enhance(PlanElementBox);
