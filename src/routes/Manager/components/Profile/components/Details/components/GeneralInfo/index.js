import React from 'react';
import {Card, Table} from 'antd';
import moment from 'moment';
import Truncate from 'react-truncate';

export const Details = props => {

    const {patient=[], loading=false} = props;
    const {genderText, age, birthday='', phoneFormatted, addressText, getUserNetwork={}, getAdherence={}, getInsurance={}} = patient;
    //
    const {lastLogin, joinedDate} = getUserNetwork;
    console.log(getAdherence);

    let details = [
        ['Date of Birth', moment(birthday).format('L')],
        ['Age', age],
        ['Gender', genderText],
        ['Phone', phoneFormatted],
        ['Joined on', moment(joinedDate).format('L')],
        ['Last Activity', moment(lastLogin).format('LLL')],
        ['Address', <div>
            <div>
                {addressText}
            </div>
            <div>
                <iframe width="100%"  frameborder="0" style="border:0" scrolling="no" marginheight="0" marginwidth="0" src={"//www.google.com/maps/embed/v1/place?key=AIzaSyALjMjPzo8TvF1SI11GATr0lcVua5iSkmY&q="+ encodeURI(addressText)}></iframe>
            </div>
        </div>],
    ];
    return (<React.Fragment>
        <Card title="General Info">
        {details.map((detail, i) => {
            return detail[0]+':'+detail[1];
        })}
        </Card>


        <Card title="Insurance Info">

        </Card>
    </React.Fragment>)
}

export default Details;