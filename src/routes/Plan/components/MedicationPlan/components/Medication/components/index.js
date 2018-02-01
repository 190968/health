import React from 'react'
import MedicationCoin from './MedicationCoin/containers';
import MedicationInfo from './MedicationInfo/containers';
import { Row, Col } from 'antd';


export class Medication extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isBuilderMode: false,// if this is a builder mode
        };
    };
    static propTypes = {
    };


    render() {

        const {info, date,user_id} = this.props;
        const {id, type, drug, isPersonal, quantity, reports, timesPerDay} = info;
        const {name, dosage} = drug;
      //  console.log(user_id);
//console.log(this.props);
        var rows = [];

        for (var i = 0; i < timesPerDay; i++) {
            let report = reports && reports[i] || {};

            // note: we add a key prop here to allow react to uniquely identify each
            // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
            rows.push(<Col xs={3} key={i}><MedicationCoin med_id={id} userId={user_id} quantity={quantity} report={report} date={date} /></Col>);
        }
        return (
            <Row type="flex" justify="start">
                {type != 'at_times' && <Col xs={6} >
                    <MedicationInfo info={info} date={date} user_id={user_id} />
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
