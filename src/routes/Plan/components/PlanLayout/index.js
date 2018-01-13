import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { arrayChunk, intersperse } from '../../../../utils/main';

import PlanBody from './containers/PlanBody';

import {Icon,Avatar, Card,Row, Col, Button, Tooltip ,Spin, Select,Input, Checkbox } from 'antd';


import {
    FormattedMessage,
    FormattedDate,
} from 'react-intl';
import moment from "moment/moment";

const { Meta } = Card;





export class PlanstorPlanLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            date: props.date
        };
        this.showDate = this.showDate.bind(this);
    };
    static propTypes = {
        plan: PropTypes.object,

    };
    static defaultProps = {
        date:  moment().format('YYYY-MM-DD')
    }
    showDate = (type) => {
        var dateTime = new Date(this.state.date);
        let date = '';
        if (type === 'prev') {
            date = moment(dateTime).add(-1, 'days').format("YYYY-MM-DD");
        } else {
            date = moment(dateTime).add(1, 'days').format("YYYY-MM-DD");
        }
        this.setState({date:date});
        this.props.loadDate(date, this.props.user_id);
    };

    openModal = () => {
        this.setState({modalIsOpen: true});
    }

    hideModal = () => {
        this.setState({modalIsOpen: false});
    }
    toggle = () => {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        });
    }


    planDetails()
    {
        const {plan} = this.props;
        const {start_date, end_date, gender, language, elements, categories} = plan;
        const details = [];
        if (start_date != '') {
            details.push(['Start Date', start_date]);
        }
        if (end_date != '') {
            details.push(['End Date', end_date]);
        }
        if (gender != '') {
            details.push(['Gender', gender]);
        }
        if (gender != '') {
            details.push(['Language', language]);
        }

        if (categories.length > 0) {
            var communities = categories.map(el => {
                return <Link to={'/community/'+el.id} key={el.id}>{el.name}</Link>;
            });
            details.push(['CommunitiesDiscussions', intersperse(communities, ', ')]);
        }
        //console.log(elements);
        if (elements.length > 0) {
            var inside = elements.map(el => {
                return <div key={el[1]}><i className={el[0]+' bump-r'}></i>{el[1]}</div>;
            });
            //console.log(inside);
            details.push(['Inside',inside]);
        }
        //console.log(details);
        const chunks = Math.ceil(details.length/2);
        //console.log(chunks);
        const chunked_arr = arrayChunk(details, chunks);
        const cols = [];
        for (var i=0,j=chunked_arr.length; i<j; i++) {
            //console.log(i);
            cols[i] = chunked_arr[i].map(el => {
                return <Row key={el[0]}>
                    <Col sm="3">
                        <strong>{el[0]}:</strong>
                    </Col>
                    <Col sm="9">
                        {el[1]}
                    </Col>
                </Row>;
                //console.log(el.key);
            });
        }
        //console.log(cols)
        return <Row>
            <Col xs="12" sm="6">
                {cols[0]}
            </Col>
            <Col>{cols[1]}</Col>
        </Row>
    };

    render() {
        const {info, plan, user, loading} = this.props;
        if (loading) {
            // console.log(plan);
            //return (<div>Loading...</div>);
            return (
                <Card loading>
                    aaa
                </Card>
            );
        }
        //console.log(plan);
        //console.log(loading);
        var img = plan.thumb.wide;
        var divStyle = {
            backgroundImage: 'url(' + img + ')'
        }

        return (
            <div>
                <Card
                    title={plan.title}
                    cover={<img alt={plan.title} height={300} src={img} /*https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"*/ />}
                    actions={[<Row><Col><FormattedDate
                        value={new Date(this.state.date)}
                        year='numeric'
                        month='long'
                        day='2-digit'
                    /></Col><Col><Button.Group><Tooltip title={<FormattedMessage id="plan.prev_day" defaultMessage="Previous day" />}><Button size="small" onClick={() => this.showDate('prev')}><Icon type="left" /></Button></Tooltip><Tooltip title={<FormattedMessage id="plan.next_day" defaultMessage="Next day" />}><Button size="small" onClick={() => this.showDate('next')}><Icon type="right" /></Button></Tooltip></Button.Group></Col></Row>, <Icon type="edit" />, <Icon type="ellipsis" />]}
                >
                    <Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={user.first_name + ' '+ user.last_name}
                        description={<FormattedMessage id="userplan.joined" defaultMessage="Joined on {date}" values={{
                            date: <FormattedDate
                                value={new Date(info.joinDate)}
                                year='numeric'
                                month='long'
                                day='2-digit'
                            />
                        }} description="Medications for Today" />}
                    />
                </Card>
            <Card>
                <div className="box">
                    <div className="box__body">
                        <Row>
                            <Col xs="12" sm="4" md="4">
                                <div className="ap-card__img ap-card__img--large" style={divStyle}></div>
                            </Col>
                            <Col xs="12" sm="8" md="8">
                                <div className="ap-card__body">
                                    <div className="ap-card__title ap-card__title--large">
                                        <h1></h1>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>

                <PlanBody id={plan.id}></PlanBody>
            </Card>
            </div>)
    }
}



export default PlanstorPlanLayout
