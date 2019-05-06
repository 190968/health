import React from 'react';
import PlanLesson from '../../../../components/PlanLesson';
import { filterSkippedPlanSections } from '../../../../../../../../components/Plan/utils';
// import { PlanElementsList } from '../../../../../../../../components/Plan/components/Body/containers/ElementsList';

const PlanLessons = props => {
    const {items:lessons=[], currentKeyI, ...otherProps} = props;
    const activitiesNum = lessons.length;
    const {skippedElementsByRef, isBuilderMode=false, isPreviewMode=false} = props;
    const filteredLessons = filterSkippedPlanSections(lessons, skippedElementsByRef, !isBuilderMode || isPreviewMode);
    return filteredLessons.map((lesson, i) => {
        // show only proper lesson
        if (currentKeyI === i) {
            const isLastLesson = i===activitiesNum-1;
            // return <PlanElementsList {...props}  />
            return <PlanLesson key={lesson.id} {...otherProps} item={lesson} isLastLesson={isLastLesson} />;
        }
        return null;
    });
}

export default PlanLessons;