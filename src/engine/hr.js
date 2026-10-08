// @ts-check
export const hrSchedule = [
  {time:'10:00',person:'jay'}, {time:'11:00',person:'player'}, {time:'12:00',person:'marcus'},
  {time:'13:00',person:'sofia'}, {time:'14:00',person:'player'}, {time:'15:00',person:'dev'}, {time:'16:00',person:'rafa'}
];
export const validateHrSchedule = () => hrSchedule.filter((item) => item.person === 'player').length === 2 && new Set(hrSchedule.map((item) => item.time)).size === hrSchedule.length;
