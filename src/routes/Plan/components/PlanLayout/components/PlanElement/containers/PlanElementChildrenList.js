import PlanElementChildrenList from '../components/PlanElementChildrenList'
import {PlanElementChildrenListWithQuery, PathwayElementChildrenListWithQuery} from "./queries";
import { compose, branch } from 'recompose';

const enhance = compose(
    branch(props => {
        const {plan} = props;
        const {type} = plan || {};
        // console.log(type, 'pathwaytype');
        return type === 'pathway';
    }, PathwayElementChildrenListWithQuery, PlanElementChildrenListWithQuery),
    // PlanElementChildrenListWithQuery
);
export default enhance(PlanElementChildrenList);