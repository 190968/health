/**
 * Created by Pavel on 26.12.2017.
 */
import { connect } from 'react-redux'


import MedicationModalForm from '../component'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
//import { compose } from 'react-apollo';

const medicationPlan = gql`
query GET_MEDICATION_MEDICATIONPLAN($user_id: ID!) {
   account {
  		medicationPlan(user_id: $user_id) {
   medication(id:569) {
    id,
    startDate,
    endDate,
    sideEffects,
    purpose,
    directions,
    timesPerDay,
    timesPerHour {
      id
    },
    type,
    drug {
      id
    },
    quantity

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

const withQuery = graphql(medicationPlan,
    {
        options: (ownProps) => ({
            variables: {
                user_id: 24038
            }
        }),
        props: ({ ownProps, data }) => {
            //console.log(data);
            if (!data.loading) {
                return {
                    info: data.account.medicationPlan,
                    loading: data.loading
                }
            }
             else {
                return {loading: data.loading,info:12}
            }
        },
    }
)(MedicationModalForm);

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