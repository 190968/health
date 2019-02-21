import Vitals from '../components/Vitals';
import { withUserVitalsQuery } from '../components/Vitals/queries';
import { withPossibleTabPane } from '../../../components/UI/Tabs/hocs';
import { withSpinnerWhileLoading } from '../../../components/Modal';


export const UserVitals = withUserVitalsQuery(withSpinnerWhileLoading(Vitals));
