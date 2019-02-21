import Team from '../components/Team';
import { withCohortTeamQuery } from '../queries';

export const CohortTeam = withCohortTeamQuery(Team);
export default CohortTeam;