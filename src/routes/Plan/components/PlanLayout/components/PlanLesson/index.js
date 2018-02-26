import React from 'react'
import {Anchor, Row, Col, Button, Card, List } from 'antd';
import PlanElement from '../../containers/PlanElement'
import {message} from "antd/lib/index";

export class PlanLesson extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
            loading: false,
        };
        this.saveLesson = this.saveLesson.bind(this);
        this.clearLoading = this.clearLoading.bind(this);
    };

    static propTypes = {
    };

    saveLesson = (e, lessonId, isLastlesson) => {
        let haveSections = false;


        //return true;
        const {upid} = this.props;
        this.setState({
            loading:true,
        });
        this.props.lessonReport(upid, lessonId).then(({data}) => {
            if (isLastlesson) {
                const {haveSections} = this.props;
                if (haveSections) {
                    message.success('Last lesson has been completed');
                    this.props.showFirstSection();
                } else {
                    // do action if no sections.
                    message.success('All Lessons has been completed');
                }
                this.clearLoading();
            } else {
                this.clearLoading();
                message.success('Lesson has been completed');
                this.props.showNextLesson();
            }
        }).catch((error) => {
            message.error(error.message);
        });

    }
    clearLoading() {
        this.setState({
            loading:false,
        });
    }


   render() {

        const {upid, item, isLastLesson, haveSections} = this.props;
        const footer = item.elements  || isLastLesson ? [<Button type="primary" loading={this.state.loading}  onClick={(e) => this.saveLesson(e, item.id, isLastLesson)}>{isLastLesson ? (haveSections > 0 ? 'Go to Activities' :'Finish'):'Next Lesson'}</Button>] : [];


       return (<Card title={item.title} bordered={false} actions={footer}>
            {item.elements ? <Row>
                <Col xs={22}><List
                    size="large"
                    itemLayout="vertical"
                    split={false}
                    dataSource={item.elements}
                    renderItem={item => {
                        return <List.Item
                            id={'field' + item.id}
                            key={item.id}>
                            <PlanElement upid={upid} element={item} />
                        </List.Item>
                    }}
                /></Col>
                {/*<Col xs={4} offset={1}>

                    <Anchor offsetTop={10}>
                        {item.elements !== null && item.elements.map((item) => (
                            item.itemInfo.label && <Anchor.Link key={item.id} href={'#field' + item.id} title={item.itemInfo.label}/>))}

                    </Anchor>
                </Col>*/}
            </Row> : 'No lesson content'}

        </Card>)
    }
}



export default PlanLesson
