import AssessementManagerPure, { AssessmentManagerSteps } from '../components/AssessmentsManager';
import {message} from 'antd';   
import {compose, withProps, withHandlers, branch, withState} from 'recompose';
 
import { withCreateOrUpdateAssessment } from '../mutations';
import { withModal, withStepsState } from '../../../../../components/Modal';
import DefaultI18nEn from '../../../../../i18n/en';
import { injectIntl } from 'react-intl';
 


const enhance = compose(
    // injectIntl,
    // branch(props => {
    //     const {assessment} = props;
    //     return !assessment;
    // }, withState('assessment', 'setAssessment')),
    withCreateOrUpdateAssessment,
    // withStepsState(() => AssessmentManagerSteps.map(o=>o.key)),
    // withProps(props => {

    //     const { intl, assessment } = props;
    //     const { id } = assessment || {};
    //     const title = 'Assessment Builder';//intl.formatMessage(DefaultI18nEn.createUpdateSomething, { isUpdate: (id && id !== ''), title: 'Assessment' })
    //     return {
    //         modalTitle: title,
    //         modalWidth:800,
    //         modalFooter:false
    //     }
    // }),
    // withModal
)

export const AssessementManager = enhance(AssessementManagerPure);