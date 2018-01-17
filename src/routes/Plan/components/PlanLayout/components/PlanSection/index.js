import React from 'react'
import { Button, Card, List } from 'antd';
import PlanElement from '../PlanElement';
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

        const {item, isLastSection} = this.props;
        const footer = item.elements !== null && (item.elements.length > 0 || isLastSection)  ? [<Button type="primary" onClick={(e) => this.saveSection(e, item.id, isLastSection)}>{isLastSection ?  'Finish':'Next Section'}</Button>] : [];

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
            /> : 'No section content'}

        </Card>)
    }
}



export default PlanSection
