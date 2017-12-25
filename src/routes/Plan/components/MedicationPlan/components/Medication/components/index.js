import React from 'react'
import MedicationCoin from './MedicationCoin/containers';
import MedicationInfo from './MedicationInfo/components';
import { Table, Row, Col, Icon } from 'antd';
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

        const {info, date} = this.props;
        const {id, type, drug, isPersonal, quantity, reports, timesPerDay} = info;
        const {name, dosage} = drug;
        //console.log(info);
//console.log(this.props);
        var rows = [];

        for (var i = 0; i < timesPerDay; i++) {
            let report = reports && reports[i] || {};

            // note: we add a key prop here to allow react to uniquely identify each
            // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
            rows.push(<Col xs={3} key={i}><MedicationCoin med_id={id} quantity={quantity} report={report} date={date} /></Col>);
        }
        return (
            <Row type="flex" justify="start">
                {type != 'at_times' && <Col xs={6} >
                    <MedicationInfo info={info} />
                </Col>}
                <Col  xs={18} >
                    <Row>
                    {rows}
                    </Row>
                </Col>
            </Row>
        )
    }
}



export default Medication
