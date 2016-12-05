import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from "react-mdl";
import _ from 'lodash';
import { observer } from "mobx-react";
import store from "../../stores/registrationStore";

/**
 * Component modal for registering or updating registration information.
 * DISPLAYS:
 * Inputs for customer first name, last name, phone number
 * Buttons to complete registration, cancel registration, delete registration
 */
@observer
export default class RegistrationModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentRegistration: {}
    };
  }

  render() {
    let props = this.props;
    let { inputStyle, labelStyle } = styles;
    let currentIndex = _.findIndex(store.registrationSlots, { id: props.currentRegistration.id });
    let savedRecord = {};
    if(currentIndex !== -1) savedRecord = store.registrationSlots[ currentIndex ];
    return (
      <Dialog open={props.open}>
        <form className="form-group form-inline">
          <DialogTitle>Register for a test drive</DialogTitle>
          <DialogContent>
            <h3>{props.currentRegistration.timeSlot}</h3>
            <label style={labelStyle} htmlFor="dialogFirstName">First name</label>
            <input onKeyUp={props.handleUpdateRegistrationFirstName.bind(this)}
                   style={inputStyle} className="form-control"
                   type="text"
                   placeholder="First name"
                   id="dialogFirstName"
                   required=""/>
            <label style={labelStyle} htmlFor="dialogLastName">Last name</label>
            <input onKeyUp={props.handleUpdateRegistrationLastName.bind(this)}
                   style={inputStyle}
                   className="form-control"
                   type="text"
                   placeholder="last name" id="dialogLastName"
                   required=""/>
            <label style={labelStyle} htmlFor="dialogPhoneNumber">Phone</label>
            <input onKeyUp={props.handleUpdateRegistrationPhoneNumber.bind(this)}
                   style={inputStyle}
                   className="form-control"
                   minLength="10"
                   min="0" type="number"
                   placeholder="Phone number"
                   id="dialogPhoneNumber"
                   required=""/>
          </DialogContent>
          <DialogActions>
            <button type='submit'
                    style={inputStyle}
                    className="btn btn-lg btn-success"
                    onClick={props.updateSlot.bind(this)}>
              Register for this time!
            </button>
            <button type='button'
                    style={inputStyle}
                    className="btn btn-lg btn-warning"
                    onClick={props.handleCloseDialog}>
              Cancel
            </button>
            {/*Only display Clear Appointment button if there is a registration saved */}
            {savedRecord.firstName &&
            savedRecord.lastName &&
            savedRecord.phoneNumber &&
            <button type='button'
                    className="btn btn-lg btn-danger"
                    onClick={props.handleClearCurrentRegistration.bind(this)}>
              Clear this appointment
            </button>
            }
          </DialogActions>
        </form>
      </Dialog>
    )
  }
};

const styles = {
  inputStyle: {
    marginRight: 15,

  },
  labelStyle: {
    marginRight: 5
  }
};