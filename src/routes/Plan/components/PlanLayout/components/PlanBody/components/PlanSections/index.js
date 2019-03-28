import React from 'react';
import PlanSection from '../../../../containers/PlanSection';
import {Row, Col} from 'antd';
import { filterSkippedPlanSections } from '../../../../../../../../components/Plan/utils';
const PlanSections = props => {
    const {items:sections=[], currentKeyI, ...otherProps} = props;
    const activitiesNum = sections.length;
    const {skippedElementsByRef, skippedSectionsByEl, isBuilderMode=false, isPreviewMode=false} = props;
    const filteredSections = filterSkippedPlanSections(sections, skippedElementsByRef, !isBuilderMode || isPreviewMode);
    // const filteredElements = filterSkippedPlanElements(elements, skippedElementsByRef);
    return filteredSections.map((section, i) => {

        if (currentKeyI === i) {
            const isLastSection = i===activitiesNum-1;
            const list = <Row key={section.id}>
                <Col xs={24}>
                    <PlanSection {...otherProps} item={section}  isLastSection={isLastSection} />
                </Col>
            </Row>;

            return list;
        }
        return null;
    });
}

export default PlanSections;