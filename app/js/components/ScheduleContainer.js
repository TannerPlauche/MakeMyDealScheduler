import React, {Component} from "react";
import {observer} from "mobx-react";
import _ from "lodash"
import {Dialog, DialogTitle, DialogContent, DialogActions} from "react-mdl";
import RegistrationSlot from "./RegistrationSlot";
import store from "../../stores/registrationStore";

@observer
export default class ScheduleContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentRegistration: {}
    };
  }

  /**
   * Open the registration model
   * set default values for the inputs
   * @param {object} scheduleObj
   */
  handleOpenDialog(scheduleObj) {
    store.openDialog();
    _.assign(this.state.currentRegistration, scheduleObj);
    this.setState({
      currentRegistration: this.state.currentRegistration
    }, function () {
      document.getElementById("dialogFirstName").value = this.state.currentRegistration.firstName;
      document.getElementById("dialogLastName").value = this.state.currentRegistration.lastName;
      document.getElementById("dialogPhoneNumber").value = this.state.currentRegistration.phoneNumber;
    })
  }

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
    let registrationSlots = store.registrationSlots.map((registrationSlot, index)=>(
      <RegistrationSlot key={index} id={index} onClick={this.handleOpenDialog.bind(this)} schedule={registrationSlot}/>
    ));

    let {inputStyle} = styles;

    return (

      <div className="container text-center">
        Schedule your test drive

        <Dialog open={store.dialogIsOpen}>
          <DialogTitle>Register for a test drive</DialogTitle>
          <form className="form-group form-inline">

            <DialogContent>
              <h3>{this.state.currentRegistration.timeSlot}</h3>
              <label htmlFor="dialogFirstName">First name</label>
              <input onKeyUp={this.handleUpdateRegistrationFirstName.bind(this)}
                     style={inputStyle} className="form-control"
                     type="text"
                     placeholder="First name"
                     id="dialogFirstName"
                     required/>
              <label htmlFor="dialogLastName">Last name</label>
              <input onKeyUp={this.handleUpdateRegistrationLastName.bind(this)}
                     style={inputStyle}
                     className="form-control"
                     type="text"
                     placeholder="last name" id="dialogLastName"
                     required/>
              <label htmlFor="dialogPhoneNumber">Phone</label>
              <input onKeyUp={this.handleUpdateRegistrationPhoneNumber.bind(this)}
                     style={inputStyle}
                     className="form-control"
                     minLength="10"
                     min="0" type="number"
                     placeholder="Phone number"
                     id="dialogPhoneNumber"
                     required/>

            </DialogContent>
            <DialogActions>
              <button type='submit'
                      style={inputStyle}
                      className="btn btn-lg btn-success"
                      onClick={this.handleupdateRegistrationSlot.bind(this)}>
                Register for this time!
              </button>
              <button type='button'
                      style={inputStyle}
                      className="btn btn-lg btn-warning"
                      onClick={this.handleCloseDialog}>
                Cancel
              </button>
              { this.state.currentRegistration.firstName && this.state.currentRegistration.lastName && this.state.currentRegistration.phoneNumber &&
              <button type='button'
                      className="btn btn-lg btn-danger"
                      onClick={this.handleClearCurrentRegistration.bind(this)}>
                Clear this appointment
              </button>}
            </DialogActions>
          </form>
        </Dialog>
        <div className="row">
          {registrationSlots}
        </div>
      </div>
    )
  }

};

const styles = {
  inputStyle: {
    marginRight: 15,

  }
};

