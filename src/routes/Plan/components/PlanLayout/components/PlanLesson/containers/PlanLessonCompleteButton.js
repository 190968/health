import PlanLessonCompleteButtonPure from '../components/PlanLessonCompleteButton';
import { compose, withHandlers } from 'recompose';
import { message } from 'antd';
import { withLoadingButton } from '../../../../../../../components/Loading';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { GET_PATIENT_POINTS_QUERY } from '../../../../../../../layouts/components/Header/components/RightMenu/containers/HeaderPoints';


const LESSON_REPORT_MUTATION = gql`
    mutation LESSON_REPORT($id: UID!, $upid: UID!) {
        lessonComplete(id:$id, upid: $upid) {
             id
             completed
        }
    }
`;



const withMutation = graphql(LESSON_REPORT_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        lessonReport: (upid, id) => {
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
                variables: { upid: upid, id: id },
                refetchQueries
                // refetchQueries: [{
                //     query: GET_PATIENT_POINTS_QUERY,
                //     variables: {
                //         userId: userId,
                //     }
                // }]
            })
        },

    }),
});



const enhance = compose(
    withMutation,
    withLoadingButton,
    withHandlers({
        saveLesson: props => (e) => {
            const { upid, lesson, isLastlesson, showNextLesson, showFirstSection, haveSections } = props;
            const { id, completed } = lesson || {};
            const callback = () => {
                if (isLastlesson) {
                    if (haveSections) {
                        message.success('Last lesson has been completed');
                        if (showFirstSection) {
                            showFirstSection();
                        }
                    } else {
                        // do action if no sections.
                        message.success('All Lessons has been completed');
                    }
                } else {
                    message.success('Lesson has been completed');
                    showNextLesson();
                }
            }
            // if it's copleted, then just show nect
            if (completed) {
                callback();
                return;
            }
            props.setLoadingButton(true);
            const hide = message.loading('Saving');
            props.lessonReport(upid, id).then(({ data }) => {
                props.setLoadingButton(false);
                hide();
                callback()
            }).catch((error) => {
                message.error(error.message);
            });
        }
    })
);
export const PlanLessonCompleteButton = enhance(PlanLessonCompleteButtonPure);