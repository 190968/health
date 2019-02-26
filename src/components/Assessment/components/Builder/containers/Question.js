import AssessmentQuestionManagerPure from '../components/Question';
import AssessmentQuestionSelect from '../components/Question/select';
import {injectIntl} from 'react-intl';
import {Form, message} from 'antd';
import {compose, branch, renderComponent, withState, withProps, withHandlers} from 'recompose';
import { withDrawer } from '../../../../Modal';
import DefaultI18nEn from '../../../../../i18n/en';
import { withCreateOrUpdateAssessmentQuestion } from '../../../mutations';

const enhance = compose(
    injectIntl,
    Form.create(),
    withCreateOrUpdateAssessmentQuestion,
    withState('type', 'setType'),
    branch(props => {
        const {question, type} = props;
        return !question && !type;
    }, renderComponent(AssessmentQuestionSelect)),
    withHandlers({
        onSubmit: props => () => {
            const {form, question, type:typeInit} = props;
            console.log('Submit');
            form.validateFields((err, values) => {
                if (!err) {
                    console.log(props);
                    console.log(values);
                    const {type=typeInit} = question || {};
                    const input = prepareAssessmentQuestionInput(values, type);
                    // submit the section
                    let finish =  question ? props.updateAssessmentQuestion(input) : props.createAssessmentQuestion(input);
                    
                    finish.then(() => {
                        message.success(props.intl.formatMessage(DefaultI18nEn.saved));
                        if (props.onHide) {
                            props.onHide();
                        }
                        if (props.refetch) {
                            props.refetch();
                        }
                    });
                }
            });
        }
    }),
    withProps(props => {

        const { intl, question } = props;
        const { id } = question || {};
        const title = intl.formatMessage(DefaultI18nEn.createUpdateSomething, { isUpdate: (id && id !== ''), title: 'Question' })
        return {
            modalTitle: title
        }
    }),
    withDrawer
);
export const AssessmentQuestionManager = enhance(AssessmentQuestionManagerPure);


const prepareAssessmentQuestionInput = (values, type) => {
    
    const {title, description, answers=[]} = values;
    let input = {title, description, type};
    if (type === 'input') {
        const {isNumeric} = values;
        input.openEndedInput = {isNumeric};
    } else if (type === 'time') {
    } else if (type === 'question') {
        //input.parentQuestionId = quest
    } else {
        const {isMultiple, numberAsPrefix} = values;
        input.optionsInput = {isMultiple, numberAsPrefix, answers};
    }
    return input;
}