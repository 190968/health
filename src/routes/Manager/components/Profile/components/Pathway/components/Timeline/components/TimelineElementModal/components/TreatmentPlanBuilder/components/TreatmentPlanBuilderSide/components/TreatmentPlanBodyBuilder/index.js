import React from 'react';
import { Card, Tag, Button, Row, Col } from 'antd';
import { compose, withState, withHandlers } from 'recompose';
import { DropTarget } from 'react-dnd';
import { TreatmentPlanElements } from './components/TreatmentPlanElements';
//import {TumorboardElements} from "../../../../../../../../../../../../../Tumorboard/components/TumorboardView/components/TumorboardElements";
import { EmptyList } from '../../../../../../../../../../../../../../../../components/Loading';
import Timeline from '../../../../../../../../../../containers/Timeline';
import TreatmentPlanElementAdd from './containers/TreatmentPlanElementAdd';

const TPBodyBuilderPure = (props) => {
	const { canDrop, isOver, connectDropTarget, elements = [], userId, user, loading = false, treatmentPlan, appendElement } = props;
	const isActive = canDrop && isOver;
    //const {elements=[]} = tumorboard;
    console.log(appendElement, 'appendElement');
    const actions = <TreatmentPlanElementAdd user={user} plan={treatmentPlan} onCallback={appendElement} />;
	//console.log(props);
	return (
				<Card type="pure1" title={'Treatment Body'} extra={actions} bodyStyle={{ overflowY: 'auto', height: '100vh', marginTop: 1 }}>
					{canDrop && (
						<div
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								height: '100%',
								background: '#fff',
								opacity: '0.7',
								width: '100%',
								zIndex: 999,
								paddingTop: '20%'
							}}
						>
							<center>
								<Tag color="#87d068">{isActive ? 'Release to drop' : 'Drag a box here'}</Tag>
							</center>
						</div>
					)}

					{elements.length > 0 ? (
						<TreatmentPlanElements elements={elements} editable={true} userId={userId} loading={loading} />
					) : (
						<EmptyList>Drop elements here</EmptyList>
					)}
				</Card>
			
	);
};

const DroppableTPBuilderPure = (props) => {
	const { connectDropTarget, user, onDrop } = props;
	//const isActive = canDrop && isOver;
	return connectDropTarget(
		<div><Row>
            <Col span={'12'}>
            <Timeline user={user} userId={user.id} draggable onDrop={onDrop} onlyFilters={true} ></Timeline>
            </Col>
            <Col span={'12'}>
			<div style={{marginLeft:5}}><TPBodyBuilderPure {...props} /></div>
            </Col>
		</Row>
        <div style={{ textAlign: 'right', marginTop: 10 }}>
						<Button type="primary" onClick={props.doPublish}>
							Almost done
						</Button>
					</div>
                    </div>
	);
};

const boxTarget = {
	drop() {
		return { name: 'treatmentPlan' };
	}
};

const enhance = compose(
	DropTarget('box', boxTarget, (connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop()
	})),
	withHandlers({
       
		doPublish: (props) => (value) => {
            //console.log(props);
			const { elements = [] } = props;
			const finalElements = elements.map((element, i) => {
                const { id, timelineId, notes, activityInput} = element;
                let returnParams = { id, timelineId, notes, element:activityInput };
                if (timelineId) {
                    returnParams.element = null;
                }
				return returnParams;
			});

			props.submitElements(finalElements).then(() => {
				props.setStep(2);
			});
        },
	})
);

export default enhance(DroppableTPBuilderPure);
