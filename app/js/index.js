import React, {Component} from 'react';
import reactDOM from 'react-dom';
import ScheduleContainer from './components/ScheduleContainer';
import store from "../stores/registrationStore";


class Main extends Component {

  render() {
    return (
      <div>
        <ScheduleContainer store={store.registrationSlots}/>
      </div>
    )
  };
}

reactDOM.render(<Main/>, document.getElementById("app"));
