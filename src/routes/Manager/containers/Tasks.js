import {TasksList} from "../components/Tasks/index";
import {compose, withState, withHandlers} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TaskInfoFragment } from "../components/Tasks/fragments";

const GET_PATIENT_TASKS_QUERY  = gql`
  query GET_TASKS($patientId:UID) {
      getTasks(patientId: $patientId) {
            totalCount,
            edges{
                ...TaskInfo
            }
      }
}
${TaskInfoFragment}
`;

const withQuery = graphql(GET_PATIENT_TASKS_QUERY, {
    options: (ownProps) => {
        return{
            variables: {
                patientId:ownProps.userId
            }
        }
    },
    props: ({ data }) => {

        const {patient={}} = data;
        const {motivation={}} = patient;
        const {family={}} = motivation;
        const {edges=[]} = family;

        return {loading: data.loading, members:edges }
    },
});



const enhance = compose(
    withQuery,
    withState('taskType', 'setTaskType', 'all'),
    withHandlers({
        updateTaskStatus: props => (type) => {
            // if 
            if (type === 'closed') {
                // load closed
            } else if (taskType==='closed') {

            }
            

            props.setTaskType(type);
        }
    })
);

export default enhance(TasksList);