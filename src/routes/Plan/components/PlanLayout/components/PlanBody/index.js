import React from 'react'
import PropTypes from 'prop-types'

// add placeholders
import PlanBodyMenu from './containers/PlanBodyMenu';


// adding filters
// for modal
import { BackTop,List, Affix, Anchor, Card, Row, Col, Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;






export class PlanBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: ''
        };
        this.handleClick = this.handleClick.bind(this);
    };
    static propTypes = {
    };


    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            currentTab: e.key,
        });
    }


    render() {
        const {upid, activities, lessons, body, loading} = this.props;
        const {currentTab} = this.state;
        console.info('Render Planbody');
        console.log(this.props);
        if (1==12 || loading) {
            // console.log(plan);
            //return (<div>Loading...</div>);
            return (
                <Card loading>Loading....</Card>
            );
        }

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
                /*defaultSelectedKeys={['1']}*/
                /*defaultOpenKeys={[currentTab]}*/
                mode="inline"
            >
                <SubMenu key="lessons" title={<span><Icon type="info-circle-o" />Lessons</span>}>
                    {lessons.map((lesson) => (<Menu.Item key={'lesson_'+lesson.id}>{lesson.completed ? <Icon type="check-circle" /> : <Icon type="check-circle-o" />}{lesson.title}</Menu.Item>))}
                </SubMenu>
                <SubMenu key="activities" title={<span><Icon type="form" />Actions</span>}>

                    {activities.map((section) => (<Menu.Item key={'section_'+section.id}>{section.completed ? <Icon type="check-circle" /> : <Icon type="check-circle-o" />}{section.title}</Menu.Item>))}

                </SubMenu>
            </Menu></Affix></Col>
            <Col offset={6}>

                {lessons.map((section) => {
                    let anchors = [];
                    if (currentTab == 'lesson_'+section.id) {
                        const list = <Row key={section.id}>
                            <Col xs={18}>
                                <List
                                    size="small"
                                    header={<div>{section.title}</div>}
                                    dataSource={section.elements}
                                    renderItem={item => {
                                        return <List.Item id={'field' + item.id} style={{height: 50}}
                                                          key={item.id}>{item.id}</List.Item>
                                    }}
                                />
                            </Col>
                            <Col offset={19}>

                                <Anchor offsetTop={10}>
                                    {section.elements.map((item) => (
                                        <Anchor.Link key={item.id} href={'#field' + item.id} title={item.id}/>))}

                                    {/*<Anchor.Link href="#components-anchor-demo-basic2" title="Basic demo 2" />
                                <Anchor.Link href="#components-anchor-demo-basic3" title="Basic demo 3" />*/}
                                </Anchor>
                            </Col>
                        </Row>;

                        return list;
                    }
                })}

                {activities.map((section) => {
                    let anchors = [];
                    if (currentTab == 'section_'+section.id) {
                        const list = <Row key={section.id}>
                            <Col xs={18}>
                                <List
                                    size="small"
                                    header={<div>{section.title}</div>}
                                    dataSource={section.elements}
                                    renderItem={item => {
                                        return <List.Item id={'field' + item.id} style={{height: 50}}
                                                          key={item.id}>{item.id}</List.Item>
                                    }}
                                />
                            </Col>
                            <Col offset={19}>

                                <Anchor offsetTop={10}>
                                    {section.elements.map((item) => (
                                        <Anchor.Link key={item.id} href={'#field' + item.id} title={item.id}/>))}

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
