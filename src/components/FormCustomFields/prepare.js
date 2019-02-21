
export const prepareRangeInput = value => {
    const min = value[0] || null;
    const max = value[1] || null;
    return {min, max};
}