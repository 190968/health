import SelectPatientPlanPure from '../components/SelectPatientPlan';
import {compose, withHandlers, withProps, withState, branch, renderComponent} from 'recompose';
import { withDrawer } from '../../../../../../../../../components/Modal';
import { TaskAssignWizzard } from '../../../../../../../../../components/Tasks/containers/TaskAssignWizzard';
import MedicationManager from '../../../../../../../../Plan/components/MedicationPlan/components/Medication/containers/MedicationManager';
import {TrackerManager} from '../../../../../../../../Plan/components/BiometricPlan/containers/TrackerManager';
import { DischargePlanManager } from '../../../../../../../../../components/Plan/components/DischargePlan/containers/Manager';
import { DmeReferralManager } from '../../../../../../../../../components/DME/components/Referrals/containers/Manager';
{/* <MedicationManagerButton user={user} date={date} asMenuItem /> */}
const ApAssignEnhanced = withProps(props => {
    return {
        asPlusIcon:true,
        patient:props.user,
        mode:'simple',
        assignObject:{type: 'ap'}
    }
})(TaskAssignWizzard);

const enhanceType = compose(
    branch(({type}) => type === 'ap', renderComponent(ApAssignEnhanced)),
    branch(({type}) => type === 'medication', renderComponent(MedicationManager)),
    branch(({type}) => type === 'biometric', renderComponent(TrackerManager)),
    branch(({type}) => type === 'discharge_plan', renderComponent(DischargePlanManager)),
    branch(({type}) => type === 'dme', renderComponent(DmeReferralManager)),
);
const enhance = compose(
    withState('type', 'setType', props => props.type),
    branch(props => props.type, enhanceType),
    withHandlers({
        onSelect: props => (type) => {
            props.setType(type);
        }
    }),
    withProps(props => {
        return {modalTitle: 'Select Plan Type'}
    }),
    withDrawer
);

export const SelectPatientPlan = enhance(SelectPatientPlanPure);