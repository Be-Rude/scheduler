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
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers'))
    ]).then((all) => {
      setState(prev => ({ days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, [])
 
  function bookInterview(id, interview) {
    return axios.put(`api/appointments/${id}`, { id, interview })
      .then(response => {

        const days = [...state.days]

        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setState({
          ...state,
          appointments,
          days
        });
      })
        // .catch(err => {
        //   console.log(err);
        // });
      }

  function cancelInterview(id, interview) {
    // console.log(id, interview);
    return axios.delete(`api/appointments/${id}`, { interview })
      .then(response => {
        console.log(response);
      })
    // .catch(err => {
    //   console.log(err);
    // });
  }

  const setDay = (day) => setState({ ...state, day });

  return { state, setDay, bookInterview, cancelInterview }

};