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
    var img = this.props.info.thumb.small;
    var id = this.props.info.id;
    var upid = this.props.info.upid || 0;
    var divStyle = {
      backgroundImage: 'url(' + img + ')'
    }
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
          style={{ minWidth: 200 }}
          className='link dim grow mw4 bg-white ma2 pa3 shadow-1'
        >
            <Card
                cover={<img alt="example" src={img} />}

            >
                {name}
            </Card>
        </Link>
    );
  }
}

export default Plan;