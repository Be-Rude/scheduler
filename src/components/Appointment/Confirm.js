import React from "react";

import Button from "../../components/Button"


export default function Confirm(props) {

  const cancel = () => {
    props.onDeleteCancel();
  }

  return (
    <main
      className="appointment__card appointment__card--confirm"
      data-testid="Delete"
    >
      <h1 className="text--semi-bold">Delete the appointment?</h1>
      <section className="appointment__actions">
        <Button onClick={cancel} danger>
          Cancel
        </Button>
        <Button onClick={props.onDeleteConfirm} danger>
          Confirm
        </Button>
      </section>
    </main>
  );
}