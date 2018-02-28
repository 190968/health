import React from 'react'
import { Row, Col,Button, Card, List } from 'antd';
import PlanElement from '../../containers/PlanElement'
import {message} from "antd/lib/index";
import { withRouter } from 'react-router-dom'


export class PlanSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
            loading: false,
        };
        this.saveSection = this.saveSection.bind(this);
        this.clearLoading = this.clearLoading.bind(this);
    };

    static propTypes = {
    };

    static defaultProps = {
        isBuilderMode:false,
        planId:''
    }

    saveSection = (e, sectionId, isLastSection) => {

        const {upid, date, item, history} = this.props;
        this.setState({
            loading:true,
        });
        this.props.sectionReport(upid, sectionId, date).then(({data}) => {
            if (isLastSection) {
                message.success('Congrats!');
                history.push('/');// redirect to the dashboard
            } else {
                message.success(item.title+' is now completed for '+date/*<FormattedDate value={moment(date)}/>*/);
                this.props.showNextSection();
            }

            this.clearLoading();
        }).catch((error) => {
            message.error(error.message);
            this.clearLoading();
        });
    }
    clearLoading() {
        this.setState({
            loading:false,
        });
    }


   render() {

        const {upid, date, item, isLastSection, isBuilderMode, planId} = this.props;
        const footer = item.elements !== null && (item.elements.length > 0 || isLastSection)  ? [<Button type="primary" loading={this.state.loading} onClick={(e) => this.saveSection(e, item.id, isLastSection)}>{isLastSection ?  'Finish':'Next Section'}</Button>] : [];

        return (<Card title={item.title} bordered={false} actions={footer}>

            {item.elements.length > 0 ? <Row>
                <Col xs={22}><List
                size="large"
                itemLayout="vertical"
                split={false}
                dataSource={item.elements}
                renderItem={item => {
                    return <List.Item
                        id={'field' + item.id}
                        key={item.id}>
                        <PlanElement isBuilderMode={isBuilderMode} planId={planId} upid={upid} date={date} element={item} />
                    </List.Item>
                }}
                /></Col>
                {/*<Col xs={4} offset={1}>

                    <Anchor offsetTop={10}>
                        {item.elements !== null && item.elements.map((item) => (

                            item.itemInfo.label && <Anchor.Link key={item.id} href={'#field' + item.id} title={item.itemInfo.label}/>))}
                    </Anchor>
                </Col>*/}
            </Row>: 'No section content'}

        </Card>)
    }
}



export default withRouter(PlanSection);
