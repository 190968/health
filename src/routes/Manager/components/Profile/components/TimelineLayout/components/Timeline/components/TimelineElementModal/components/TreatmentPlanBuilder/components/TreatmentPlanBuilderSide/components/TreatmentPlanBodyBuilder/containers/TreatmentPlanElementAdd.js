import TreatmentPlanElementAdd from '../components/TreatmentPlanElementAdd';
import {compose, withState, withHandlers, withProps} from 'recompose';

const enhance = compose(
    withState('openModal', 'setOpenModal', false),
    withHandlers({
        toggleModalAdd: props => () => {
            props.setOpenModal(!props.openModal);
        }
    })
);
export default enhance(TreatmentPlanElementAdd);