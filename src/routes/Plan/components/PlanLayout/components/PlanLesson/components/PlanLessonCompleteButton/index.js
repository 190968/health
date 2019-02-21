import React from 'react';
import {Button } from 'antd';

const PlanLessonCompleteButton = props => {
    const {label, loadingButton, saveLesson} = props;
    return <Button
    type="primary"
    loading={loadingButton}
    onClick={saveLesson}
>
    {label}
</Button>;
}

export default PlanLessonCompleteButton;