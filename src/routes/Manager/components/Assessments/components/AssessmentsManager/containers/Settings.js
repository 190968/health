import SettingsPure from '../components/Settings';
import { compose, withHandlers } from 'recompose';
import {Form, message} from 'antd';
import { withCreateOrUpdateAssessment } from '../../../mutations';
import DefaultI18nEn from '../../../../../../../i18n/ru';
import { injectIntl } from 'react-intl';
import { prepareBrahmsInput } from '../../../../../../../components/Brahms/components/Manager/containers/Field';

const enhance = compose(
    injectIntl,
    withCreateOrUpdateAssessment,
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            const { form, assessment } = props;

            form.validateFields((err, values) => {
                if (!err) {
                    const input = prepareAssessmentInput(values);
                    // console.log(props);
                    let finish = null;
                    if (assessment) {
                        finish = props.updateAssessment(input)
                    } else {
                        finish = props.createAssessment(input);
                    }
                    finish.then(({data}) => {
                        // message.success(props.intl.formatMessage(DefaultI18nEn.saved));

                        if (!assessment) {
                            const {createAssessment} = data;
                            const {assessment:newAssessment} = createAssessment || {};
                                
                            props.setAssessment(newAssessment);
                        }
                        if (props.goNextStep) {
                            props.goNextStep();
                        }
                    });
                }
            });
        },
    }),
);
export const AssessmentsManagerSettings = enhance(SettingsPure);



const prepareAssessmentInput = values => {
    const {brahms} = values;
    const brahmsInput = prepareBrahmsInput(brahms);
    return {...values, brahms:brahmsInput};
}