import React from "react";
import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import useVisualMode from "hooks/useVisualMode"
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "FORM";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE"

//Appointment determines correct mode for component and returns to Application to be rendered.
export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW)
    })
    .catch(err => {
      transition(ERROR_SAVE, true);
    });
  }
  
  function confirmDelete() {
    transition(CONFIRM);
  }

  function deleteappt() {
    const interview = {};
    transition(DELETE, true);
    props.cancelInterview(props.id, interview)
    .then(() => {
      transition(EMPTY)
    })
    .catch(err => {
      transition(ERROR_DELETE, true);
    })    
  }

  function editAppt() {
    transition(EDIT);
  }
  
  return (
    <>
      <Header time={props.time} />
      <article className="appointment" data-testid="appointment">
        {mode === EMPTY && <Empty onAdd={(onClick) => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer.name}
            onEdit={editAppt}
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
        {mode === SAVING && <Status message="Saving" />}
        {mode === DELETE && <Status message="Deleting" change={true} />}
        {mode === CONFIRM && (
          <Confirm onDeleteConfirm={deleteappt} onDeleteCancel={back} />
        )}
        {mode === EDIT && (
          <Form
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewersByDay}
            onSave={save}
            onCancel={back}
          />
        )}
        {mode === ERROR_SAVE && (
          <Error message="Could not Save appointment." onErrorClose={back} />
        )}
        {mode === ERROR_DELETE && (
          <Error message="Could not cancel appointment." onErrorClose={back} />
        )}
      </article>
    </>
  );
}