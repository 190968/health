import Coin from '../components/Coin';
import {compose, withHandlers, withProps} from 'recompose';
import { enhanceMedicationReport } from '../../../containers/MedicationTakeButton';

const enhance = compose(
    withProps(props => {
        const {report} = props;
        const {isTaken} = report || {};
        return {isTaken};
    }),
    enhanceMedicationReport
    // withHandlers()
);

export const MedicationCoin = enhance(Coin);