import ActionPlan from '../components/ActionPlan';
import { compose, withProps, withState, branch } from 'recompose';
import { withActionplanQuery } from '../../Actionplans/queries';

const enhance = compose(
    withProps(props => {
        const {params} = props.match || {};
        const {id} = params || {};
        // match.params.id,
        if (id) {
            return {plan: {id}}
        }
        return {};
    }),
    withActionplanQuery,
    branch(props => {
        const {plan, loading} = props;
        return !plan && !loading;
    }, withState('plan', 'setPlan')),
);
export const ActionPlanBuilder = enhance(ActionPlan);