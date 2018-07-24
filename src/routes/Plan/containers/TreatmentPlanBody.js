import TreatmentPlanBodyPure from '../components/TreatmentPlanBody';
import { withTreatmentPlanQuery } from '../../Manager/components/Profile/components/Pathway/components/Timeline/components/TimelineElementModal/components/TreatmentPlanBuilder/queries';


export const TreatmentPlanBody = withTreatmentPlanQuery(TreatmentPlanBodyPure);
export default TreatmentPlanBody;