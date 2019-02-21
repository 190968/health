import SelectPatientOrAround from '../components/SelectPatientOrAround';
import {compose, withProps, withState, withHandlers, branch, renderComponent} from 'recompose';
import { withDrawer } from '../../../../Modal';
import { TaskManager } from '../../../../../routes/Manager/components/Tasks/containers/Manager';
import { withActiveNetwork } from '../../../../App/app-context';


const withSelectAround = compose(
    withProps(props => {
        return {modalTitle: 'Select Assignee'};
    }),
    withDrawer,
    withActiveNetwork,
    renderComponent(SelectPatientOrAround)
);
export const withPatientOrAroundSelect = compose(
    withState('assignMode', 'setAssignMode', 'select'),
    withHandlers({
        setAround: props => (around) => {
            props.setAssignAround(around);
        }
    }),
    branch(props => props.assignMode === 'select', withSelectAround),
    branch(props => props.assignMode !==4 , renderComponent(TaskManager))// show for non patient
)

