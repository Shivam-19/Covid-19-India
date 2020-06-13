import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";

export class FirstRow extends Component  {

  constructor(props) {
    super(props)
    this.state ={
      active : '',
      death  : '',
      cured  : '',
      total  : ''
    }
}

      componentDidMount() {
        fetch('http://covid19-india-adhikansh.herokuapp.com/summary')
        .then(res => res.json())
        .then((data) => {
                this.setState({ active: data["Active cases"],
                  death : data.Death,
                  cured : data["Cured/Discharged/Migrated"],
                  total : data["Total Cases"]
              })
      }
        )}

render() {
  return (
  <div>
  <Col lg={3} sm={6}>
    <StatsCard
      bigIcon={<i className="pe-7s-server text-warning" />}
      statsText="Active "
      statsValue= {this.state.active}
      statsIcon={<i className="fa fa-refresh" />}
      statsIconText="Updated now"
    />
  </Col>
  <Col lg={3} sm={6}>
    <StatsCard
      bigIcon={<i className="pe-7s-wallet text-success" />}
      statsText="Death"
      statsValue={this.state.death}
      statsIcon={<i className="fa fa-calendar-o" />}
      statsIconText="Last day"
    />
  </Col>
  <Col lg={3} sm={6}>
    <StatsCard
      bigIcon={<i className="pe-7s-graph1 text-danger" />}
      statsText="Cured"
      statsValue={this.state.cured}
      statsIcon={<i className="fa fa-clock-o" />}
      statsIconText="In the last hour"
    />
  </Col>
  <Col lg={3} sm={6}>
    <StatsCard
      bigIcon={<i className="fa fa-twitter text-info" />}
      statsText="Total Cases"
      statsValue={this.state.total}
      statsIcon={<i className="fa fa-refresh" />}
      statsIconText="Updated now"
    />
  </Col>
  </div>
);
}
}

export default FirstRow;
