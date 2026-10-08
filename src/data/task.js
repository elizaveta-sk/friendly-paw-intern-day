// @ts-check
export const fp142 = {
  id:'FP-142', title:'Pet birthday treats',
  description:'Send a treat to a regular customer’s pet on its birthday if the address is within 10 miles of the shop; otherwise send a coupon email.',
  ambiguities:[
    {id:'service',question:'Which notification/email service should send the coupon?',answerer:'marcus',consequence:'Wrong integration risks a failed delivery.'},
    {id:'regular',question:'What counts as a regular customer?',answerer:'sofia',consequence:'Customers may receive the wrong benefit.'},
    {id:'distance',question:'Is exactly 10.0 miles inside the radius?',answerer:'marcus',consequence:'Boundary cases fail QA.'},
    {id:'leap-day',question:'How should Feb 29 birthdays work in non-leap years?',answerer:'sofia',consequence:'Birthday messages can disappear once every four years.'}
  ]
};
