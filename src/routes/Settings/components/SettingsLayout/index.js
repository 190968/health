import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// add placeholders
import ReactPlaceholder from 'react-placeholder';
import { Container, Row, Col} from 'reactstrap';

// adding filters



class SettingLayou extends React.Component {

    static propTypes = {
        //plan: propType(Plan.fragments.plan).isRequired,
        //handleCancel: React.PropTypes.func.isRequired,
    }

    render() {
      return (<div>Settings here</div>)
    }
}
//
//SettingLayout.propTypes = {
    //counter: PropTypes.number.isRequired,
    //increment: PropTypes.func.isRequired,
    //doubleAsync: PropTypes.func.isRequired,
    //loading: PropTypes.bool,

    /*  data: React.PropTypes.shape({
          loading: React.PropTypes.bool,
          error: React.PropTypes.object,
          plans: React.PropTypes.object,
      }).isRequired,*/
//}


export default SettingLayout
