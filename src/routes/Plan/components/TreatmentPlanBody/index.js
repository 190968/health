import React from 'react';
import PlanElement from '../PlanLayout/components/PlanElement';


const TreatmentPlanBodyPure = props => {
    const {treatmentPlan={}, loading, user={}} = props;
    const {elements=[]} = treatmentPlan;
    return <div>
        {elements.map((element, i) => {
            return <PlanElement key={i} element={element} plan={treatmentPlan} withCompleteCheckmark />
        })}
        {/* {elements.length > 0 ? (
						<TreatmentPlanElements elements={elements}  userId={user.id} loading={loading} />
					) : (
						<EmptyList>No Elements</EmptyList>
					)} */}
    </div>
}

export default TreatmentPlanBodyPure;