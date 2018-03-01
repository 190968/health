import React from 'react'
import {Row, Col, Button, Card, List, Input } from 'antd';
import PlanElement from '../../containers/PlanElement'
import {message} from "antd/lib/index";
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

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

    static defaultProps = {
        isBuilderMode:false
    }

    saveLesson = (e, lessonId, isLastlesson) => {
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

    updateLabel = (e) => {
        const value = e.target.value;

        console.log(this.props);
        const {client, item, planId} = this.props;
        const {id} = item;
        //

        /*let lesson = client.readFragment({
            id: 'PlanBodyLesson:'+id, // `id` is any id that could be returned by `dataIdFromObject`.
            fragment: gql`
            fragment PlanBodyLessonInfo on PlanBodyLesson {
              title
            }
          `,
        });

        //lesson.title = value;

        console.log(lesson);*/

        client.writeFragment({
            id: 'PlanBodyLesson:'+id, // `id` is any id that could be returned by `dataIdFromObject`.
            fragment: gql`
            fragment PlanBodyLessonInfo on PlanBodyLesson {
              title
            }
            `,
            data: {
                title: value,
                __typename:'PlanBodyLesson'
            },
        });


        clearTimeout(this.timer);

        const updateLessonMutation =  gql`
           mutation updateLessonTitle($id: UID!, $planId: UID!, $title: String!) {
                updatePlanLesson(id:$id, planId: $planId, title: $title) {
                      id,
                      title
                }
            }
            `;


        this.timer = setTimeout(function () {
            client.mutate({mutation: updateLessonMutation, variables: {id:id, planId:planId, title:value}});
        }.bind(this), 500);







        // save the info with some delay
        // save the element title in the DB


/*


        /*const {plan} = client.readQuery({
            query: PLAN_BODY_QUERY,
            variables: {
                id: id,
                upid: upid,
                date: date
            }
        });




        // let element = store.readFragment({
            //     id: 'User:'+userId, // `id` is any id that could be returned by `dataIdFromObject`.
            //     fragment: LoginForm.fragments.user,
            //     fragmentName: 'UserInfo'
            // });


            //element.phoneConfirmed = verifyPhoneConfirm;

            store.writeFragment({
                id: 'User:'+userId,
                fragment: LoginForm.fragments.user,
                fragmentName: 'UserInfo',
                data: {
                    phoneConfirmed: verifyPhoneConfirm,
                    __typename:'User'
                },
            });/*

        */
    }


   render() {

        const {upid, item={}, isLastLesson, haveSections, isBuilderMode} = this.props;
        const footer = !isBuilderMode && (item.elements || isLastLesson) ? [<Button type="primary" loading={this.state.loading}  onClick={(e) => this.saveLesson(e, item.id, isLastLesson)}>{isLastLesson ? (haveSections > 0 ? 'Go to Activities' :'Finish'):'Next Lesson'}</Button>] : [];


        let title = item.title || '';
        if (isBuilderMode) {
            title = <Input defaultValue={item.title} placeholder="Title" onKeyUp={this.updateLabel} />
        }

        return (<Card title={title} bordered={false} actions={footer}>
            {item.elements ? <Row>
                <Col><List
                    size="large"
                    itemLayout="vertical"
                    split={false}
                    dataSource={item.elements}
                    renderItem={item => {
                        return <List.Item
                            id={'field' + item.id}
                            key={item.id}>
                            <PlanElement isBuilderMode={isBuilderMode} upid={upid} element={item} />
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



export default withApollo(PlanLesson)
