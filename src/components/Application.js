import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "../components/Appointment"
import getAppointmentsForDay from "../helpers/selectors"
import getInterview from "../helpers/interviewSelector"
import getInterviewersByDay from "../helpers/getInterviewersByDaySelector"

export default function Application(props) {
  const [ state, setState ] = useState({
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
    // console.log(id, interview);
    return axios.put(`api/appointments/${id}`, { id, interview })
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
        setState({
          ...state,
          appointments,
        });
      })
      .catch(err => {
        console.log(err);
      });
      }

  const setDay = (day) => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));
  const appointmentsList = getAppointmentsForDay(state, state.day);
  const interviewersByDay = getInterviewersByDay(state, state.day);
  const appointmentList = appointmentsList.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewersByDay={interviewersByDay}
        bookInterview={bookInterview}
        onEdit={"onEdit"}
        onDelete={"onDelete"}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
    
    

