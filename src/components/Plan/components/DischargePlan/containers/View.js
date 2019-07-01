import DischargePlanViewPure from '../components/View';
import {compose, withHandlers, withProps} from 'recompose';
import { withDrawer, withModalSpinnerWhileLoading } from '../../../../Modal';

const enhance = compose(
    //withDischargePlanQuery,
    //withModalSpinnerWhileLoading,
    withProps(props => {
        // const {equipment} = props;
        return {modalTitle: 'Discharge Plan'};
    }),
    withDrawer
);

export const DischargePlanView = enhance(DischargePlanViewPure);