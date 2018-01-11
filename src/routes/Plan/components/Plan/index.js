import React from 'react';
import { Card, Tooltip } from 'antd';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
//import PropType from 'prop-types'

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
                large
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