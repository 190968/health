import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'react-apollo';

import MedicationCoin from '../components'
import { message } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import LoginForm from "../../../../../../../../User/components/Login";


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
    /**
     * Delete Medication
     */
    deleteMed: (med_id) => {
        // delete medication
        ownProps.medicationDelete(med_id)
            .then(({data}) => {
                //const token = data.login.token;
                //const user = data.login.user;
                //console.log(data);
                //ownProps.report.id = 0;

                //toggleCoin();

            }).catch((error) => {
            message.error(error.message);
        });
    },
    onClick: (med_id, report, is_taken, toggleCoin) => {
        /*if (!is_taken) {
            report = {};
        }*/
        let new_report = {id:report.id};

        new_report.isTaken = is_taken;
        new_report.date = ownProps.date;
        if (ownProps.time) {
            new_report.time = ownProps.time;
        }
        //console.log(new_report);
        ownProps.medicationReport({ report: new_report}, med_id)
            .then(({data}) => {
                //const token = data.login.token;
                //const user = data.login.user;
                //console.log(data);
                //ownProps.report.id = 0;

                toggleCoin();

            }).catch((error) => {
            message.error(error.message);
        });
    }

});

export default withMutation(connect(
    mapStateToProps,
    mapDispatchToProps
)(MedicationCoin));



