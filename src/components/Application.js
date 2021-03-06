import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "../components/Appointment"
import getAppointmentsForDay from "../helpers/selectors"
import getInterview from "../helpers/interviewSelector"
import getInterviewersByDay from "../helpers/getInterviewersByDaySelector"
import useApplicationData from "../hooks/useApplicationData"

//Receives state from useApplicationData component, and returns DaysList & Appointment data to src/index.js to be rendered.
export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  

  const appointmentsList = getAppointmentsForDay(state, state.day);
  const interviewersByDay = getInterviewersByDay(state, state.day);
  const appointmentList = appointmentsList.map((appointment) => {
    

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={getInterview(state, appointment.interview)}
        interviewersByDay={interviewersByDay}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
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
        <nav className="sidebar__menu" >
          <DayList key={state.day.id} days={state.days} day={state.day} setDay={setDay} />
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
    
    

