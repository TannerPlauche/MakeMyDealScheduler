import {observable} from 'mobx';
import uuid from 'uuid';

export default class RegistrationSlot{
@observable firstName;
@observable lastName;
@observable phoneNumber;

  constructor(timeSlot){
    this.timeSlot = timeSlot;
    this.firstName = "";
    this.lastName = "";
    this.phoneNumber = null;
    this.id = uuid.v4();
  }

};