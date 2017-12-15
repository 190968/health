import React from 'react'
import MedicationCoin from './MedicationCoin/containers';
import { Divider, Card } from 'antd';
import gql from 'graphql-tag';

export class Medication extends React.Component {

    // fragment for the plan info
    static fragments = {
        medication: gql`
            fragment MedicationCardInfo on Medication {
                id
                drug {
                    name
                    dosage
                    id
                    form
                }
                type
                timesPerDay
                quantity
                directions
                purpose
                sideEffects
                image
                isPersonal
                startDate
                endDate
                reports {
                    id
                    time
                    date
                    __typename
                }
            }
        `
    }

    constructor(props) {
        super(props);
        this.state = {
            isBuilderMode: false,// if this is a builder mode
        };
    };
    static propTypes = {
    };


    render() {

        const {info} = this.props;
        const {id, drug, isPersonal, quantity, reports, timesPerDay} = info;
        const {name, dosage} = drug;

        var rows = [];
        for (var i = 0; i < timesPerDay; i++) {
            const report = reports[i] || {};

            // note: we add a key prop here to allow react to uniquely identify each
            // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
            rows.push(<MedicationCoin key={i} id={id} quantity={quantity} report={report} date={'2017-08-04'} />);
        }
        return (<div>
            {name} ({dosage}) {rows}
        </div>)
    }
}



export default Medication
