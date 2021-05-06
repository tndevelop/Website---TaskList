import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);
function AddEditForm(props) {
  //Task paramaters
  const [date, setDate] = useState(props.task ? props.task.deadline : dayjs());
  const [description, setDescription] = useState(
    props.task ? props.task.description : ""
  );
  const [isUrgent, setUrgent] = useState(
    props.task ? props.task.important : false
  );
  const [isPrivate, setPrivate] = useState(
    props.task ? props.task.private : true
  );

  /**
   * Check if description is not empty (only whitespaces not allowed)
   * @returns {boolean}
   */
  const validDescription = () => {
    return description.length !== 0 && description.search(/^\s+$/gm) === -1;
  };
  const validDeadline = () => {
    return date ? date.isSameOrAfter(dayjs(), "day") : true;
  };

  /**
   * Check if fields are valid and submit changes to `taskList`
   * @param {*} event
   */
  const submitChanges = (event) => {
    event.preventDefault();
    if (!validDescription() || !validDeadline()) return;
    if (!props.task)
      props.createElement(description, isUrgent, isPrivate, date);
    else {
      props.delete(props.task);
      props.createElement(description, isUrgent, isPrivate, date);
    }
    props.setHideForm(true);
  };

  return (
    <>
      <Modal
        animation={false}
        show={!props.hideForm}
        onHide={() => props.setHideForm(true)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Insert Task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="selectedTask">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                isInvalid={!validDescription()}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="selectedDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                isInvalid={!validDeadline()}
                type="date"
                value={date ? date.format("YYYY-MM-DD") : ""}
                onChange={(event) =>
                  event.target.value
                    ? setDate(dayjs(event.target.value))
                    : setDate("")
                }
              />
              <Form.Control.Feedback type="invalid">
                Date must be today or after
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                inline
                type="checkbox"
                checked={isPrivate}
                label="is private?"
                id="checkPrivate"
                onChange={(event) => setPrivate(event.target.checked)}
              />
              <Form.Check
                inline
                type="checkbox"
                checked={isUrgent}
                label="is urgent?"
                id="checkUrgent"
                onChange={(event) => setUrgent(event.target.checked)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => props.setHideForm(true)} variant="secondary">
            Close
          </Button>
          <Button onClick={submitChanges} variant="primary">
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { AddEditForm };
