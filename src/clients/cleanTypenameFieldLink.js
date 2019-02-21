import { ApolloLink } from 'apollo-link';
import moment from 'moment';

export const cleanTypenameLink = new ApolloLink((operation, forward) => {
    if (operation.variables) {
      operation.variables = omitDeep (operation.variables, "__typename")
    }
    return forward(operation).map((data) => {
      return data;
    })
  })

const omitDeep = (obj, key)  => {
  const keys = Object.keys(obj)
  const newObj = {}
  keys.forEach((i) => {
    if (i !== key) {
      const val = obj[i];
    //   console.log(val);
    //   console.log(val instanceof Date, 'IS DATE');
    //   console.log(moment.isMoment(val));
      if (val instanceof Date) newObj[i] = val;
      else if (moment.isMoment(val)) newObj[i] = val;
      else if (Array.isArray(val)) newObj[i] = omitDeepArrayWalk(val, key)
      else if (typeof val === 'object' && val !== null) newObj[i] = omitDeep(val, key)
      else newObj[i] = val
    }
  })
  // console.log(obj, 'OLD');
  // console.log(newObj, 'NEW');
  return newObj
}
// const omitDeep = (obj: object, key: string | number): object => {
//     const keys: Array<any> = Object.keys(obj);
//     const newObj: any = {};
//     keys.forEach((i: any) => {
//       if (i !== key) {
//         const val: any = obj[i];
//         if (val instanceof Date) newObj[i] = val;
//         else if (Array.isArray(val)) newObj[i] = omitDeepArrayWalk(val, key);
//         else if (typeof val === 'object' && val !== null) newObj[i] = omitDeep(val, key);
//         else newObj[i] = val;
//       }
//     });
//     return newObj;
//   };

const omitDeepArrayWalk = (arr, key)  =>{
  return arr.map((val) => {
    if (val instanceof Date) return val;
    if (moment.isMoment(val)) return val;
    if (Array.isArray(val)) return omitDeepArrayWalk(val, key)
    else if (typeof val === 'object') return omitDeep(val, key)
    return val
  })
}