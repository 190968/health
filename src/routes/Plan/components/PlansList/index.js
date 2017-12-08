import React from 'react';
import PropTypes from 'prop-types';

import PlanWidget from 'routes/Plan/components/Plan';
import ReactPlaceholder from 'react-placeholder';
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders'
import { Col, Row, Pagination } from 'antd';

import { Box, BoxHeader, BoxHeaderSettings, BoxBody } from 'components/Box';


// custom placeholder for a list of plans
/*const planListPlaceholder = (
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
);*/

export class PlansList extends React.Component {
    changePage = (page) => {
        this.props.loadMoreEntries(page)
    }

  render () {
    const {
      plans, loading, loadMoreEntries
    } = this.props;

    if (loading) {
      //return (<div>Loading...</div>);
      return (
        <div className='box'>
          <div className="box__header"><h3>ActionPlans</h3></div>
          <div className="box__body">
              <ReactPlaceholder ready={!loading}  showLoadingAnimation   >
               loading...
              </ReactPlaceholder>
          </div>
        </div>
        );
    }

    var rows = [];
    if (!loading) {

    }
      /*let headerSettings =  <BoxHeaderSettings>
        sddd
      </BoxHeaderSettings>;
        let headerTitle = <h3>Today's Actionplans</h3>;
        const children = React.Children.toArray(this.props.children);

        children.forEach((child, i) => {
            //console.log(child);
            if (typeof child.type == 'function') {
                switch (child.type.name) {
                    case 'BoxHeaderSettings':
                        headerSettings = child;
                        break;
                    // header settings
                }
            } else if (child.type == 'h3') {
                headerTitle = child;
            }

        });*/
      //console.log(children);
    return (

        <Box>
            <Row gutter={10}>
                {plans.map(function (product) {
                    return <Col key={product.id} xs={24} sm={24} md={12} lg={8} xl={6} span={12}><PlanWidget info={product} key={product.id}/></Col>;
            })}
            </Row>

            <Pagination defaultCurrent={1} total={50} onChange={this.changePage} />
        </Box>);
  }
}


PlansList.propTypes = {
  plans: PropTypes.array.isRequired,
  loading: PropTypes.bool,
   // loadMoreEntries: PropTypes.function.isRequired,
};

export default PlansList;
