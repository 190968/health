import TreatmentPlanBodyPure from '../components/TreatmentPlanBody';
import { withTreatmentPlanQuery } from '../../Manager/components/Profile/components/TimelineLayout/components/Timeline/components/TimelineElementModal/components/TreatmentPlanBuilder/queries';
import { withSpinnerWhileLoading } from '../../../components/Modal';

export const TreatmentPlanBody = withTreatmentPlanQuery( withSpinnerWhileLoading(TreatmentPlanBodyPure));
export default TreatmentPlanBody;