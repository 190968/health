import React from 'react';
import { Modal, Form, Spin, Row, Col, Select } from 'antd';
import './index.less';
import { TrackerInput } from '../../../Tracker';
import { FormattedMessage } from 'react-intl';
import { StartEndForm } from '../../../../../../components/FormCustomFields';
import { DrawerFooter } from '../../../../../../components/Modal';
import { TrackerManagerColumns } from './containers/Columns';
const { Option } = Select;
const FormItem = Form.Item;


const formItemLayout = {
    labelCol: {
        xs: { span: 20 },
        sm: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
    }
};

const RangeItem = props => {
    const { title } = props;
    return <div style={{
        marginTop: '-8px',
        display: 'block',
        lineHeight: '1em'
    }}>
        <small style={{ color: '#ccc' }}>{title}</small>
        <div>
            {props.children}
        </div>
    </div>
}


export const TrackerManagerFormFields = props => {
    const { form, formItemLayout, columns: columnsPlan = [], tracker, measurement } = props;
    const { getFieldDecorator } = form || {};

    let { timesToReport } = tracker || {};
    timesToReport = timesToReport > 0 ? timesToReport : 1;
    // console.log(tracker, 'tracker');
    const { startDate, endDate, columns } = tracker || {};
    const { graph, criticalRange, normalRange } = measurement || {};

    const { min: criticalRangeMin, max: criticalRangeMax } = criticalRange || {};
    const { min: normalRangeMin, max: normalRangeMax } = normalRange || {};
    console.log(criticalRangeMin);
    return <>
        <FormItem {...formItemLayout} label="Critical Range">
            <Row>
                <Col span={10}>
                    <RangeItem title={'below'}>{getFieldDecorator('criticalRangeMin', {
                        initialValue: criticalRangeMin
                        /*rules: [{ type:"float" }]*/
                    })(
                        <TrackerInput measurement={measurement} />

                    )}
                    </RangeItem>
                </Col>
                <Col offset={1} span={10}>
                    <RangeItem title={'after'}>{getFieldDecorator('criticalRangeMax', {
                        initialValue: criticalRangeMax
                    })(
                        <TrackerInput measurement={measurement} />
                    )}
                    </RangeItem>
                </Col>
            </Row>
        </FormItem>
        <FormItem {...formItemLayout} label="Normal Range">
            <Row>
                <Col span={10}>
                    <RangeItem title={'below'}>{getFieldDecorator('normalRangeMin', {
                        initialValue: normalRangeMin
                    })(
                        <TrackerInput measurement={measurement} />
                    )}
                    </RangeItem>
                </Col>
                <Col offset={1} span={10}>
                    <RangeItem title={'after'}>{getFieldDecorator('normalRangeMax', {
                        initialValue: normalRangeMax
                    })(
                        <TrackerInput measurement={measurement} />
                    )}
                    </RangeItem>
                </Col>
            </Row>
        </FormItem>

        <FormItem {...formItemLayout} label="Columns">
            {getFieldDecorator('columns', {
                initialValue: columnsPlan.filter(column => columns.includes(column.id)).map(column => {
                    const { id, name } = column || {};
                    return { id, label: name };
                })
            })(
                <TrackerManagerColumns columns={columnsPlan} />
            )}
        </FormItem>

        <FormItem {...formItemLayout} label="Reports per Day">
            {getFieldDecorator('timesToReport', {
                initialValue: timesToReport,
                // rules: [
                //     {
                //         required: true,
                //         message: 'Please Select'
                //     }
                // ]
            })(
                <Select style={{ width: 120 }}>
                    <Option value={1}>1 Time</Option>
                    <Option value={2}>2 Times</Option>
                    <Option value={3}>3 Times</Option>
                    <Option value={4}>4 Times</Option>
                    <Option value={5}>5 Times</Option>
                    <Option value={6}>6 Times</Option>
                    <Option value={7}>7 Times</Option>
                    <Option value={8}>8 Times</Option>
                    <Option value={9}>9 Times</Option>
                </Select>
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="biometric.period" defaultMessage="Period" description="Period" />}
        >
            <StartEndForm
                startDate={startDate}
                endDate={endDate}
                form={form}
            />
        </FormItem>
        <FormItem {...formItemLayout} label="Graph">
            {getFieldDecorator('graph', {
                initialValue: graph
            })(
                <Select style={{ width: 120 }}>
                    <Option value="area">Area</Option>
                    <Option value="line">Line</Option>
                    <Option value="bar">Bar</Option>
                </Select>
            )}
        </FormItem>
    </>;
}

const TrackerManager = props => {
    return (
        <React.Fragment>
            <Form>

                <TrackerManagerFormFields {...props} formItemLayout={formItemLayout} />

            </Form>
            <DrawerFooter onSubmit={props.handleSubmit} onHide={props.onHide} />
        </React.Fragment>
    );
}

export default TrackerManager;
// class EditTrackerForm extends React.Component {
// 	constructor(props) {
// 		super(props);

// 		this.checkEndDate = this.checkEndDate.bind(this);
// 		this.checkEndDate = this.checkEndDate.bind(this);
// 	}

// 	checkEndDate = (rule, value, callback) => {
// 		const form = this.props.form;

// 		const start_date = form.getFieldValue('startDate');

// 		if (start_date && value && value < start_date) {
// 			callback('End date is wrong');
// 		} else {
// 			callback();
// 		}
// 	};

// 	handleSubmit = (e) => {
// 		e.preventDefault();
// 		const { amid, updateTracker } = this.props;

// 		this.props.form.validateFields((err, values) => {
// 			if (!err) {
// 				const {
// 					criticalRangeMin,
// 					criticalRangeMax,
// 					normalRangeMin,
// 					normalRangeMax,
// 					attachDiagnoses,
// 					timesToReport,
// 					graph,
// 					columns,
// 					startDate,
// 					endDate
// 				} = values;

// 				const startDateYMD = startDate.format('YYYY-MM-DD');
// 				const endDateYMD = endDate ? endDate.format('YYYY-MM-DD') : '';
// 				const input = {
// 					amid: amid,
// 					graph: graph,
// 					timesToReport: timesToReport,
// 					criticalRange: { min: criticalRangeMin, max: criticalRangeMax },
// 					normalRange: { min: normalRangeMin, max: normalRangeMax },
// 					columns: columns,
// 					icd10Codes: attachDiagnoses,
// 					startDate: startDateYMD,
// 					endDate: endDateYMD
// 				};

// 				// prepare fields here
// 				//{"details":{ "purpose":"","timesPerDay":"2","quantity":"1.25","takeAt00":"2018-01-11T21:00:00.000Z","quantityTake0":1,"takeAt01":"2018-01-11T21:00:00.000Z"}}.

// 				return updateTracker(input);
// 			}
// 		});
// 	};

// 	render() {

// 	}
// }

// export default EditTrackerForm;
