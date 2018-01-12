/**
 * Created by Pavel on 26.12.2017.
 */
import { connect } from 'react-redux'


import MedicationEditForm from '../components'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import MedicationCoin from "../../MedicationCoin/components";
//import { compose } from 'react-apollo';

const medication = gql`
query GET_MEDICATION($user_id: ID!, $id: ID) {
            medication(id: $id, userId: $user_id) {
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
                  name
                  dosage
                },
                quantity
            }
}
`;
const settingUserMutate=gql`
 mutation MedicationUpdate($id: ID!, $userId: ID!, $input: MedicationInput!) {
        medicationUpdate(id:$id, userId: $userId, input: $input) {
             id
        }
    }
`;

const MedicationEditWithQuery = graphql(medication,
    {
        options: (ownProps) => {
            //console.log(ownProps);
            return   {
            variables: {
                user_id: ownProps.userId,
                id: ownProps.id,
            },
                fetchPolicy: 'network-only'
        }},
        props: ({ ownProps, data }) => {
            //console.log(data);
            if (!data.loading) {
                return {
                    info: data.medication,
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
        updateMedication: (id, uid, input) => {
            return mutate({
                variables: {id:id, userId:uid, input: input},
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
