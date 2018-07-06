import React from 'react'

import PlanElement from '../../containers/PlanElement'
import PlanLesson from '../../containers/PlanLesson';
import PlanSection from '../../containers/PlanSection';
import PlanIntroduction from '../../containers/PlanIntroduction';
import PlanBodyMenu from './components/PlanBodyMenu';
import './index.less';

// adding filters
// for modal
import { Modal, BackTop, List, Affix, Card, Row, Col, message} from 'antd';
import { compose, withState, withStateHandlers, withHandlers } from 'recompose';
import { withSpinnerWhileLoading } from '../../../../../../components/Modal';


const menuStyle = {
    height: '100vh',
    background: '#fff',
    borderRight: '1px solid #e8e8e8',
    overflowY: 'auto'
};

const PlanBodyPure = props => {
    const {isBuilderMode=false, isPreviewMode=false, plan, upid, date} = props;

    const defaultProps = {isBuilderMode, isPreviewMode, plan};

    // menu handlers
    const {setCurrentView, currentTab, currentKeyI} = props;
    // lessons, activities, intro
    const {lessons=[], activities=[], intro=[]} = props;
    const lessonsNum = lessons.length;
    const activitiesNum = activities.length;

    const showEmptyBlock = isBuilderMode && currentKeyI === -1;
 

    return (<Row>
        <BackTop />
        <Col xs={5} style={isBuilderMode ? menuStyle : {}} className="plan-menu" >
            <Affix offsetTop={10} >
                <PlanBodyMenu {...defaultProps}   lessons={lessons} activities={activities} onClick={setCurrentView} currentTab={currentTab} currentKeyI={currentKeyI} />
            </Affix>
        </Col>
        <Col offset={5}>
            {(currentTab === 'introduction' && isBuilderMode) && <Row>
                <Col xs={24}>
                    <PlanIntroduction {...defaultProps} elements={intro} />
                </Col>
            </Row>}
            {(currentTab === 'lessons' && lessonsNum > 0) && lessons.map((section, i) =>{

                if (currentKeyI === i) {
                    const isLastLesson = i===lessonsNum-1;
                    const list = <Row key={section.id}>
                        <Col xs={24}>
                            <PlanLesson {...defaultProps} upid={upid} item={section} isLastLesson={isLastLesson} haveSections={activitiesNum > 0} showNextLesson={props.showNextLesson} showFirstSection={props.showFirstSection} />
                        </Col>
                    </Row>;

                    return list;
                }
                return null;
            })}

            {(currentTab === 'activities' && activitiesNum > 0) && activities.map((section, i) => {

                if (currentKeyI === i) {
                    const isLastSection = i===activitiesNum-1;
                    const list = <Row key={section.id}>
                        <Col xs={24}>
                            <PlanSection {...defaultProps}  upid={upid} date={date} item={section} isLastSection={isLastSection} showNextSection={props.showNextSection} />
                        </Col>
                    </Row>;

                    return list;
                }
                return null;
            })}

            {showEmptyBlock && <div className="empty-builder-text">Please add Introduction and Lesson or Activity</div>}
        </Col>
    </Row>)
}

const enhance = compose(
    withSpinnerWhileLoading,
    withStateHandlers(
        (props) => ({
            currentTab: '',
            currentKeyI: -1,
          }), {
                setCurrentView: props => (tab, keyI) => {
                    return {
                        currentTab: tab,
                        currentKeyI: keyI,
                    }
                },
                showFirstSection: props => () => {
                    return {
                        currentTab: 'activities',
                        currentKeyI: 0,
                    }
                },
                showNextSection : props => () => {
                    let {currentKeyI} = props;
                    currentKeyI++;
                    return {
                        currentTab: 'activities',
                        currentKeyI: currentKeyI,
                    }
                },
                showFirstLesson: props => () => {
                    return {
                        currentTab: 'lessons',
                        currentKeyI: 0,
                    }
                },
                showNextLesson : props => () => {
                    let {currentKeyI} = props;
                    currentKeyI++;
                    return {
                        currentTab: 'lessons',
                        currentKeyI: currentKeyI,
                    }
                }
          }
    ),
    withHandlers({
        saveSection: props => (e, sectionId, isLastSection) => {
            if (isLastSection) {
                message.success('This is the last Section');
            } else {
                this.showNextSection();
            }
        }
    })
);

const PlanBody = enhance(PlanBodyPure);
export default PlanBody
