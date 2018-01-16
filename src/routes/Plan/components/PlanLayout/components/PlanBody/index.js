import React from 'react'


// add placeholders

import PlanElement from '../PlanElement';
import PlanLesson from '../../containers/PlanLesson';
import PlanSection from '../../containers/PlanSection';



// adding filters
// for modal
import { Button, BackTop,List, Affix, Anchor, Card, Row, Col, Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;






export class PlanBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: '',
            currentKey: '',
            currentKeyI: 0,

        };
        this.handleClick = this.handleClick.bind(this);
        //this.handleTab = this.handleTab.bind(this);
        this.showFirstSection = this.showFirstSection.bind(this);
        this.saveSection = this.saveSection.bind(this);
        this.showNextLesson = this.showNextLesson.bind(this);
        this.showNextSection = this.showNextSection.bind(this);
    };
    static propTypes = {
    };


    handleClick = (e) => {
        //console.log('click ', e);
        this.setState({
            currentKey: e.key,
            currentKeyI: 0,
        });

    }

    showFirstSection () {
        this.setState({
            currentTab: 'activities',
            currentKey: 'section_0',
            currentKeyI: 0,
        });
    };

    showNextLesson = () => {
        let {currentKeyI} = this.state;
        currentKeyI++;
        this.setState({
            currentKey: 'lesson_'+currentKeyI,
            currentKeyI: currentKeyI,
        });
    };

    saveSection = (e, sectionId, isLastSection) => {

        if (isLastSection) {
            // some message
        } else {
            this.showNextSection();
        }
    };

    showNextSection = () => {
        let {currentKeyI} = this.state;
        currentKeyI++;
        this.setState({
            currentKey: 'section_'+currentKeyI,
            currentKeyI: currentKeyI,
        });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.loading === false) {
            let currentTab = '';
            let currentKey = '';
            let currentKeyI = 0;
            //console.log(nextProps);
            // check what should we open
            const{activities, lessons} = nextProps;
            if (lessons.length > 0) {
                currentTab = 'lessons';
                currentKey = 'lesson_0';
                // check on incompleted lessons
                //console.log(lessons);
                lessons.map((lesson, i) => {
                    if (lesson.completed) {
                        currentTab = 'lessons';
                        currentKey = 'lesson_'+i;
                        currentKeyI = i;
                        return false;
                    }
                })
            }

            if (currentTab === '' && activities.length > 0) {
                currentTab = 'activities';
                currentKey = 'section_0';
                // check on incompleted sections
                activities.map((section, i) => {
                    if (section.completed) {
                        currentTab = 'activities';
                        currentKey = 'section_'+i;
                        currentKeyI = i;
                        return false;
                    }
                })
            }

            if (currentTab !== '') {
                this.setState({
                    currentTab: currentTab,
                    currentKey: currentKey,
                    currentKeyI: currentKeyI
                });
            }

        }
    };



    render() {
        const {upid, activities, lessons, body, loading} = this.props;
        let {currentTab, currentKey} = this.state;
        if (1==12 || loading) {
            // console.log(plan);
            //return (<div>Loading...</div>);
            return (
                <Card loading>Loading....</Card>
            );
        }
        const lessonsNum = lessons.length;
        const activitiesNum = activities.length;
    console.log(lessons);
/*
<Row>
            <Col xs="12" sm="4" md="3">
                <PlanBodyMenu body={body} />
            </Col>
            <Col xs="12" sm="8" md="9">
                {upid} body elements here.
            </Col>
        </Row>
 */

        return (<Row>
            <BackTop />
            <Col xs={5} ><Affix offsetTop={10}><Menu
                onClick={this.handleClick}
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
            </Menu></Affix></Col>
            <Col offset={5}>

                {lessonsNum > 0 && lessons.map((section, i) => {
                    let anchors = [];
                    //console.log(section);
                    if (currentKey == 'lesson_'+i) {
                        const isLastLesson = i===lessonsNum-1;
                        const list = <Row key={section.id}>
                            <Col xs={19}>
                                <PlanLesson item={section} isLastLesson={isLastLesson} haveSections={activitiesNum > 0} showNextLesson={this.showNextLesson} showFirstSection={this.showFirstSection} />
                            </Col>
                            <Col offset={19}>

                                <Anchor offsetTop={10}>
                                    {section.elements !== null && section.elements.map((item) => (
                                        <Anchor.Link key={item.id} href={'#field' + item.id} title={item.item_info.label}/>))}

                                    {/*<Anchor.Link href="#components-anchor-demo-basic2" title="Basic demo 2" />
                                <Anchor.Link href="#components-anchor-demo-basic3" title="Basic demo 3" />*/}
                                </Anchor>
                            </Col>
                        </Row>;

                        return list;
                    }
                })}

                {activitiesNum > 0 && activities.map((section, i) => {
                    let anchors = [];
                    if (currentKey == 'section_'+i) {
                        const isLastSection = i===activitiesNum-1;
                        const list = <Row key={section.id}>
                            <Col xs={19}>
                                <PlanSection item={section} isLastSection={isLastSection} showNextSection={this.showNextSection} />


                            </Col>
                            <Col offset={19}>

                                <Anchor offsetTop={10}>
                                    {section.elements.map((item) => (
                                        <Anchor.Link key={item.id} href={'#field' + item.id} title={item.item_info.label}/>))}

                                    {/*<Anchor.Link href="#components-anchor-demo-basic2" title="Basic demo 2" />
                                <Anchor.Link href="#components-anchor-demo-basic3" title="Basic demo 3" />*/}
                                </Anchor>
                            </Col>
                        </Row>;

                    return list;
                    }
                })}







            </Col>

        </Row>)
    }
}



export default PlanBody
