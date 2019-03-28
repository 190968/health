import AssessmentQuestionManagerPure from '../components/Question';
import AssessmentQuestionSelect, { formatAssessmentQuestionType } from '../components/Question/select';
import AssessmentQuestionExistingQuestionManager from '../components/Question/existing';
import AssessmentQuestionYesNoManager from '../components/Question/yes_no';
import AssessmentQuestionTrackerManager from '../components/Question/tracker';
import AssessmentQuestionTimeManager from '../components/Question/time';
import AssessmentQuestionRadioManager from '../components/Question/options';
import {injectIntl} from 'react-intl';
import {Form, message} from 'antd';
import {compose, branch, renderComponent, withState, withProps, withHandlers} from 'recompose';
import { withDrawer } from '../../../../Modal';
import DefaultI18nEn from '../../../../../i18n/en';
import { withCreateOrUpdateAssessmentQuestion } from '../../../mutations';
import { prepareBrahmsInput } from '../../../../Brahms/components/Manager/containers/Field';
import { formatAssessmentGoToElement } from '../../../../../routes/Manager/components/Assessments/components/AssessmentView/containers/AssessmentQuestion';



export const withAssessmentQuestionTypes = compose(
    branch(({type}) => type === 'yes_no', renderComponent(AssessmentQuestionYesNoManager)),
    branch(({type}) => type === 'tracker', renderComponent(AssessmentQuestionTrackerManager)),
    branch(({type}) => type === 'time', renderComponent(AssessmentQuestionTimeManager)),
    branch(({type}) => (type === 'radio' || type === 'dropdown' || type === 'list' || type === 'range'), renderComponent(AssessmentQuestionRadioManager)),
);
const enhance = compose(
    injectIntl,
    Form.create(),
    withCreateOrUpdateAssessmentQuestion,
    withState('type', 'setType', props => {
        const {question} = props;
        const {type} = question || {};
        return type
    }),
    branch(props => {
        const {type} = props;
        return !type;
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
        },
        formatGoToElement: props => element => {
            return formatAssessmentGoToElement(element, props);
        }
    }),
    withProps(props => {

        const { intl, question, type } = props;
        const { id, title } = question || {};
        const label = formatAssessmentQuestionType(type);
        let modalTitle = id && id !== '' ? ' a Question - '+title : ' a Question - '+label;
        modalTitle = intl.formatMessage(DefaultI18nEn.createUpdateSomething, { isUpdate: (id && id !== ''), title: modalTitle })
        return {
            modalTitle: modalTitle
        }
    }),
    withDrawer,
    branch(({question,type}) => !question && type === 'question', renderComponent(AssessmentQuestionExistingQuestionManager)),
    withAssessmentQuestionTypes
);
export const AssessmentQuestionManager = enhance(AssessmentQuestionManagerPure);


const prepareAssessmentQuestionInput = (values, type) => {
    // console.log(values,'valuesvaluesvalues');
    const {title,  description, parentQuestionId, answers=[], brahms} = values;

    const brahmsInput = prepareBrahmsInput(brahms);
    let input = {title, description, parentQuestionId, type, brahms:brahmsInput};
    if (type === 'input') {
        const {isNumeric} = values;
        input.openEndedInput = {isNumeric};
    } else if (type === 'time') {
    } else if (type === 'tracker') {
        const {tracker} = values;
        const {id} = tracker || {};
       
        input.trackerInput = {amid:id};
    } else if (type === 'question') {
        const {assessment, question} = values
        // const {id} = assessment || {};
        const questionId = question.length > 0 ? question[question.length-1] : null;
        // console.log(values, 'questionquestionquestion');
        // const {id} = question || {};

        input.parentQuestionId = questionId;//{assessmentId:id, questionId:questionId};
        // console.log(values, 'values');
    } else if (type === 'yes_no') {
        const {yes, no} = values;
        input.yesNoInput = {yes, no};
    } else {
        const {isMultiple, numberAsPrefix} = values;
        input.optionsInput = {isMultiple, numberAsPrefix: numberAsPrefix === 1, answers};
    }
    return input;
}