import React from 'react'
import { Row, Col, Anchor, Button, Card, List } from 'antd';
import PlanElement from '../../containers/PlanElement'
import {message} from "antd/lib/index";

export class PlanSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
        };
        this.saveSection = this.saveSection.bind(this);
    };

    static propTypes = {
    };

    saveSection = (e, sectionId, isLastSection) => {
        const {upid, date} = this.props;
        this.props.sectionReport(upid, sectionId, date).then(({data}) => {
            if (isLastSection) {
                message.error('Congrats!');
            } else {
                this.props.showNextSection();
            }
        }).catch((error) => {
            message.error(error.message);
        });
    }


   render() {

        const {upid, date, item, isLastSection} = this.props;
        const footer = item.elements !== null && (item.elements.length > 0 || isLastSection)  ? [<Button type="primary" onClick={(e) => this.saveSection(e, item.id, isLastSection)}>{isLastSection ?  'Finish':'Next Section'}</Button>] : [];

       return (<Card title={item.title} bordered={false} actions={footer}>

            {item.elements ? <Row>
                <Col xs={19}><List
                size="large"
                itemLayout="vertical"
                split={false}
                dataSource={item.elements}
                renderItem={item => {
                    return <List.Item
                        id={'field' + item.id}
                        key={item.id}>
                        <PlanElement upid={upid} date={date} element={item} />
                    </List.Item>
                }}
                /></Col>
                <Col xs={4} offset={1}>

                    <Anchor offsetTop={10}>
                        {item.elements !== null && item.elements.map((item) => (

                            item.itemInfo.label && <Anchor.Link key={item.id} href={'#field' + item.id} title={item.itemInfo.label}/>))}

                        {/*<Anchor.Link href="#components-anchor-demo-basic2" title="Basic demo 2" />
                                <Anchor.Link href="#components-anchor-demo-basic3" title="Basic demo 3" />*/}
                    </Anchor>
                </Col>
            </Row>: 'No section content'}

        </Card>)
    }
}



export default PlanSection
