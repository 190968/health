import React from 'react';
import { PieChart, Pie, Cell, Label } from 'recharts';
import { Card, Row, Col } from 'antd';
import { withActiveNetwork } from '../../../../../../../../components/App/app-context';
const ProfileAdherence = (props) => {
	const { user } = props;
	const { getAdherence } = user || {};
	// adherence
	const { medications: medAdherence = {}, total: generalAdherence = {} } = getAdherence;

	//console.log(getAdherence);

	const { level: medAdherenceLevel = 0, color: medAdherenceColor = '#8884d8' } = medAdherence || {};
	const { level: generalAdherenceLevel = 0, color: generalAdherenceColor = '#51ade2' } = generalAdherence || {};

	const medData = [
		{ name: 'Medical', key: 'med1', value: medAdherenceLevel, fill: medAdherenceColor },
		{ name: 'Empty', key: 'med2', value: 100 - medAdherenceLevel, fill: '#f2f2f2' }
	];

	const genData = [
		{ name: 'Medical', key: 'med1', value: generalAdherenceLevel, fill: generalAdherenceColor },
		{ name: 'Empty', key: 'med2', value: 100 - generalAdherenceLevel, fill: '#f2f2f2' }
	];
	//console.log(medData);
	return (
		<Card title={'Adherence'}>
			<Row style={{ textAlign: 'center' }}>
				<Col span={12}>
				<PieChart width={85} height={85} style={{margin:'auto'}}>
						<Pie data={genData}  innerRadius={30} outerRadius={40} dataKey={'value'}>
						<Label value={generalAdherenceLevel+'%'} position="center" />
							{genData.map((entry, index) => {
								return <Cell key={index} fill={entry.fill} />;
							})}
						</Pie>
					</PieChart>
					Overall
				</Col>
				<Col span={12}>
					<PieChart width={85} height={85} style={{margin:'auto'}}>
						<Pie data={medData}  innerRadius={30} outerRadius={40} dataKey={'value'}>
						<Label value={medAdherenceLevel+'%'} position="center" />
							{medData.map((entry, index) => {
								return <Cell key={index} fill={entry.fill} />;
							})}
						</Pie>
					</PieChart>
					Medication
				</Col>
			</Row>
		</Card>
	);
};

export default withActiveNetwork(ProfileAdherence);
