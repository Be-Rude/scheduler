import React from "react";
import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import useVisualMode from "hooks/useVisualMode"
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "FORM";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  // console.log(mode, transition, back)

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {
      transition(SHOW);
      // .catch((err) => {
      //     transition(ERROR_SAVE, true);
      //   });
    })
  }
  
  function confirmDelete() {
    transition(CONFIRM);
  }

  function deleteappt() {
    const interview = {};
    transition(DELETE);
    props.cancelInterview(props.id, interview)
      .then(() => {
      transition(EMPTY)
    })
  }
  
  return (
    <>
      <Header time={props.time} />
      <article className="appointment">
        {mode === EMPTY && <Empty onAdd={(onClick) => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer.name}
            onDelete={confirmDelete}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewersByDay}
            onSave={save}
            onCancel={back}
          />
        )}
        {mode === SAVING && (
        <Status
        message="Saving"
        />
        )}
        {mode === DELETE && (
          <Status
            message="Deleting"
          />
        )}
        {mode === CONFIRM && (
          <Confirm
            onDeleteConfirm={deleteappt}
            onDeleteCancel={back}
          />
        )}
      </article>
    </>
  );
  
}