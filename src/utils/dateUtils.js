// // 添加日期范围
// export function addDateRange(params, dateRange, propName) {
//     let search = params;
//     search.params = typeof (search.params) === 'object' && search.params !== null && !Array.isArray(search.params) ? search.params : {};
//     dateRange = Array.isArray(dateRange) ? dateRange : [];
//     if (typeof (propName) === 'undefined') {
//       search.params['beginTime'] = dateRange[0];
//       search.params['endTime'] = dateRange[1];
//     } else {
//       search.params['begin' + propName] = dateRange[0];
//       search.params['end' + propName] = dateRange[1];
//     }
//     return search;
//   }

export function addDateRange(params,dateRange){
   let search=params
   
   //一般search.params 是走后面，返回一个{} 空对象
   search.params=typeof (search.params) === 'object' && search.params !==null &&  !Array.isArray(search.params) ? search.params :{}
   dateRange = Array.isArray(dateRange)?dateRange:[]

   search.params.beginTime=dateRange[0]
   search.params.endTime=dateRange[1]
   return search
}  