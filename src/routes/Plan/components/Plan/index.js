import React from 'react';
import { Row, Col,Tag,Card, Tooltip, Icon, Button } from 'antd';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
//import PropType from 'prop-types'
import './styles.less';

export const Plan = props => {
    const {list=false, wide=false, info} = props;
    const {benefits=[]} = info || {};
    var name = props.info.title;
    let description = props.info.description;
    var img = props.info.thumb.large;
    var id = props.info.id;
    var upid = props.upid || '';
    var ribbon = props.info.ribbon || '';

    let link = '/planstore/plan/'+id;
    const is_user = upid !== '';
    // if the link is personal - then open user link
     // let height = 154;
      //let limit = 25;
      if (is_user) {
          link = '/plan/'+upid;
          //description = '';
         // height = 120;
          //limit = 15;
      }

      if (wide) {
        return (
           
                <Row style={{background: '#fff'}}>
                    <Col span={12}><div> {ribbon && <Tag color="magenta" style={{position:'absolute', top:10, right:0}}>{ribbon}</Tag>}<img alt={name} width={'100%'} style={{minHeight: '100px'}} src={img} /></div></Col>
                    <Col span={12}>
                        <div style={{margin:16, paddingBottom: 34}}>
                            <h1>{name}</h1>
                            <div>
                            <ul>
                                        {benefits.map((el, index) => {
                                            return <li key={index}>{el}</li>;
                                        })}
                                    </ul>
                            <small style={{color: '#ccc'}}><Truncate lines={4}>{description}</Truncate></small>
                            </div>
                        </div>
                    </Col>
                    <div style={{position:'absolute', right: 10, bottom:10}}> <Link style={{width:'100%', color: 'inherit'}}
                to={link}
                
            ><Button type={'primary'}>View<Icon type="right" size={'large'} /></Button>  </Link></div>
                </Row>
          
        );
      }
      if (list) {
          return (
              <Link style={{width:'100%'}}
                  to={link}
              >
                  <Row>
                      <Col span={5}><div> {ribbon && <Tag color="magenta" style={{position:'absolute', top:10, right:0}}>{ribbon}</Tag>}<img alt={name} width={'100%'}  src={img} /></div></Col>
                      <Col offset={1} span={18}>{name}</Col>
                  </Row>
              </Link>
          );
      }
      //description = '//return (<div>aaa</div>); //handleCancel: React.PropTypes.func.isRequired';
    return (
        <Link
          to={link}
        >
            <Card
                cover={<div> {ribbon && <Tag color="magenta" style={{position:'absolute', top:10, right:0}}>{ribbon}</Tag>}<img alt={name} style={{maxHeight:206}} width={'100%'} src={img} /></div>}
                hoverable={true}
                type='plan'
            >

                <Card.Meta
                    title={<Tooltip title={name}><Truncate lines={2}>{name}</Truncate></Tooltip>}
                    description={<Truncate lines={2}>{description}</Truncate>}
                />

                <div className={'viewPlan'}><Icon type="right-circle-o" /></div>
            </Card>
        </Link>
    );
}

export default Plan;