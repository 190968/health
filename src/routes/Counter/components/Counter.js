import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// add placeholders
import ReactPlaceholder from 'react-placeholder';

export const Counter = ({   counter, increment, doubleAsync, loading }) => (
    <ReactPlaceholder showLoadingAnimation type='media' rows={4} ready={!loading}>
        <div style={{margin: '0 auto'}}>
            <h2>Counter: {counter}</h2>
            <button className='btn btn-primary' onClick={increment}>
                Increment
            </button>
            {' '}
            <button className='btn btn-secondary' onClick={doubleAsync}>
                Double (Async)
            </button>
            <CounterPlans></CounterPlans>
        </div>
    </ReactPlaceholder>

)
//
Counter.propTypes = {
  //counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  doubleAsync: PropTypes.func.isRequired,
    loading: PropTypes.bool,

  /*  data: React.PropTypes.shape({
        loading: React.PropTypes.bool,
        error: React.PropTypes.object,
        plans: React.PropTypes.object,
    }).isRequired,*/
}


export default Counter



const CounterPlans1 = ({plans}) => (
        <div>
        <h2>CounterPlans</h2> {plans.map((item) => { return item.title;})}
        </div>
)

const mapStateToProps2 = (state) => {
    return {
        // view store:
        //currentView:  state.views.currentView,
        // userAuth:
        plans:       state.plans
    };
};

const mapDispatchToProps2 = (dispatch) => {
    return {
    }
};

const CounterPlans =  connect(
    mapStateToProps2,
    mapDispatchToProps2
)(CounterPlans1);
