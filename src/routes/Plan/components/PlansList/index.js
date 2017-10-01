import React from 'react';
import PropTypes from 'prop-types';

import Plan from '../../components/Plan';
import ReactPlaceholder from 'react-placeholder';
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders'
import { Container, Row, Col } from 'reactstrap';


// custom placeholder for a list of plans
const planListPlaceholder = (
  <Row>
    <Col xs="12" sm="6" md="4" lg="3">
  <div className="ap-card">
    <div className="ap-card__img">
      <RectShape color="#f2f2f2" style={{width: '100%', height: '100%'}}/>
    </div>
    <div className="ap-card__title">
      <div className="ap-card__title-text">
        <div className="etc2Lines"><TextBlock rows={1} color='#f2f2f2 '/></div>
      </div>
    </div>
  </div>
    </Col>
    <Col xs="12" sm="6" md="4" lg="3">
      <div className="ap-card">
        <div className="ap-card__img">
          <RectShape color="#f2f2f2" style={{width: '100%', height: '100%'}}/>
        </div>
        <div className="ap-card__title">
          <div className="ap-card__title-text">
            <div className="etc2Lines"><TextBlock rows={1} color='#f2f2f2 '/></div>
          </div>
        </div>
      </div>
    </Col>
    <Col xs="12" sm="6" md="4" lg="3">
      <div className="ap-card">
        <div className="ap-card__img">
          <RectShape color="#f2f2f2" style={{width: '100%', height: '100%'}}/>
        </div>
        <div className="ap-card__title">
          <div className="ap-card__title-text">
            <div className="etc2Lines"><TextBlock rows={1} color='#f2f2f2 '/></div>
          </div>
        </div>
      </div>
    </Col>

    <Col xs="12" sm="6" md="4" lg="3">
    <div className="ap-card">
      <div className="ap-card__img">
        <RectShape color="#f2f2f2" style={{width: '100%', height: '100%'}}/>
      </div>
      <div className="ap-card__title">
        <div className="ap-card__title-text">
          <div className="etc2Lines"><TextBlock rows={1} color='#f2f2f2 '/></div>
        </div>
      </div>
    </div>
    </Col>
    <Col xs="12" sm="6" md="4" lg="3">
    <div className="ap-card">
      <div className="ap-card__img">
        <RectShape color="#f2f2f2" style={{width: '100%', height: '100%'}}/>
      </div>
      <div className="ap-card__title">
        <div className="ap-card__title-text">
          <div className="etc2Lines"><TextBlock rows={1} color='#f2f2f2 '/></div>
        </div>
      </div>
    </div>
    </Col>
    <Col xs="12" sm="6" md="4" lg="3">
      <div className="ap-card">
        <div className="ap-card__img">
          <RectShape color="#f2f2f2" style={{width: '100%', height: '100%'}}/>
        </div>
        <div className="ap-card__title">
          <div className="ap-card__title-text">
            <div className="etc2Lines"><TextBlock rows={1} color='#f2f2f2 '/></div>
          </div>
        </div>
      </div>
    </Col>
  </Row>
);

export class PlansList extends React.Component {


  render () {
    const {
      plans, loading, avatarSize,loadMoreEntries
    } = this.props;

    if ( loading) {
      //return (<div>Loading...</div>);
      return (
        <div className='box'>
          <div className="box__header"><h3>ActionPlans</h3></div>
          <div className="box__body">
            <Row>
              <ReactPlaceholder ready={!loading}  showLoadingAnimation customPlaceholder={planListPlaceholder} >
               loading...
              </ReactPlaceholder>
            </Row>
          </div>
        </div>
        );
    }
    //console.log(plans);
    /*plans = [
      {id:1,title:'title1', 'img':'https://kover.ru/upload/resize_cache/iblock/e0e/1100_1100_1/e0e214dd102573b254fd30567d7d3c73.jpg'},
      {id:2,title:'title2', 'img': 'https://kover.ru/upload/resize_cache/iblock/e0e/1100_1100_1/e0e214dd102573b254fd30567d7d3c73.jpg'}
    ];*/

    var rows = [];
    if (!loading) {
      plans.forEach(function (product) {
        rows.push(<Plan info={product} key={product.id}/>);
      });
    }

    //console.log(filters);
    return (
      <div className='box'>
        <div className="box__header"><h3>ActionPlans</h3></div>
        <div className="box__body">
          <Row>
            {rows}
          </Row>

          <div className='pointer' onClick={() => this._prevPage()}>Prev</div>
          <div className='pointer' onClick={loadMoreEntries}>Next</div>
        </div>
      </div>);
  }
}



/*FilterList.componentWillReceiveProps = (nextProps) => {
  console.log(111);
}*/

PlansList.propTypes = {
  //plans: PropTypes.object.isRequired,
};

export default PlansList;
