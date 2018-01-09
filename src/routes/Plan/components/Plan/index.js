import React from 'react';
import { Card } from 'antd';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
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
    var description = this.props.info.description;
    var img = this.props.info.thumb.small;
    var id = this.props.info.id;
    var upid = this.props.info.upid || 0;

    let link = '/planstore/plan/'+id;
    const is_user = upid > 0;
    // if the link is personal - then open user link
      if (is_user) {
          link = '/plan/'+upid;
      }
    //return (<div>aaa</div>);
    return (
        <Link
          to={link}
        >
            <Card
                cover={<img alt={name} height={154} src={img} />}
                hoverable={true}
            >
                <Card.Meta
                    title={<div style={{height:26, width:150, overflow:'hidden', wordBreak:'break-word'}}>{name}</div>}
                    description={description}
                />

            </Card>
        </Link>
    );
  }
}

export default Plan;