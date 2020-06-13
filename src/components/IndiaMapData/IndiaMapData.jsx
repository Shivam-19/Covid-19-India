import React, { Component } from "react";
import { Card } from "components/Card/Card.jsx";
import { Chart } from "react-google-charts";
import { Tasks } from "components/Tasks/Tasks.jsx";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

export class IndiaMapData extends Component {

  constructor(props) {
    super(props)
      this.activecases = 0
    this.state = {
      mapData : [["State" , "total"]],
      selectedState :'Maharashtra',
      selectedRegionForNews :'',
      statePie : [["District","total"]],
      news : []

    }
  }


  //function which is called the first time the component loads
  componentDidMount() {
    this.getIndiaMapData();
  }

  //Function to get the Customer Data from json
  getIndiaMapData() {
    var indiaMapDataAllStates = [["State" , "total"]]
    fetch('https://covid19-india-adhikansh.herokuapp.com/states')
      .then(res => res.json())
      .then((data) => {
        for(var i=0; i< data.state.length; i++){
          indiaMapDataAllStates.push([data.state[i].name,data.state[i].total]);
        }
      this.setState({mapData: indiaMapDataAllStates})
    })
    this.getStatePieData('Maharashtra')
    this.getNews('Maharashtra')
  }

  getStatePieData(stateName){
    
    var statePieDataRow = [["District" , "total"]]
    fetch('https://api.covid19india.org/state_district_wise.json')
      .then(res => res.json())
      .then((data) => {
          Object.entries(data).map(([key,value]) => {
            if (key == stateName) {
              Object.entries(value).map(([key1,value1]) => (
                Object.entries(value1).map(([key2,value2]) => (
                  statePieDataRow.push([key2,value2.confirmed])
                )
                )

          )
              )
            }
             
      }
            
          )
          
      this.setState({statePie: statePieDataRow, selectedState :stateName, selectedRegionForNews :stateName})
      })
  }


  getNews(q) {
    var newsForq = new Array(2)
    fetch('https://newsapi.org/v2/everything?apiKey=208fc0b9d24d4958b371e4e6100f6167&q='+q)
      .then(res => res.json())
      .then((data) => {
        for(var i=0; i< data.articles.length; i++){
          newsForq[i] = new Array(2)
          newsForq[i][0] = ([ data.articles[i].description])
          newsForq[i][1] = ([ data.articles[i].url])
          
        }
      this.setState({news: newsForq})
    })
    this.setState({selectedRegionForNews : q})
  }

  renderNewsTableData(){
    const edit = <Tooltip id="edit_tooltip">Edit Task</Tooltip>;
    const remove = <Tooltip id="remove_tooltip">Remove</Tooltip>;
    
    var tasks = [];
    var number;
      for (var i = 0; i < this.state.news.length; i++) {
        number = "checkbox" + i;
        tasks.push(
        <tr>
         <td>
            <Checkbox
              number={number}
              isChecked={i === 1 || i === 2 ? true : false}
            />
          </td>
          <td><a href = {this.state.news[i][1]}> {this.state.news[i][0]} </a>  </td>
        </tr>
        );
      
    }
    return tasks;
  }

  render() {


      return (
        <div>
        <Row>
        <Col md={8}>
        <Card
          statsIcon="fa fa-history"
          id="chartHours"
          title="India"
          category="Total cases"
          stats="Maharashtra worst Effected"
          content = {
        <div className="ct-chart">
        <Chart
            height = "100%"
            width = "100%"
            chartType="GeoChart"
            data={this.state.mapData}
            options={{
            region: 'IN',
            displayMode: 'regions',
            colorAxis: { colors: ['green', 'blue'] },
            backgroundColor :'#81d4fa',
            resolution : 'provinces'
            }}
            // Note: you will need to get a mapsApiKey for your project.
            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
            mapsApiKey="AIzaSyAl3YnXUi8Xh57_Zr8XzCQLHx6CIiz1n-k"
            rootProps={{ 'data-testid': '2' }}

            chartEvents={[
            {
              eventName: 'select',
              callback: ({ chartWrapper }) => {
                const chart = chartWrapper.getChart()
                const selection = chart.getSelection()
                if (selection.length === 1) {
                  const [selectedItem] = selection
                  const dataTable = chartWrapper.getDataTable()
                  const { row, column } = selectedItem
                  var value =  dataTable.getValue(row,0)
                  this.getStatePieData(value)
                  this.getNews(value)
                 
                }
                console.log(selection)
              },
            },
              ]}

          />
          </div>
           }

           />
       </Col>
       <Col md={4}>
         <Card
           statsIcon="fa fa-clock-o"
           title={this.state.selectedState}
           category="District wise"
           stats="Last updated 1 day ago"
           content={
             <div
               id="chartPreferences"
               className="ct-chart ct-perfect-fourth"
             >
               <Chart
               width={'500px'}
               height={'300px'}
               data={this.state.statePie} chartType="PieChart"
               rootProps={{ 'data-testid': '1' }}

               chartEvents={[
                {
                  eventName: 'select',
                  callback: ({ chartWrapper }) => {
                    const chart = chartWrapper.getChart()
                    const selection = chart.getSelection()
                    if (selection.length === 1) {
                      const [selectedItem] = selection
                      const dataTable = chartWrapper.getDataTable()
                      const { row, column } = selectedItem
                      var value =  dataTable.getValue(row,0)
                      this.getNews(value)
                     
                    }
                    console.log(selection)
                  },
                },
                  ]}
                />
             </div>
           }
           legend={
             <div className="legend">{""}</div>
           }
         />
       </Col>
     </Row>

      <Row>
     

      <Col md={6}>
        <Card
          title={this.state.selectedRegionForNews}
          category="News"
          stats="Updated 3 minutes ago"
          statsIcon="fa fa-history"
          content={
            <div className="table-full-width">
              <Table hover>
              <tbody>
                {this.renderNewsTableData()}
                </tbody>
              </Table>
            </div>
          }
        />
      </Col>
    </Row>
    </div>
      );
    }

}

export default IndiaMapData;
