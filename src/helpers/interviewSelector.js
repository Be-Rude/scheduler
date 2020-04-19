export default function getInterview(state, interview) {
  const results = {};
  
    if (interview === null) {
      return null;
    }
    
    const interviewerNum = interview.interviewer;
    results.student = interview.student;
    results.interviewer = state.interviewers[interviewerNum];
  
    return results;
  
  };