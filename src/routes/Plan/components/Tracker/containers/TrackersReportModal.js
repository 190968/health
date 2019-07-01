import React from 'react';
import { Form, message, Button, Card, Drawer } from 'antd';
import { compose, withHandlers, withProps } from 'recompose';
import Tracker from '../index';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TableWithMessage } from '../../../../../components/Tables';
import { formatTrackerValue } from '../../BiometricPlan/components/TrackerCard/components/TrackerCardValue';
import { withDrawer } from '../../../../../components/Modal';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};




const reportOnTracker = gql`
    mutation trackerReport($id: UID!, $input: TrackerReportInput!) {
        trackerReport(id:$id, input: $input) {
             id
        }
    }
`;


const withMutation = graphql(reportOnTracker, {
    props: ({ ownProps, mutate }) => ({
        trackerReport: (input) => {
            return mutate({
                variables: { input: input, id: ownProps.item.id },
            })
        },
    }),
});


const enhance = compose(
    withMutation,
    withHandlers(({onChange, onClick}) => {
		let timer = null;

		return {
			onChange: props => (value) => {
 

               
    //             props.trackerReport(report).then(() => {
    //                 message.success('Saved');
    //             }).catch(e => {

    //             });
                 
				const { item: measurement , onChange, date} = props;
		
				// let value = event.target.value;
				//console.log(value, 'INputValue');
                
                
                // const report = {value, date:props.date}
				clearTimeout(timer);
		
					timer = setTimeout(() => {
                        //console.log(value);
                        const valueFormatted = formatTrackerValue({measurement, value});
                        const report = {value:valueFormatted, date}
                        props.trackerReport(report).then(() => {
                            message.success('Saved');
                        }).catch(e => {
        
                        });
                    }, 500);
			}
		}
    })
    
    // withHandlers({
    //     onChange: props => value => {


    //         clearTimeout(this.timer);

    //         this.timer = setTimeout(() => {
    //             //console.log(value);
    //             const report = {value, date:props.date}
    //             props.trackerReport(report).then(() => {
    //                 message.success('Saved');
    //             }).catch(e => {

    //             });
    //         }, 500);
    //     }
    // })
);

const TrackerEnhanced = enhance(Tracker);


const TrackersReportModal = ({date='', trackers, loading, onHide}) => {
    console.log(trackers, 'trackers');
    

const columns = [{
    title: 'Tracker',
    dataIndex: 'label',
    key: 'tracker'
  },
  {
    title: 'Report',
    key: 'field',
    width: 150,
    render: tracker => <TrackerEnhanced item={tracker} date={date} />
  },
  {
        title: 'Units',
        dataIndex: 'units',
        key: 'units',
        width: 100,
        render: units => units.name
    }
];

    return  <Card type="table" >
        <TableWithMessage
            emptyMessage={'No Trackers'}
            showHeader={false}
            size="middle" 
            dataSource={trackers} 
            rowKey={'id'} 
            columns={columns}
            loading={loading}
        />
    </Card>

        {/* {trackers.map((option, index) => {
            return (
                <FormItem
                    {...formItemLayout}
                    label={option.label}
                    required={true}
                    key={option.id}
                >
                    <TrackerEnhanced item={option} date={date} />

                </FormItem>
            )
        })} */}
};









const enhance2 = compose(
    withProps(props => {
        const {trackers=[]} = props;
        const modalTitle = trackers.length === 1 ? 'Report on '+(trackers[0].label) : 'Report on following trackers';
        return {modalTitle}
    }),
    withDrawer
);

export default enhance2(TrackersReportModal);