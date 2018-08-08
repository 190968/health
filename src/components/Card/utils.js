import React from 'react';

export const getCardHeaderDate = (date, title) => {
    if (date.isSame(new Date(), "day")) {
        return 'Today\'s '+title;
    } else {
        return title+' for '+date.format('LL')
    }
}