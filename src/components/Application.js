import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "../components/Appointment"
import getAppointmentsForDay from "../helpers/selectors"


// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Mildred Nazir",
//         avatar: "https://i.imgur.com/T2WwVfS.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "3pm",
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sven Jones",
//         avatar: "https://i.imgur.com/twYrpay.jpg",
//       }
//     }
//   }
// ];

export default function Application(props) {
  const [ state, setState ] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  useEffect(() => {
  Promise.all([
    Promise.resolve(axios.get('/api/days')),
    Promise.resolve(axios.get('/api/appointments')),
  ]).then((all) => {
    setState(prev => ({ days: all[0].data, appointments: all[1].data }))
  })
}, [] );

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));
  const appointmentsForDay = getAppointmentsForDay(state, state.day);
  // const interviewersForDay = getInterviewersForDay(state, state.day);
  const appointmentList = appointmentsForDay.map((appointment) => {
    // const interview = getInterview(state, appointment.interview);
    return (
      <>
      <Appointment
        key={appointment.id}
        {...appointment}
        // interview={interview}
        // interviewers={interviewersForDay}
      />
      
      </>
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
        <DayList
         days={state.days}
         day={state.day}
         setDay={setDay}
        />
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
    
    

