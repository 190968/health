import React from 'react';
import { Card, Tooltip } from 'antd';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
//import PropType from 'prop-types'
import PlanElement from '../../components/PlanLayout/components/PlanElement';

import './styles.scss'
export class Plan extends React.Component {
  // fragment for the plan info
  static fragments = {
    plan: gql`
        fragment PlanCardInfo on Plan {
            id,
            title,
            description,
            thumb {
                small,
                medium,
                large,
                wide
            }
        }
    `,
      element: gql`
        fragment PlanElement on PlanBodyElement {
            id
            itemId
            itemType
            reports (date: $date) {
                id
                value,
                date
           }
            itemInfo {
               
                ... on PlanElementChecklist {
                  id
                  label
                  isVertical
                  options {
                    value
                    label
                  }
                }
                ... on PlanElementRadio {
                  id
                  label
                  isVertical
                  options {
                    value
                    label
                  }
                }
                ... on PlanElementTextInput {
                  id
                  label
                  isLong
                  isDate
                  isTime
                }
                
                ... on PlanElementText {
                  id
                  text
                }
                ... on PlanElementLink {
                  id
                  label
                  url
                  description
                }
                
                 ... on Tracker {
                    id
                    label
                    textBefore
                    description
                    units {
                        id
                        name
                    }
                    inputMask
                    targets (date: $date){
                        id
                        title
                        value
                    }
                    reports (date: $date){
                        id
                        time,
                        date
                        reportKey
                        columnId
                        isCritical
                        value
                        comments
                    }
                }
                ... on PlanElementMedia {
                    id
                    label
                    description
                    type
                    source
                    url
                    embedHtml
                }
                ... on PlanElementLine {
                    id
                    height
                    color
                }
            }
             
        }
    `
  }

  static propTypes = {
    //plan: propType(Plan.fragments.plan).isRequired,
    //handleCancel: React.PropTypes.func.isRequired,
  }

  render() {
    var name = this.props.info.title;
    let description = this.props.info.description;
    var img = this.props.info.thumb.small;
    var id = this.props.info.id;
    var upid = this.props.info.upid || 0;

    let link = '/planstore/plan/'+id;
    const is_user = upid > 0;
    // if the link is personal - then open user link
      let height = 154;
      let limit = 25;
      if (is_user) {
          link = '/plan/'+upid;
          //description = '';
          height = 120;
          limit = 15;
      }
      //description = '//return (<div>aaa</div>); //handleCancel: React.PropTypes.func.isRequired';
    return (
        <Link
          to={link}
        >
            <Card
                cover={<img alt={name} height={height} src={img} />}
                hoverable={true}
            >
                <Card.Meta
                    title={<Tooltip title={name}>{name.substring(0, limit)}</Tooltip>}
                    description={<Truncate lines={1}>{description}</Truncate>}
                />

            </Card>
        </Link>
    );
  }
}

export default Plan;