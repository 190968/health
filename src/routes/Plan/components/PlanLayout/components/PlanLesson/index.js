import React from 'react'
import { Button, Card, List } from 'antd';
import PlanElement from '../PlanElement';

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
    }



    render() {

        const {item, isLastLesson, haveSections} = this.props;

        return (<Card title={item.title} bordered={false} actions={[<Button type="primary" onClick={(e) => this.saveLesson(e, item.id, isLastLesson)}>{isLastLesson ? (haveSections > 0 ? 'Go to Activities' :'Finish'):'Next Lesson'}</Button>]}>
            <List
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
            />

        </Card>)
    }
}



export default PlanLesson
