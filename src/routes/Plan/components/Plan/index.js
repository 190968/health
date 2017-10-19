import React from 'react';
import { Col } from 'reactstrap';
import { gql } from 'react-apollo';
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
    var divStyle = {
      backgroundImage: 'url(' + img + ')'
    }
    var link = '/planstore/plan/'+id;
    //return (<div>aaa</div>);
    return (
      <Col xs="12" sm="6" md="4" lg="3">
        <Link
          to={link}
          style={{ minWidth: 200 }}
          className='link dim grow mw4 bg-white ma2 pa3 shadow-1'
        >
        <div className="ap-card">
          <div className="ap-card__img" style={divStyle}></div>
          <div className="ap-card__title"><div className="ap-card__title-text"><div className="etc2Lines">{name}</div></div></div>
        </div>
        </Link>
      </Col>
    );
  }
}

export default Plan;