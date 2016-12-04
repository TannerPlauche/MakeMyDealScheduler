import React, {Component} from "react";
import {observer} from "mobx-react";
import _ from "lodash"
import RegistrationSlot from "./RegistrationSlot";
import RegisterModal from './RegisterModal';
import store from "../../stores/registrationStore";

@observer
export default class ScheduleContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentRegistration: {
        timeSlot: "",
        firstName: "",
        lastName: "",
        phoneNumber: null
      }
    };
  }

  updateSlot() {
    store.updateRegistrationSlot(this.state.currentRegistration);
  }

  /**
   * Open the registration model
   * set default values for the inputs
   * @param {object} scheduleObj
   */
  handleOpenDialog = (scheduleObj) => {
    _.assign(this.state.currentRegistration, scheduleObj);
    this.setState({
      currentRegistration: this.state.currentRegistration
    }, function () {
      store.openDialog();
      document.getElementById("dialogFirstName").value = this.state.currentRegistration.firstName;
      document.getElementById("dialogLastName").value = this.state.currentRegistration.lastName;
      document.getElementById("dialogPhoneNumber").value = this.state.currentRegistration.phoneNumber;
    })
  };

  /**
   * Cancel the dialog
   */
  handleCloseDialog() {
    store.closeDialog();
  }

  /**
   * Update the registration object currently being edited
   * @param {event} e
   */
  handleupdateRegistrationSlot(e) {
    e.preventDefault();
    store.updateRegistrationSlot(this.state.currentRegistration);
  }

  /**
   * Set the current registration first name property
   * @param {event} e
   */
  handleUpdateRegistrationFirstName(e) {
    this.state.currentRegistration.firstName = e.target.value;
    this.setState({
      currentRegistration: this.state.currentRegistration
    });
  }

  /**
   * Set the current registration last name property
   * @param {event} e
   */
  handleUpdateRegistrationLastName(e) {
    this.state.currentRegistration.lastName = e.target.value;
    this.setState({
      currentRegistration: this.state.currentRegistration
    });
  }

  /**
   * Set the current registration first name property
   * @param {event} e
   */
  handleUpdateRegistrationPhoneNumber(e) {
    this.state.currentRegistration.phoneNumber = e.target.value;
    this.setState({
      currentRegistration: this.state.currentRegistration
    });
  }

  /**
   * Clear the current registration slot
   */
  handleClearCurrentRegistration() {
    store.clearRegistrationSlot(this.state.currentRegistration);
  }

  render() {
    // Create array of RegistrationTimeSlot components
    let registrationSlots = store.registrationSlots.map((registrationSlot, index)=>(
      <RegistrationSlot key={index} id={index} onClick={this.handleOpenDialog.bind(this)} schedule={registrationSlot}/>
    ));

    return (
      <div className="container text-center">
        Schedule your test drive
        <RegisterModal open={store.dialogIsOpen}
                       currentRegistration={this.state.currentRegistration}
                       handleUpdateRegistrationFirstName={this.handleUpdateRegistrationFirstName.bind(this)}
                       handleUpdateRegistrationLastName={this.handleUpdateRegistrationLastName.bind(this)}
                       handleUpdateRegistrationPhoneNumber={this.handleUpdateRegistrationPhoneNumber.bind(this)}
                       updateSlot={this.updateSlot.bind(this)}
                       handleCloseDialog={this.handleCloseDialog.bind(this)}
                       handleClearCurrentRegistration={this.handleClearCurrentRegistration.bind(this)}/>
        <div className="row">
          {registrationSlots}
        </div>
      </div>
    )
  }

};


