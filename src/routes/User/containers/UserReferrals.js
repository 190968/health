import UserReferralsPure from '../components/UserReferrals';
import { ifModuleExists } from '../../../components/App/app-context';
import { withPatientProgramsQuery } from '../../Manager/components/Profile/containers/Programs';
 
export const UserReferrals = ifModuleExists('referrals')(withPatientProgramsQuery(UserReferralsPure));