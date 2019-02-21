import React from 'react';
import { Card,List, Row, Col, Divider } from 'antd';
import moment from 'moment';
import'./index.less';

export const CategoryNewWrapper = (props) => {

            const {info, loading} = props;
            if (loading) {
                return (
                    <Card loading>Loading!!!</Card>
                );
            }
            const {totalCount, edges} = info;
            const title = "Health News";
            const count = totalCount > 0 ? " (" + totalCount + ")" : "";
            return (
                <Card title={title + count}>
                    <List
                        loading={loading}
                        className={'newsList'}
                        //itemLayout="vertical"
                        dataSource={edges}
                        renderItem={item => {
                            const {thumb, title, text, createdAt, sourceTitle, sourceUrl} = item;

                            return <List.Item 
                            key={item.id} 
                            //extra={<img   alt={title} src={thumb} />}
                        ><Row style={{width:'100%'}}>
                                <Col sm={6}><img alt={title} style={{width: '100%'}} src={thumb} /></Col>
                                <Col offset={1} sm={17}>
                                <h4 style={{fontWeight: 'bold', marginBottom:0}}>{title}</h4>
                                <div style={{fontSize:'0.8em', color: '#ccc', marginBottom: 10}}>
                                    {createdAt && moment(createdAt).format('lll') }
                                    <Divider type="vertical" />
                                    {sourceUrl ? <a href={sourceUrl} target={'_blank'}>{sourceTitle}</a> : sourceTitle}
                                </div>
                                <div dangerouslySetInnerHTML={{__html: text}} />
                                </Col>
                            </Row></List.Item>;
                            return <List.Item 
                                key={item.id} 
                                //extra={<img   alt={title} src={thumb} />}
                            >
                            <List.Item.Meta
                                title={title}
                                description={<span dangerouslySetInnerHTML={{__html: text}} />}
                            />
                            
                            </List.Item>;
                        }}
                    />
                </Card>
            );
    }

export default CategoryNewWrapper;
