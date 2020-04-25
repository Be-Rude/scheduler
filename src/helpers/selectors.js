
export default function getAppointmentsForDay(state, day) {
  const results = [];
  const filteredDays = state.days.filter(each => each.name === day);
  
  if (filteredDays.length === 0) {
    return results;
  } 

  for (let each of filteredDays) {
    if (each.name === day){
      let apptVals = each.appointments.values();
      for (let apptVal of apptVals) {
        results.push(state.appointments[apptVal])
      }
       return results;
    }
  }
};




