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
            const { form, assessment } = props;

            form.validateFields((err, values) => {
                if (!err) {
                    const input = prepareAssessmentPublishInput(values);
                    props.publishAssessment(input).then(({data}) => {

                        message.success('Published');
                        if (props.onHide) {
                            props.onHide();
                        }
                        if (props.refetch) {
                            props.refetch();
                        }
                    });
                }
            });
        },
    }),
);
export const AssessmentsManagerPublish = enhance(PublishPure);



const prepareAssessmentPublishInput = values => {
    const {cohorts=[], ...otherProps} = values;
    return {...otherProps, cohorts:cohorts.map(c=>c.id)};
}