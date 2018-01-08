/**
 * Created by Pavel on 26.12.2017.
 */
import { connect } from 'react-redux'


import MedicationEditForm from '../components'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
//import { compose } from 'react-apollo';

const medication = gql`
query GET_MEDICATION($user_id: ID!, $id: ID!) {
   account {
  		medicationPlan(user_id: $user_id) {
            medication(id: $id) {
                id,
                startDate,
                endDate,
                sideEffects,
                purpose,
                directions,
                timesPerDay,
                timesPerHour {
                  id,
                  time,
                  quantity
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
 mutation MedicationUpdate($id: ID!, $input: MedicationInput!) {
        medication(id:$id, input: $input) {
             id
        }
    }
`;

const MedicationEditWithQuery = graphql(medication,
    {
        options: (ownProps) => ({
            variables: {
                user_id: ownProps.userId,
                id: ownProps.id
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
                return {loading: data.loading}
            }
        },
    }
)(MedicationEditForm);

const withMutation = graphql(settingUserMutate, {
    props: ({ mutate }) => ({
        updateMedication: input => {
      //      console.log(input);
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
)(MedicationEditWithQuery));