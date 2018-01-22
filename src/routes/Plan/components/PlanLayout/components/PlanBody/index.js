import React from 'react'
import { withApollo } from 'react-apollo';
import PlanElement from '../../containers/PlanElement'
import PlanLesson from '../../containers/PlanLesson';
import PlanSection from '../../containers/PlanSection';
import PlanBodyMenu from './components/PlanBodyMenu';
import {PLAN_BODY_QUERY} from '../../containers/PlanBody';



// adding filters
// for modal
import { Modal, Button, BackTop, List, Affix, Anchor, Card, Row, Col, Menu, Icon } from 'antd';
import Plan from "../../../Plan";







export class PlanBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: '',
            currentKey: '',
            currentKeyI: 0,
            inited: false,

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


    handleClick = (key, currentKeyI) => {
        this.setState({
            currentKey: key,
            currentKeyI: currentKeyI,
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

    /*componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        console.log( this.props);
        console.log(this.state.inited);
        if (!nextProps.loading && this.state.inited  ) {
            console.log('FIRST section show')

            this.showFirstSection();
        }
    }*/






    render() {
        const {showIntro, date, hideIntro, upid, activities, lessons, intro, loading} = this.props;



        let {currentTab, currentKey} = this.state;
        if (1==12 || loading) {
            // console.log(plan);
            //return (<div>Loading...</div>);
            return (
                <Card loading>Loading....</Card>
            );
        }
        /*const {plan} = client.readQuery({
            query: PLAN_BODY_QUERY,
            variables: {
                id: id,
                upid: upid,
                date: date
            }
        });
        console.log(plan);
        const {activities, lessons, intro} = plan;
        console.log(lessons);*/
        const lessonsNum = lessons.length;
        const activitiesNum = activities.length;


        if (showIntro && intro.length > 0)  {

            const introHtml =  <List
                size="large"
                itemLayout="vertical"
                split={false}
                dataSource={intro}
                renderItem={item => {
                    return <List.Item
                        id={'field' + item.id}
                        key={item.id}>
                        <PlanElement element={item} />
                    </List.Item>
                }}
            />;
            Modal.info({
                title: 'Info',
                content: (
                    introHtml
                ),
                onOk() {hideIntro()},
            });
        }
        /**/
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
        console.log(activities, 'AAAAAactivitires');
        console.log(currentTab);
        console.log(currentKey);
        return (<Row>
            <BackTop />
            <Col xs={5} >
                <Affix offsetTop={10} >
                    <PlanBodyMenu lessons={lessons} activities={activities} onClick={this.handleClick} currentTab={currentTab} currentKey={currentKey} />
                </Affix>
            </Col>
            <Col offset={5}>

                {lessonsNum > 0 && lessons.map((section, i) => {
                    let anchors = [];
                    //console.log(section);
                    if (currentKey == 'lesson_'+i) {
                        const isLastLesson = i===lessonsNum-1;
                        const list = <Row key={section.id}>
                            <Col xs={24}>
                                <PlanLesson upid={upid} item={section} isLastLesson={isLastLesson} haveSections={activitiesNum > 0} showNextLesson={this.showNextLesson} showFirstSection={this.showFirstSection} />
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
                            <Col xs={24}>
                                <PlanSection upid={upid} date={date} item={section} isLastSection={isLastSection} showNextSection={this.showNextSection} />
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
