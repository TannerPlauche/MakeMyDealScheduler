/**
 * This component does not work and is not in use.
 * I intended to abstract the modal as its own component.
 * The container view would not update, so I merged it back into the parent view.
 */

import React, {Component} from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions} from "react-mdl";
import {observer} from "mobx-react";
import store from "../../stores/registrationStore";

@observer
export default class RegistrationModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentRegistration: {}
    };
  }

  componentWillReceiveProps(nextProps){
    console.log("next props",nextProps);
    this.setState({
      currentRegistration: nextProps.currentRegistration
    });
  }

  updateSlot(){
    this.props.updateRegistrationSlot(this.state.currentRegistration)
  }

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

  handleCloseDialog() {
    store.closeDialog();
  }

  handleupdateRegistrationSlot() {
    store.updateRegistrationSlot(this.state.currentRegistration);
  }

  handleUpdateRegistrationFirstName(e) {
    this.state.currentRegistration.firstName = e.target.value;
    this.setState({
      currentRegistration: this.state.currentRegistration
    });
  }

  handleUpdateRegistrationLastName(e) {
    this.state.currentRegistration.lastName = e.target.value;
    this.setState({
      currentRegistration: this.state.currentRegistration
    });
  }

  handleClearCurrentRegistration(){
    store.clearRegistrationSlot(this.state.currentRegistration);
  }

  handleUpdateRegistrationPhoneNumber(e) {
    this.state.currentRegistration.phoneNumber = e.target.value;
    this.setState({
      currentRegistration: this.state.currentRegistration
    });
  }

  render() {

    let {inputStyle} = styles;

    return (

      <div className="container text-center">

        <Dialog open={store.dialogIsOpen}>
          <DialogTitle>Register for a test drive</DialogTitle>
          <DialogContent>
            <h3>{this.state.currentRegistration.timeSlot}</h3>
            <form className="form-group form-inline">
              <label htmlFor="dialogFirstName">First name</label>
              <input onKeyUp={this.handleUpdateRegistrationFirstName.bind(this)}
                     style={inputStyle} className="form-control"
                     type="text"
                     placeholder="First name"
                     id="dialogFirstName"/>
              <label htmlFor="dialogLastName">Last name</label>
              <input onKeyUp={this.handleUpdateRegistrationLastName.bind(this)}
                     style={inputStyle}
                     className="form-control"
                     type="text"
                     placeholder="last name" id="dialogLastName"/>
              <label htmlFor="dialogPhoneNumber">Phone</label>
              <input onKeyUp={this.handleUpdateRegistrationPhoneNumber.bind(this)}
                     style={inputStyle}
                     className="form-control"
                     minLength="10"
                     min="0" type="number"
                     placeholder="Phone number"
                     id="dialogPhoneNumber"/>
            </form>
          </DialogContent>
          <DialogActions>
            <button type='button'
                    style={inputStyle}
                    className="btn btn-lg btn-success"
                    onClick={this.updateSlot.bind(this)}>
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
        </Dialog>
      </div>
    )
  }

};

const styles = {
  inputStyle: {
    marginRight: 15,

  }
};