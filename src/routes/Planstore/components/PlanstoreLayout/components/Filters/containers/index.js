import { connect } from 'react-redux'
import { graphql } from 'react-apollo';
import FolterForm from '../components'

const mapStateToProps = (state) => {


    return {
            qwerty:state
    };
};

// const mapDispatchToProps = (dispatch) => {
//
//
// };

export default connect(mapStateToProps)(FolterForm);