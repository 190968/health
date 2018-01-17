import React from 'react'
import { Button, Card, List } from 'antd';
import PlanElement from '../PlanElement';
import {message} from "antd/lib/index";

export class PlanLesson extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
        };
        this.saveLesson = this.saveLesson.bind(this);
    };

    static propTypes = {
    };

    saveLesson = (e, lessonId, isLastlesson) => {
        let haveSections = false;

        //console.log( this.props);
        //return true;
        const {upid} = this.props;
        this.props.lessonReport(upid, lessonId).then(({data}) => {
            if (isLastlesson) {
                const {haveSections} = this.props;
                if (haveSections) {
                    this.props.showFirstSection();
                } else {
                    // do action if no sections.
                }
            } else {
                this.props.showNextLesson();
            }
        }).catch((error) => {
            message.error(error.message);
        });

    }


   render() {

        const {item, isLastLesson, haveSections} = this.props;
        const footer = item.elements  || isLastLesson ? [<Button type="primary" onClick={(e) => this.saveLesson(e, item.id, isLastLesson)}>{isLastLesson ? (haveSections > 0 ? 'Go to Activities' :'Finish'):'Next Lesson'}</Button>] : [];


       return (<Card title={item.title} bordered={false} actions={footer}>
            {item.elements ? <List
                size="large"
                itemLayout="vertical"
                split={false}
                dataSource={item.elements}
                renderItem={item => {
                    return <List.Item
                        id={'field' + item.id}
                        key={item.id}>
                        <PlanElement element={item} />
                    </List.Item>
                }}
            /> : 'No lesson content'}

        </Card>)
    }
}



export default PlanLesson
