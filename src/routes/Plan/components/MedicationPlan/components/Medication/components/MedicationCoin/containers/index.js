import React from 'react'
import { connect } from 'react-redux'

import MedicationCoin from '../components'
import { message } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const reportOnMedication = gql`
    mutation medicationReport($id: ID!, $input: MedicationInput!) {
        medication(id:$id, input: $input) {
             id
        }
    }
`;


const withMutation = graphql(reportOnMedication, {
    props: ({ mutate }) => ({
        medicationReport: (input, id) => {
            return mutate({
                variables: { input: input, id: id },
            })
        },
    }),
});


const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: ({id, report}, is_taken, toggleCoin) => {
        /*if (!is_taken) {
            report = {};
        }*/
        report.isTaken = is_taken;
        report.date = ownProps.date;
        ownProps.medicationReport({ report: report}, id)
            .then(({data}) => {
                //const token = data.login.token;
                //const user = data.login.user;
                //console.log(data);

                toggleCoin();

            }).catch((error) => {
            message.error(error.message);
        });
    }

});
export default withMutation(connect(mapStateToProps, mapDispatchToProps)(MedicationCoin));






