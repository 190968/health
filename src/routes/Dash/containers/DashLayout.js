import { connect } from 'react-redux'
import DashLayout from '../components/DashLayout'

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {

    return {
        current_role: state.network.current_role
    };
};

const mapDispatchToProps = (dispatch) => {
    //console.log(1);
    return {
        /*increment: (info) => {dispatch(increment(info))},
        doubleAsync*/
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashLayout);