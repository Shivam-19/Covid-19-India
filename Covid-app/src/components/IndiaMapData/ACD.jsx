import React   from "react";




function ACD() {
  var active = 2
  var death = 0
  var cured = 0

  fetch('http://covid19-india-adhikansh.herokuapp.com/summary')
  .then(res => res.json())
  .then((data) => {

    active = data["Active cases"];
    death = data.Death;
    cured = data["Cured/Discharged/Migrated"];
  })

return this.active;

}

export default ACD
