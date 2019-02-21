import ScreeningSelectPure from '../components/ScreeningSelect';
import { withScreeningsQuery } from '../../../routes/Manager/components/Screenings/queries';

export const ScreeningSelect = withScreeningsQuery(ScreeningSelectPure);
export default ScreeningSelect;