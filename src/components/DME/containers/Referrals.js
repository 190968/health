import Referrals from '../components/Referrals';
import { withPatientDmeReferralsQuery } from '../queries';

export const DmeReferrals = withPatientDmeReferralsQuery(Referrals);