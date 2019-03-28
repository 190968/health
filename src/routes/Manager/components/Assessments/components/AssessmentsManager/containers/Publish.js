import PublishPure from '../components/Publish';
import { compose, withHandlers } from 'recompose';
import {Form, message} from 'antd';
import { withPublishAssessmentMutation } from '../../../mutations';
import { injectIntl } from 'react-intl';
import { withAssessmentCohortsQuery } from '../../../queries';

const enhance = compose(
    injectIntl,
    withAssessmentCohortsQuery,
    withPublishAssessmentMutation,
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            const { form, assessment, history } = props;

            form.validateFields((err, values) => {
                if (!err) {
                    const input = prepareAssessmentPublishInput(values);
                    props.publishAssessment(input).then(({data}) => {

                        message.success('Published');

                        history.push('/assessments');
                        // if (props.onHide) {
                        //     props.onHide();
                        // }
                        // if (props.refetch) {
                        //     props.refetch();
                        // }
                    });
                }
            });
        },
    }),
);
export const AssessmentsManagerPublish = enhance(PublishPure);



const prepareAssessmentPublishInput = values => {
    const {cohorts=[], isPrivate, ...otherProps} = values;
    return {...otherProps, isPrivate:isPrivate===1, cohorts:cohorts.map(c=>c.id)};
}