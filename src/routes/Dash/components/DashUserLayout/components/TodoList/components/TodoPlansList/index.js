import React from 'react';
import TodoPlanItem from '../../components/TodoPlanItem';

export default class TodoPlansList extends React.PureComponent {

    render () {

        const {
            plans
        } = this.props;
        return (
            <React.Fragment>
            {plans.map(plan => <div key={plan.upid}>
                <TodoPlanItem plan={plan} />
            </div>)}
            </React.Fragment>);
    }
}


