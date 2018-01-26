import React from 'react'
import PropTypes from 'prop-types'

import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

export class PlanBodyMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: [props.currentTab],
            currentKey: props.currentKey
        };

        this.onClick = this.onClick.bind(this);
    };

    static propTypes = {
    };

    onClick(e) {

        const{onClick} = this.props;

        this.setState({currentKey:e.key});

        onClick(e.key, e.item.props.index);
    }

    componentWillMount() {

//return true;

       // console.log(this.props);


        //if (nextProps.loading === false) {
            let currentTab = '';
            let currentKey = '';
            let currentKeyI = 0;
            //console.log(nextProps);
            // check what should we open
            const{onClick, activities, lessons} = this.props;
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
                    if (!foundMatch && currentKey == 'section_0' && !section.completed) {
                        //console.log(section);
                        currentTab = 'activities';
                        currentKey = 'section_'+i;
                        currentKeyI = i;
                        foundMatch = true;
                        return false;
                    }
                })
            }
            /*console.log(activities);
            console.log(currentTab);
            console.log(currentKey);
            console.log(currentKeyI);*/
            //console.log(currentTab);
            //console.log(currentKey);
            if (currentTab !== '') {
                this.setState({
                    currentTab: [currentTab],
                    currentKey: currentKey,
                    currentKeyI: currentKeyI
                });
                onClick(currentKey, currentKeyI, currentTab);
            }

       //}*/
    };

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
        //console.log(this.props);
        if (nextProps.currentKey !== this.state.currentKey) {
            this.setState({
                currentKey:nextProps.currentKey
            });
        }

        if (nextProps.currentTab !== this.state.currentTab) {
            this.setState({
                currentTab:[nextProps.currentTab]
            });
        }


    }

    render() {
       //console.log(this.props);
        const {lessons, activities} = this.props;
        let {currentTab, currentKey} = this.state;
        console.log(currentTab, 'curtab');
        console.log(currentKey, 'curkey');
        return (<Menu
            onClick={this.onClick}
            selectedKeys={[currentKey]}
            defaultOpenKeys={currentTab}
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
