import React from "react";
import Button from "../../UI/Button/Button";
import Modal from "../../UI/Modal/Modal";
import classes from "./MyModal.module.css"


const myModal = (props) => {

 
  return (
    <Modal>
      <div className={classes.modal}>
        <div id="myModal" class="modal">
          <div class="modal-content">
            <p>{props.content}</p>
          </div>
        </div>
        <Button onClick={props.onHideModal}>{props.buttonValue}</Button>
        
      </div>
    </Modal>
  );
};

export default myModal;
