import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// add placeholders
import ReactPlaceholder from 'react-placeholder';
import { Container, Row, Col} from 'reactstrap';

// adding filters
import FilterList from '../../containers/FilterList';
import PlansList from '../../../Plan/containers/PlansList';

import {
    addLocaleData,
    injectIntl,
    IntlProvider,
    FormattedRelative,
    FormattedMessage,
} from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';
addLocaleData([...en,...ru]);

export const PlanstoreLayout = ({   counter, increment, doubleAsync, loading }) => (
    //<ReactPlaceholder showLoadingAnimation type='media' rows={4} ready={!loading}>
    <IntlProvider locale={navigator.language}>
        <Container>
        <Row>
          <Col xs="12" sm="4" md="3" lg="2"><FilterList /></Col>
          <Col xs="12" sm="8" md="9" lg="10"><PlansList /></Col>
        </Row>
        </Container>
    </IntlProvider>
   // </ReactPlaceholder>

)
//
PlanstoreLayout.propTypes = {
  //counter: PropTypes.number.isRequired,
  //increment: PropTypes.func.isRequired,
  //doubleAsync: PropTypes.func.isRequired,
    //loading: PropTypes.bool,

  /*  data: React.PropTypes.shape({
        loading: React.PropTypes.bool,
        error: React.PropTypes.object,
        plans: React.PropTypes.object,
    }).isRequired,*/
}


export default PlanstoreLayout
