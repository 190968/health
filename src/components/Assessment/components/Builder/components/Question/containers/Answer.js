import Answer from '../components/Answer';
import { compose, withStateHandlers, withHandlers, withProps } from 'recompose';
import { withDrawer } from '../../../../../../Modal';
import DefaultI18nEn from '../../../../../../../i18n/en';
import { injectIntl } from 'react-intl';

const enhance = compose(
    injectIntl,
    // withHandlers({
    //     onChange: props => (answer) => {
    //         console.log(answer);
    //         if (props.onChange) {
    //             answer = prepareAssessmentQuestionAnswerInput(answer);
    //             props.onChange(answer);
    //         }
    //     },
    // }),
    withStateHandlers( props => {
        const {answer} = props;
        const {label, isValidAnswer=false, isOpenEnded=false, isCritical=false, points=0} = answer || {};
        return {answer: {label, isValidAnswer, isOpenEnded, isCritical, points}};
    }, {
        setLabel: (state, props) => (e) => {
            const label = e.target.value;
            let {answer} = state;
            answer = {...answer, label};
            // props.onChange(answer);
            return {
                answer
            }
        },
        setIsValid: (state, props) => (e) => {
            const isValidAnswer = e.target.checked;
            // props.onChange({...state, isValidAnswer});
            let {answer} = state;
            answer = {...answer, isValidAnswer};
            // props.onChange(answer);
            return {
                answer
            }
        },
        setIsOpenEnded: (state, props) => (e) => {
            const isOpenEnded = e.target.checked;
            let {answer} = state;
            answer = {...answer, isOpenEnded};
            // props.onChange(answer);
            return {
                answer
            }
        },
        setIsCritical: (state, props) => (e) => {
            const isCritical = e.target.checked;
            let {answer} = state;
            answer = {...answer, isCritical};
            // props.onChange(answer);
            return {
                answer
            }
        },
        setPoints: (state, props) => (e) => {
            const points = parseInt(e.target.value);
            let {answer} = state;
            answer = {...answer, points};
            // props.onChange(answer);
            return {
                answer
            }
        }
    }),
    withHandlers({
        onSubmit: props => () => {
            // console.log(props);
            let {answer} = props;
            answer = prepareAssessmentQuestionAnswerInput(answer);
            props.onChange(answer);
            props.onHide();
        }
    }),
    withProps(props => {

        const { intl, answer } = props;
        const { id } = answer || {};
        const title = intl.formatMessage(DefaultI18nEn.createUpdateSomething, { isUpdate: (id && id !== ''), title: 'Asnwer' })
        return {
            modalTitle: title
        }
    }),
    withDrawer
);
export const AssessmentQuestionAnswerManager = enhance(Answer);

const prepareAssessmentQuestionAnswerInput = values => {
    const {id, label, descrioton, isOpenEnded, isValidAnswer, isCritical, points} = values;
    return {id, label, descrioton, isOpenEnded, isValidAnswer, isCritical, points:parseInt(points)};
}