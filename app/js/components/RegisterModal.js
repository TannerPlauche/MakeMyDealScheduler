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

  render() {
    let props = this.props;
    let {inputStyle, labelStyle} = styles;

    return (
        <Dialog open={props.open}>
          <DialogTitle>Register for a test drive</DialogTitle>
          <DialogContent>
            <h3>{props.currentRegistration.timeSlot}</h3>
            <form className="form-group form-inline">
              <label style={labelStyle} htmlFor="dialogFirstName">First name</label>
              <input onKeyUp={props.handleUpdateRegistrationFirstName.bind(this)}
                     style={inputStyle} className="form-control"
                     type="text"
                     placeholder="First name"
                     id="dialogFirstName"/>
              <label style={labelStyle} htmlFor="dialogLastName">Last name</label>
              <input onKeyUp={props.handleUpdateRegistrationLastName.bind(this)}
                     style={inputStyle}
                     className="form-control"
                     type="text"
                     placeholder="last name" id="dialogLastName"/>
              <label style={labelStyle} htmlFor="dialogPhoneNumber">Phone</label>
              <input onKeyUp={props.handleUpdateRegistrationPhoneNumber.bind(this)}
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
                    onClick={props.updateSlot.bind(this)}>
              Register for this time!
            </button>
            <button type='button'
                    style={inputStyle}
                    className="btn btn-lg btn-warning"
                    onClick={props.handleCloseDialog}>
              Cancel
            </button>
            { props.currentRegistration.firstName && props.currentRegistration.lastName && props.currentRegistration.phoneNumber &&
            <button type='button'
                    className="btn btn-lg btn-danger"
                    onClick={props.handleClearCurrentRegistration.bind(this)}>
              Clear this appointment
            </button>}
          </DialogActions>
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
