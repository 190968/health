/**
 * Created by Pavel on 26.12.2017.
 */
import { connect } from 'react-redux'


import TrackerModalForm from '../components'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
//import { compose } from 'react-apollo';

const trackerPlan = gql`
query GET_BIOMETRIC_TRACKERPLAN($user_id: ID!) {
   account {
  		biometricPlan(user_id: $user_id) {
  		trackers {
  		  id,
        measurement {
          id
        },
        criticalRange {
          min
          max
        },
        normalRange {
          min
          max
        },
        timesToReport,
        columns
  		}
  		} 
  }
}
`;
const settingUserMutate=gql`
 mutation settingUser( $input:AccountInput!){
        account(input:$input) {
          user {
            first_name
          }
        }
    }
`;

const withQuery = graphql(trackerPlan,
    {
        options: (ownProps) => ({
            variables: {
                user_id: ownProps.user_id,
            }
        }),
        props: ({ ownProps, data }) => {
            //console.log(data);
            if (!data.loading) {
                return {
                    info: data.account.biometricPlan,
                    loading: data.loading
                }
            }
            else {
                return {loading: data.loading,info:12}
            }
        },
    }
)(TrackerModalForm);

const withMutation = graphql(settingUserMutate, {
    props: ({ mutate }) => ({
        updateInfo: input => {
            return mutate({
                variables: {input: {user:input}},
            })},
    }),
});
const mapStateToProps = (state) => {

    return {

    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    // onSubmit: (values) => {
    //     values.birthday = values.birthday.format("YYYY-MM-DD")
    //     values.phone = [values.prefix, values.phone];
    //     delete values.prefix;
    //     console.log(values);
    //     ownProps.updateInfo(values).then(({data}) => {
    //         console.log("----settings----");
    //         console.log(data);
    //     })
    // },
});



export default withMutation(connect(
    mapStateToProps,
    mapDispatchToProps
)(withQuery));