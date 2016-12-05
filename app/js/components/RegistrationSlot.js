import React, { Component } from 'react';

/**
 * Component for individual time slots
 * Displays time for slot, availability status, registered customer's name
 */
export default class RegistrationSlot extends Component {

  /**
   * Open registration modal and pass in registration object to be updated
   */
  handleOnClick = ()=> {
    this.props.onClick(this.props.schedule);
  };

  render() {
    let schedule = this.props.schedule;
    let { slotStyle } = styles;
    slotStyle.borderColor = schedule.firstName ? "red" : "green";

    return (
      <div onClick={this.handleOnClick}
           className="col-xs-4
                      col-xs-offset-4
                      text-left"
           style={styles.slotStyle}>
        {schedule.timeSlot} {schedule.firstName ? "| " + schedule.firstName + " " + schedule.lastName : ": This time available!"}
      </div>
    )
  }
}

const styles = {
  slotStyle: {
    fontSize: 25,
    marginBottom: 5,
    border: "3px solid",
    borderRadius: 5,
    cursor: "pointer",
    boxShadow: "3px 3px 3px #aaaaaa",
  },
  inputStyle: {}
};