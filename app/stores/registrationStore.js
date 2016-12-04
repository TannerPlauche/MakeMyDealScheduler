import {observable, action} from "mobx";
import RegistrationSlot from "./registrationSlotClass";
import _ from "lodash";

class Store {
  constructor() {
    this.timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
  }

  @observable registrationSlots = this.timeSlots.map(timeSlot => new RegistrationSlot(timeSlot));
  @observable dialogIsOpen = false;

  @action openDialog(){
    this.dialogIsOpen = true;
  }

  @action closeDialog(){
    this.dialogIsOpen = false;
  }

  @action updateRegistrationSlot(updatedObj) {
    Object.assign(_.find(this.registrationSlots, {'id': updatedObj.id}), updatedObj);
    this.closeDialog();
  }

  @action clearRegistrationSlot(updatedObj){
    let clearedRegistrationSlot = _.find(this.registrationSlots, {'id': updatedObj.id});
    let emptyValues = {
      firstName: "",
      lastName: "",
      phoneNumber: null
    };
    _.assign(clearedRegistrationSlot, emptyValues);
    this.closeDialog();
  }

}

var RegistrationStore = window.RegistrationStore = new Store;
export default RegistrationStore;
