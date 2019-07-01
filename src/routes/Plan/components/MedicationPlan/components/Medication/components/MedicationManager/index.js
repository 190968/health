import React from 'react';
import {
    FormattedMessage,
} from 'react-intl';

import moment from 'moment';
import { Table, Form, Radio, Select, Input } from 'antd';
import { StartEndForm, TimeField } from "../../../../../../../../components/FormCustomFields";
import { DrawerFooter } from '../../../../../../../../components/Modal';
import { formatTimeForField } from '../../../../../../../../components/Other/utils';

const { Option } = Select;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const formItemLayoutDefault = {
    labelCol: {
        xs: { span: 20 },
        sm: { span: 5 },

    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 5,
        },
    },
};


export const MedicationManagerFormFields = props => {
    const { form, medication, formItemLayout = formItemLayoutDefault } = props;
    const { getFieldDecorator, getFieldValue, getFieldsValue, getFieldError, getFieldsError } = form;

    let { medicationType, timesPerDay, timesPerHour = [], quantity, startDate, endDate, purpose, sideEffects, directions } = medication || {};

    if (timesPerDay === 0) {
        timesPerDay = 1;
    }

    const { timesNum = 0 } = props;

    // const typeSelected = getFieldValue('type') !== "";

    const timesPerHourError = getFieldError('timesNum');
    // const timesPerDayError = getFieldError('timesPerHour');
    const timesAtHoursError = getFieldError('timesPerHour');
    //const formErrors = getFieldsError();

    const enteredType = getFieldValue('medicationType') || medicationType;

    return <>
        <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="user.settings.basic.title" defaultMessage="Regimen"
                description="Regimen" />}
        >
            {getFieldDecorator('medicationType', {
                initialValue: medicationType,
                rules: [{
                    required: true, message: 'Please Select',
                }],
            })(
                <RadioGroup onChange={props.onTotal}>
                    <RadioButton value="at_times">At specific times</RadioButton>
                    <RadioButton value="along_day">Along the day</RadioButton>
                    <RadioButton value="as_needed">As needed</RadioButton>
                </RadioGroup>
            )}
        </FormItem>

        {enteredType === "at_times" &&
            <React.Fragment>
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage id="medication.times_per_day" defaultMessage="Times per Day" description="Times per Day" />}
                    help={timesPerHourError || ''}
                    validateStatus={timesPerHourError ? 'error' : ''}
                >
                    <TimesSelector onSelectTimes={props.onSelectTimes} getFieldDecorator={getFieldDecorator} value={timesNum} name={'timesNum'} />
                </FormItem>
                {timesNum > 0 && <FormItem
                    {...formItemLayout}
                    label={'Dosage'}
                >
                    <TakeAtTimesTable timesNum={timesNum} timesPerHour={timesPerHour} getFieldDecorator={getFieldDecorator} errors={timesAtHoursError} getFieldsValue={getFieldsValue} />
                </FormItem>}
            </React.Fragment>}

        {enteredType && enteredType !== "at_times" && <FormItem
            {...formItemLayout}
            label={'Dosage'}
        >
            <TakeDailyTable timesPerDay={timesPerDay} quantity={quantity} getFieldDecorator={getFieldDecorator} onSelectTimes={props.onSelectTimes} onTotal={props.onTotal} errors={getFieldsError()} />
        </FormItem>
        }


        <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="medication.period" defaultMessage="Period" description="Period" />}
        >
            <StartEndForm startDate={startDate} endDate={endDate} form={props.form} />
        </FormItem>

        {/*<FormItem
                    {...formItemLayout}
                    label={<FormattedMessage id="user.settings.basic.tdegsiftdle" defaultMessage="Image"
                                             description="Image"/>}
                >
                    {getFieldDecorator('purpose', {
                        initialValue: '',
                    })(
                        <Col>
                            <a>Browse</a>
                            <p>Min. dimensions: 150x150px</p>
                        </Col>
                    )}
                </FormItem>*/}

        {!props.showAdvance ?
            <FormItem
                {...tailFormItemLayout}
            >
                <a onClick={props.toggleAdvanced}>Advanced</a>
            </FormItem>
            :
            <div>
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage id="user.settings.basic.tdgsiftdle" defaultMessage="Purpose"
                        description="Purpose" />}
                >
                    {getFieldDecorator('purpose', {
                        initialValue: purpose,
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage id="user.settings.basic.tdsitfdle1" defaultMessage="Directions"
                        description="Directions" />}
                >
                    {getFieldDecorator('directions', {
                        initialValue: directions,
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage id="user.settings.basic.tddsitdle1"
                        defaultMessage="Side Effects" description="Side Effects" />}
                >
                    {getFieldDecorator('sideEffects', {
                        initialValue: sideEffects,
                    })(
                        <Input />
                    )}
                </FormItem>
            </div>

        }
    </>;
}
const MedicationManager = props => {

    return (<React.Fragment>
        <Form>
            <MedicationManagerFormFields {...props} />

        </Form>
        <DrawerFooter onSubmit={props.onSubmit} onHide={props.onHide} />
    </React.Fragment>
    );
}

export default MedicationManager;

const TakeAtTimesTable = props => {
    const { timesNum, timesPerHour, getFieldDecorator, getFieldsValue, errors = [] } = props;
    // console.log(errors, 'errors');
    const columns = [{
        title: 'At Times',
        dataIndex: 'time',
        key: 'time',
        width: 200,
        render: (time, info) => {
            const { i, lastTime } = info;
            const err = errors[i] || {};
            const errText = err.time || false;
            // console.log(err);
            // console.log(time);
            // console.log(formatTimeForField(time));
            return <FormItem
                help={errText || ''}
                validateStatus={errText ? 'error' : ''}
            >
                {getFieldDecorator('timesPerHour[' + i + '][time]', {
                    initialValue: time,
                    rules: [{
                        required: true, message: 'Select Time',
                    }],
                })(
                    <TimeField minuteStep={5} use12Hours={true}
                        disabledHours={() => getDisabledHours(lastTime)}
                        disabledMinutes={(selectedHour) => getDisabledMinutes(selectedHour, lastTime)}
                    />
                )}</FormItem>;
        }
    }, {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (quantity, info) => {
            const { i } = info;
            const err = errors[i] || {};
            console.log(err);
            const errText = err.quantity || false;
            return <FormItem
                help={errText || ''}
                validateStatus={errText ? 'error' : ''}
            >
                <QuantitySelector getFieldDecorator={getFieldDecorator} value={quantity} name={'timesPerHour[' + i + '][quantity]'} /></FormItem>;
        }
    }];







    let dataSource = [];

    let lastTime = null;


    const timesAtHourExisted = getFieldsValue()['timesPerHour'];
    // if we selected at times
    for (let i = 0; i < timesNum; i++) {

        // check if we have times per hour
        let timePerHour = timesPerHour[i] || false;
        //console.log(timePerHour);
        if (!timePerHour) {
            //console.log(lastTime, 'lastTime');
            const { time: timeExisted } = timesAtHourExisted && timesAtHourExisted[i] || {};
            let newTime = '';
            if (timeExisted) {
                newTime = timeExisted;
            } else {
                //console.log(timeExisted);

                //( ?  : moment().set({hour:0,minute:0,second:0,millisecond:0}))
                if (lastTime) {
                    newTime = lastTime.clone();
                    newTime.add(1, 'hour');

                    //console.log('create from last time');
                    //lastTime = newTime;
                } else {
                    //console.log('create new');
                    newTime = moment().set({ hour: 9, minute: 0, second: 0, millisecond: 0 });
                }
            }

            //console.log(newTime.format('llll'), 'newTime');
            // console.log((lastTime ?lastTime.add(1, 'hour') : moment('00:00:00', format)));
            timePerHour = { time: newTime, quantity: 1 };
            // console.log(timePerHour, 'timePerHour');
        } else {
            // console.log(timePerHour);
            // timePerHour = { ...timePerHour, time: moment(timePerHour.time, format) };
            timePerHour = { ...timePerHour, time: formatTimeForField(timePerHour.time, { isUTC: true }) };
        }
        //console.log(timePerHour);


        let { time, quantity } = timePerHour;
        // console.log(time,'time');
        // console.log(lastTime, 'lastTime');
        // console.log(lastTimeTmp, 'lastTimeTmp');
        //time = moment(time, format);

        dataSource.push({ time, quantity, i, lastTime });
        lastTime = time;
    }


    // console.log(dataSource);





    return <Table dataSource={dataSource} rowKey={'i'} columns={columns} size={'small'} pagination={false} />;

}

const getDisabledHours = (lastTime) => {
    if (!lastTime) {
        return null;
    }
    //console.log(lastTime);
    var hours = [];
    const hour = lastTime.hour();
    for (var i = 0; i < hour; i++) {
        hours.push(i);
    }
    //console.log(hours);
    return hours;
}
const getDisabledMinutes = (selectedHour, lastTime) => {
    if (!lastTime) {
        return null;
    }

    var minutes = [];
    const hour = lastTime.hour();
    if (selectedHour === hour) {
        const minute = lastTime.minute();
        for (var i = 0; i <= minute; i++) {
            minutes.push(i);
        }
    }
    return minutes;

}

const TakeDailyTable = props => {
    const { timesPerDay, quantity, getFieldDecorator, errors } = props;
    // console.log(errors);
    const columns = [{
        title: 'Take',
        dataIndex: 'timesPerDay',
        key: 'timesPerDay',
        width: 200,
        render: (timesPerDay) => {
            const errText = errors['timesPerDay'] || false
            return <FormItem
                help={errText || ''}
                validateStatus={errText ? 'error' : ''}
            >
                <TimesSelector onSelectTimes={props.onSelectTimes} getFieldDecorator={getFieldDecorator} value={timesPerDay} name={'timesPerDay'} />
            </FormItem>
        }
    }, {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (quantity) => {
            const errText = errors['quantity'] || false
            return <FormItem
                help={errText || ''}
                validateStatus={errText ? 'error' : ''}
            >
                <QuantitySelector getFieldDecorator={getFieldDecorator} value={quantity} name={'quantity'} />
            </FormItem>
        }
    }];
    return <Table dataSource={[{ timesPerDay: timesPerDay, key: 1, quantity }]} columns={columns} size={'small'} pagination={false} />;
}

const TimesSelector = props => {
    const { getFieldDecorator, name, value } = props;
    return getFieldDecorator(name, {
        initialValue: value > 0 ? value : undefined,
        rules: [{
            required: true, message: 'Please Select',
        }],
    })(<Select onSelect={props.onSelectTimes} placeholder="Select times" style={{ width: 200 }} >
        <Option value={1}>1 Time</Option>
        <Option value={2}>2 Times</Option>
        <Option value={3}>3 Times</Option>
        <Option value={4}>4 Times</Option>
        <Option value={5}>5 Times</Option>
    </Select>);
}
const QuantitySelector = props => {
    const { getFieldDecorator, name, value } = props;
    return getFieldDecorator(name, {
        initialValue: value,
        rules: [{
            required: true, message: 'Select Quantity',
        }],
    })(<Select placeholder="Quantity" style={{width:'100%'}}  /*onChange={props.onTotal}*/ >
        <Option value={0.25}>¼</Option>
        <Option value={0.50}>½</Option>
        <Option value={0.75}>¾</Option>
        <Option value={1}>1</Option>
        <Option value={1.25}>1¼</Option>
        <Option value={1.50}>1½</Option>
        <Option value={1.75}>1¾</Option>
        <Option value={2}>2</Option>
        <Option value={2.25}>2¼</Option>
        <Option value={2.50}>2½</Option>
        <Option value={2.75}>2¾</Option>
        <Option value={3}>3</Option>
        <Option value={3.25}>3¼</Option>
        <Option value={3.50}>3½</Option>
        <Option value={3.75}>3¾</Option>
        <Option value={4}>4</Option>
        <Option value={4.25}>4¼</Option>
        <Option value={4.50}>4½</Option>
        <Option value={4.75}>4¾</Option>
        <Option value={5}>5</Option>
        <Option value={5.25}>5¼</Option>
        <Option value={5.50}>5½</Option>
        <Option value={5.75}>5¾</Option>
        <Option value={6}>6</Option>
        <Option value={6.25}>6¼</Option>
        <Option value={6.50}>6½</Option>
        <Option value={6.75}>6¾</Option>
        <Option value={7}>7</Option>
        <Option value={7.25}>7¼</Option>
        <Option value={7.50}>7½</Option>
        <Option value={7.75}>7¾</Option>
        <Option value={8}>8</Option>
        <Option value={8.25}>8¼</Option>
        <Option value={8.50}>8½</Option>
        <Option value={8.75}>8¾</Option>
        <Option value={9}>9</Option>
        <Option value={9.25}>9¼</Option>
        <Option value={9.50}>9½</Option>
        <Option value={9.75}>9¾</Option>
    </Select>);
}