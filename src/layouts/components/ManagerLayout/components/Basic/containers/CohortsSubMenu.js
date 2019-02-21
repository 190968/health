import CohortsSubMenuPure from '../components/CohortsSubMenu';
import { withCohortsQuery } from '../../../../../../routes/Manager/components/Cohorts/queries';

export const CohortsSubMenu = withCohortsQuery(CohortsSubMenuPure);