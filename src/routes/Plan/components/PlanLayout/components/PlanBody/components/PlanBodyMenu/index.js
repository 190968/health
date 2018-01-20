import React from 'react'
import PropTypes from 'prop-types'

import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

export class PlanBodyMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: props.currentTab,
            currentKey: props.currentKey
        };
    };
    static propTypes = {
    };


    componentWillMount() {



       // console.log(this.props);


        //if (nextProps.loading === false) {
            let currentTab = '';
            let currentKey = '';
            let currentKeyI = 0;
            //console.log(nextProps);
            // check what should we open
            const{activities, lessons} = this.props;
            let foundMatch = false;
            if (lessons.length > 0) {
                //if (activities.length === 0) {
                currentTab = 'lessons';
                currentKey = 'lesson_0';
                //}
                // check on incompleted lessons
                //console.log(lessons);
                lessons.map((lesson, i) => {
                    if (currentKey == 'lesson_0' && !lesson.completed) {
                        currentTab = 'lessons';
                        currentKey = 'lesson_'+i;
                        currentKeyI = i;
                        foundMatch = true;
                        return false;
                    }
                })
            }
            if (!foundMatch && activities.length > 0) {
                currentTab = 'activities';
                currentKey = 'section_0';
                // check on incompleted sections
                activities.map((section, i) => {
                    if (currentKey == 'section_0' && !section.completed) {
                        console.log(section);
                        currentTab = 'activities';
                        currentKey = 'section_'+i;
                        currentKeyI = i;
                        return true;
                    }
                })
            }
            /*console.log(activities);
            console.log(currentTab);
            console.log(currentKey);
            console.log(currentKeyI);*/
            if (currentTab !== '') {
                this.setState({
                    currentTab: currentTab,
                    currentKey: currentKey,
                    currentKeyI: currentKeyI
                });
            }

       //}*/
    };




    render() {
       //console.log(this.props);
        const {onClick, lessons, activities} = this.props;
        let {currentTab, currentKey} = this.state;
            //console.log(tab);
        return (<Menu
            onClick={onClick}
            selectedKeys={[currentKey]}
            defaultOpenKeys={[currentTab]}
            mode="inline"
        >
            {lessons.length > 0 && <SubMenu key="lessons" title={<span><Icon type="info-circle-o" />Lessons</span>}>
                {lessons.map((lesson, i) => (<Menu.Item key={'lesson_'+i} i={i}>{lesson.completed ? <Icon type="check-circle" /> : <Icon type="check-circle-o" />}{lesson.title}</Menu.Item>))}
            </SubMenu>}
            {activities.length > 0 && <SubMenu key="activities" title={<span><Icon type="form" />Actions</span>}>
                {activities.map((section, i) => (<Menu.Item key={'section_'+i}>{section.completed ? <Icon type="check-circle" /> : <Icon type="check-circle-o" />}{section.title}</Menu.Item>))}
            </SubMenu>}
        </Menu>)
    }
}



export default PlanBodyMenu
