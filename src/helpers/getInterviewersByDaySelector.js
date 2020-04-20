export default function getInterviewersByDay(state, day) {
  const results = [];
  const filteredDays = state.days.filter(each => each.name === day);
  
  if (filteredDays.length === 0) {
    results.push();
    return results;
  } 

  for (let each of filteredDays) {
    if (each.name === day){
      let apptVals = each.interviewers.values();
      for (let apptVal of apptVals) {
        results.push(state.interviewers[apptVal])
      }
      console.log(results)
       return results;
    }
  }
};