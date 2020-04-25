import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    // console.log("inside the promise ");
    
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers'))
    ]).then((all) => {
      // console.log("success ");
      // console.log(JSON.stringify(all[1].data))
      setState((prev) => ({
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
        day: "Monday",
      }));
    })
      .catch(err => {
      console.log(err);
        });
  }, [])
 
  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { id, interview })
      .then(response => {
        console.log(response);
        
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        axios.get('/api/days')
          .then((response) => {
          setState((prev) => ({...prev, days: response.data}))
        })
        setState({
          ...state,
          appointments,
        });
      })
        .catch(err => {
          console.log(err);
        });
      }

  function cancelInterview(id, interview) {
    // console.log(id, interview);
    return axios.delete(`api/appointments/${id}`, { interview })
      .then(response => {
        console.log(response)
        axios.get("/api/days").then((response) => {
          setState((prev) => ({ ...prev, days: response.data }));
        });
      })
    .catch(err => {
      console.log(err);
    })
    
  }

  // const setDays = (days) => setState((prev) => ({ ...prev, days }));
  const setDay = (day) => setState({ ...state, day });

  return { state, setDay, bookInterview, cancelInterview }

};