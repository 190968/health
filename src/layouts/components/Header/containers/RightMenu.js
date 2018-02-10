import { connect } from 'react-redux'
import RightMenu from '../components/RightMenu';


const mapStateToProps = (state) => {
    //console.log(state.network);
    //console.log(state.user);
    return {
        // view store:
        // currentView:  state.views.currentView,
        // userAuth:
        //network: state.network,
        //loading: state.user.loading,
        user: state.user.info,
        token: state.user.token,
        //lastCursor: state.user.info.notifications.pageInfo.endCursor
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(RightMenu);