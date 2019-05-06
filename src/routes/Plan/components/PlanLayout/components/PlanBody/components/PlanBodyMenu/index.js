import React from 'react'

import { Menu, Icon } from 'antd';
import { withApollo } from 'react-apollo';
import AddLessonModal from '../../../../../../../Manager/components/Planbuilder/components/BuildBody/containers/AddLessonModal';
import AddSectionModal from '../../../../../../../Manager/components/Planbuilder/components/BuildBody/containers/AddSectionModal';
import gql from 'graphql-tag';
import {GetGlobalLabel} from "../../../../../../../../components/App/app-context";
import {compose, withState, withHandlers, lifecycle } from 'recompose';
import './index.less';
const SubMenu = Menu.SubMenu;


const menuItem = item => {
    //console.log(item);
    return <React.Fragment>{item.completed ? <Icon type="check" /> : <i className="anticon anticon-circle"><svg viewBox="64 64 896 896"  width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg></i>}{item.title}</React.Fragment>
}

 const PlanBodyMenuPure = props => {
    const {onOpenChange, onClick, currentTab, currentKeyI} = props;
    let {activeTabs=[]} = props;
    const {lessons, activities, isBuilderMode=false, isPreviewMode=false, plan} = props;
    const {handleChangeTab,handleMenuClick,openAddLesson=false, openAddSection=false, toggleLessonEditor, toggleSectionEditor} = props;

    const currentKey = currentTab+'_'+currentKeyI;
    if (props.initialLoad && !activeTabs.includes(currentTab)) {
        activeTabs.push(currentTab);
    }
    //console.log(currentKey);
    // console.log(activeTabs);
    return (
        <React.Fragment>
            <Menu
                onOpenChange={handleChangeTab}
                onClick={handleMenuClick}
                selectedKeys={[currentKey]}
                defaultOpenKeys={['lessons', 'activities']}
                mode="inline"
                theme={'plan'}
                inlineIndent={10}
            >
            {isBuilderMode && <Menu.Item key='introduction' style={{marginBottom:0, textAlign:'center'}} >  Introduction</Menu.Item>}

            {((isBuilderMode && !isPreviewMode) || lessons.length > 0) && 
                <SubMenu key="lessons" className={'tour-planmenu-lessons'} title={<span>{/*<Icon type="info-circle-o" />*/}Know It{/*<GetGlobalLabel type="lessons" />*/}</span>}>
                    {lessons.map((lesson, i) => (<Menu.Item key={'lessons_'+i} i={i}>{menuItem(lesson)}</Menu.Item>))}
                    {isBuilderMode && !isPreviewMode && <Menu.Item key='addLesson' style={{marginBottom:0}} > <span className={'link dashed'} style={{marginLeft:24}} > Add a <GetGlobalLabel type="lesson" /></span></Menu.Item>}
                </SubMenu>}
            {((isBuilderMode && !isPreviewMode) || activities.length > 0) && 
                <SubMenu key="activities" className={'tour-planmenu-activities'} title={<span>{/*<Icon type="form" />*/}Do It!{/*<GetGlobalLabel  type="activities" />*/}</span>}>
                    {activities.map((section, i) => (<Menu.Item key={'activities_'+i}>{menuItem(section)}</Menu.Item>))}
                    {isBuilderMode && !isPreviewMode && <Menu.Item key='addSection' style={{marginBottom:0}} > <span className={'link dashed'}  style={{marginLeft:24}} > Add an <GetGlobalLabel type="activity" /></span></Menu.Item>}
                </SubMenu>}
            </Menu>

            {openAddLesson && <AddLessonModal plan={plan} onHide={toggleLessonEditor} onSuccess={props.openLast} />}
            {openAddSection && <AddSectionModal plan={plan} onHide={toggleSectionEditor}  onSuccess={props.openLast} />}
        </React.Fragment>)
}

const enhance = compose(
    withState('openAddLesson', 'setOpenAddLesson', false),
    withState('openAddSection', 'setOpenAddSection', false),
    withState('initialLoad', 'setInitialLoad', true),
    withState('activeTabs', 'setCurrentTab', []),
    withHandlers({
        toggleSectionEditor: props => () => {
            props.setOpenAddSection(!props.openAddSection);
        },
        toggleLessonEditor: props => () => {
            props.setOpenAddLesson(!props.openAddLesson);
        },
    }),
    withHandlers({
        handleChangeTab: props => (tab) => {
            props.setInitialLoad(false);
            props.setCurrentTab(tab);
        },
        handleMenuClick: props => (e) => {
            switch(e.key) {
                case 'addLesson':
                    props.toggleLessonEditor();
                    return;
                    break;
                case 'addSection':
                    props.toggleSectionEditor();
                    return;
                    break;
                    default:

                    break;
            }
            const {onClick} = props;
    
            const {keyPath} = e;
            const currentTab = keyPath.length > 1 ? keyPath[1] : keyPath[0];
            // console.log(e);
            // console.log(currentTab);
            onClick(currentTab, e.item.props.index);
        },
        openLast: props => () => {
            const {currentTab, onClick, activities, lessons} = props;
            let {currentKeyI} = props;
            // console.log(props);
            switch (currentTab) {
                case 'lessons':
                    currentKeyI = lessons.length-1;
                    props.setOpenAddLesson(false);
                    break;
                case 'activities':
                    currentKeyI = activities.length-1;
                    props.setOpenAddSection(false);
                    break;
            }
            // console.log(currentKeyI, 'currentKeyI');
            onClick(currentTab, currentKeyI);
        }
    }),
    lifecycle({
        componentWillMount() {
            let currentTab = this.props.currentTab;
            let currentKeyI = 0;
            if (this.props.isBuilderMode) {
                currentTab = 'introduction';
            }
            // check what should we open
            const{onClick, activities, lessons} = this.props;
            let foundMatch = false;
            if (lessons.length > 0) {
                currentTab = 'lessons';
                //currentKey = 'lesson_0';
                // check on incompleted lessons
                lessons.map((lesson, i) => {
                    if (!foundMatch && currentKeyI === 0 && !lesson.completed) {
                        currentTab = 'lessons';
                        currentKeyI = i;
                        foundMatch = true;
                        return false;
                    }
                    return lesson;
                })
            }
            if (!foundMatch && activities.length > 0) {
                currentTab = 'activities';
                // check on incompleted sections
                activities.map((section, i) => {
                    if (!foundMatch && currentKeyI === 0 && !section.completed) {
                        currentTab = 'activities';
                        //currentKey = 'section_'+i;
                        currentKeyI = i;
                        foundMatch = true;
                        return false;
                    }
                    return section;
                })
            }
            if (currentTab !== '') {
                onClick(currentTab, currentKeyI);
            }

            // console.log(currentTab);
            // if (!activeTabs.includes(currentTab)) {
            //     //activeTabs.push(currentTab);
            // }
        }
    })
);

export const PlanBodyMenu = enhance(PlanBodyMenuPure);
export default PlanBodyMenu;
