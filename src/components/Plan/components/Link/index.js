import React from 'react';
import { Link } from 'react-router-dom';
import { DischargePlanButton } from '../DischargePlan/components/Button';

export const PlanLink  = props => {
    const {plan, userPlan, style, label} = props;
    const {title, type} = plan || {};
    if (type == 'discharge') {
        return <DischargePlanButton dischargePlan={plan} label={label || title} />
    }
    if (userPlan) {
        return <Link to={'/plan/'+userPlan.id} style={style} >{label || title}</Link>;
    }
    return <Link to={'/plan/'+plan.id} style={style} >{label || title}</Link>;
}