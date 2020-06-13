/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import { Chart } from "react-google-charts";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {IndiaMapData} from "components/IndiaMapData/IndiaMapData.jsx";
import {FirstRow} from "components/IndiaMapData/FirstRow.jsx";

import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";


class Dashboard extends Component {

  createIndiaMap() {
    var indiaMapDatax = [["State" , "total"]]
    fetch('https://covid19-india-adhikansh.herokuapp.com/states')
    .then(res => res.json())
    .then((data) => {
      for(var i=0; i< data.state.length; i++){
        indiaMapDatax.push([data.state[i].name,data.state[i].total]);
      }
    })
    return indiaMapDatax;
  }

  createPieForIndia(){
    var indiaPie = [["Cases","total"]]
    fetch('http://covid19-india-adhikansh.herokuapp.com/summary')
    .then(res => res.json())
    .then((data) => {
      indiaPie.push(["ActiveCases" , data["Active cases"]]);
      indiaPie.push(["Cured/Discharged/Migrated" , data["Cured/Discharged/Migrated"]]);
      indiaPie.push(["Death" , data.Death]) ;
      this.death = data.Death;
    })
    return indiaPie;
  }

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  createMapData(json) {
    var total = [];
    json.state.map((stateData) => {
      total.push(stateData.name,stateData.total);
    })

  return total;
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <FirstRow/>
          </Row>
         
                <IndiaMapData />

              

         
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
