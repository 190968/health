import React from 'react';
import {Row, Col} from 'antd';
import PlanLesson from '../../../../containers/PlanLesson';
import { filterSkippedPlanSections } from '../../../../../../../../components/Plan/utils';

const PlanLessons = props => {
    const {items:lessons=[], currentKeyI, ...otherProps} = props;
    const activitiesNum = lessons.length;
    const {skippedElementsByRef, skippedSectionsByEl, isBuilderMode=false, isPreviewMode=false} = props;
    const filteredLessons = filterSkippedPlanSections(lessons, skippedElementsByRef, !isBuilderMode || isPreviewMode);
    return filteredLessons.map((section, i) => {

        if (currentKeyI === i) {
            const isLastSection = i===activitiesNum-1;
            const list = <Row key={section.id}>
                <Col xs={24}>
                    <PlanLesson {...otherProps} item={section}  isLastSection={isLastSection} />
                </Col>
            </Row>;

            return list;
        }
        return null;
    });
}

export default PlanLessons;