import React from 'react';
import { Card, Checkbox } from 'antd';
import { BrahmsRulesView } from '../../../../../../../../../../components/Brahms/components/Manager/components/Field';
import { getPlanElementLabelFromElement } from '../../../../../../../../../../components/Plan/utils';

const PlanElementCard = props => {
    const { children, element, showTitle, isBuilderMode, withCompleteCheckmark=false, isPreviewMode=false, extra = {}, plan={} } = props;
    const { footnote = '', reference = '' } = element;
    const {type} = plan;
    const showType = type !== 'ap';
    let bordered = showType;
	let hoverable = isBuilderMode && !isPreviewMode;
	let title = showTitle ? getPlanElementLabelFromElement(element, { isBuilderMode: isBuilderMode, footnote, showType }) : false; //'Add name of'

	if (title && withCompleteCheckmark) {
		title = <React.Fragment>
			<Checkbox style={{marginRight:5}} />
			{title}
		</React.Fragment>;
	}
    //const useExtra = false; //footnote !== '' && reference !== '';

    const showAsPure = (element.type === 'text' || element.type === 'tipbox') && !isBuilderMode || (isBuilderMode && isPreviewMode);
    

    // show pure element
	if (showAsPure) {
		return children;
    }
    
	return (
		<Card title={title} bordered={bordered} hoverable={hoverable} type={element.itemType} extra={extra}>
			{children}

			{/* {((showBrahms === 'question' || showBrahms === 'both') && brahms && brahms.length > 0) && <BrahmsElementOutput rules={brahms} /> } */}
        
			{/* {useExtra && (
				<React.Fragment>
					<Card.Meta description={footnote} />
					<Card.Meta description={reference} />
				</React.Fragment>
			)} */}
		</Card>
	);
};

export default PlanElementCard;
