import React from 'react'
import Joyride from 'react-joyride';
// import PlanElement from '../../containers/PlanElement'
// import PlanLesson from '../../containers/PlanLesson';
// import PlanSection from '../../containers/PlanSection';
import PlanIntroduction from '../../components/PlanIntroduction';
import PlanBodyMenu from './components/PlanBodyMenu';
import './index.less';

// adding filters
// for modal
import { Modal, BackTop, List, Affix, Card, Row, Col, message } from 'antd';
import { compose, withState, withStateHandlers, withHandlers, branch, renderComponent } from 'recompose';
import { withSpinnerWhileLoading } from '../../../../../../components/Modal';
import PlanBodyVideo from './components/Video';
import { PlanLessons } from './containers/PlanLessons';
import { PlanSections } from './containers/PlanSections';


const menuStyle = {
    height: '100vh',
    // background: '#fff',
    // borderRight: '1px solid #e8e8e8',
    overflowY: 'auto',
    padding: 0
};

export const PLAN_TOUR_STEPS = [
    {
        target: '.tour-planbody',
        content: 'Welcome to your ActionPlan! Actionplans are step-by-step health guides that can be prescribed to patients depending on their current medical diagnosis or condition',
        disableBeacon: true,
    },
    {
        target: '.tour-planmenu',
        content: 'ActionPlans are comprised of two main elements: Lessons and Activities',
        disableBeacon: true,
        placement: 'right'
    },
    {
        target: '.tour-planmenu-lessons',
        content: 'Lessons are static pages with education regarding the ActionPlan',
        disableBeacon: true,
        placement: 'right'
    },
    {
        target: '.tour-planmenu-activities',
        content: 'Activities will offer the patient trackers to report on daily',
        disableBeacon: true,
        placement: 'right'
    },
    {
        target: '.tour-planmenu1',
        content: '',
        disableBeacon: true,
        url: '/?tour=1'
    }
];

const PlanBodyPure = props => {
    const { isBuilderMode = false, isPreviewMode = false, plan, user, upid, date } = props;

    const defaultProps = { isBuilderMode, isPreviewMode, plan, user };

    // menu handlers
    const { setCurrentView, currentTab, currentKeyI } = props;
    // lessons, activities, intro
    const { lessons = [], activities = [], intro = [] } = props;
    const lessonsNum = lessons.length;
    const activitiesNum = activities.length;

    // filter things
    // const filteredElements = filterSkippedPlanElements(elements, skippedElementsByRef);

    const showEmptyBlock = isBuilderMode && currentKeyI === -1;


    return (<Row gutter={24}>
        {props.showTour && <Joyride
            steps={PLAN_TOUR_STEPS}
            continuous
            disableOverlayClose
            disableCloseOnEsc
            run
            callback={props.handleTourCallback}
            styles={{
                options: {
                    primaryColor: '#A5C943',
                },
            }}
        />}
        <BackTop />
        <Col md={8} lg={5} style={isBuilderMode ? menuStyle : {}} className="plan-menu tour-planmenu" >
            <Affix offsetTop={10} >
                <PlanBodyMenu {...defaultProps} lessons={lessons} activities={activities} onClick={setCurrentView} currentTab={currentTab} currentKeyI={currentKeyI} />
            </Affix>
        </Col>
        <Col md={16} lg={19} className={'plan-body '+(isBuilderMode && !isPreviewMode ? 'planbuilder': '')}>
            {(currentTab === 'introduction' && isBuilderMode) && <PlanIntroduction {...defaultProps} elements={intro} />}
            {(currentTab === 'lessons' && lessonsNum > 0) && <PlanLessons {...defaultProps} currentKeyI={currentKeyI} upid={upid} date={date} items={lessons} haveSections={activitiesNum > 0} showNextLesson={props.showNextLesson} showFirstSection={props.showFirstSection} />}
            {(currentTab === 'activities' && activitiesNum > 0) && <PlanSections {...defaultProps} currentKeyI={currentKeyI} upid={upid} date={date} items={activities} showNextSection={props.showNextSection} />}
            {showEmptyBlock && <div className="empty-builder-text">Please add Introduction and Lesson or Activity</div>}
        </Col>
    </Row>)
}

const enhance = compose(
    withSpinnerWhileLoading,
    branch(props => {
        const { plan } = props;
        const { type } = plan || {};
        return type === 'video';
    }, renderComponent(PlanBodyVideo)),
    withStateHandlers(
        () => ({
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
            showNextSection: props => () => {
                let { currentKeyI } = props;
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
            showNextLesson: props => () => {
                let { currentKeyI } = props;
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
