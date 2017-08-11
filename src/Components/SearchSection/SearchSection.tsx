import * as React from 'react';
import './SearchSection.css';
import axios from 'axios';

let Select = require('react-select');
import 'react-select/dist/react-select.css';


// let data = require('./demo.json');
let vehicles: any[];
let searchedVehicles: any[];
let options = [];

class SearchSection extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      vehicleData: '',
      usrSrch: '',
      showResults: false,
      disabled: false,
      options: options,
      filteredData: [],
      value: [],

    };
    this._getVehiclesFromApiAsync = this._getVehiclesFromApiAsync.bind(this)
  }

  handleSelectChange(value) {
    this.setState({ value });
    //this.state.usrSrch = value;
    //this.search();
  }

  componentWillMount() {
    //vehicles = 
    let self = this;
    axios.get('http://ec2-54-153-65-246.us-west-1.compute.amazonaws.com:4000/api/vehicles')
      .then(function (response) {
        vehicles = response.data;
        self.buildOptions();

      })
      .catch(function (error) {

      });

  }

  componentDidMount() {

  }
  buildOptions() {
    let optionsDataWithDuplicates: any[];
    let optionsDataWithOutDuplicates: any[];
    optionsDataWithDuplicates = [];
    optionsDataWithOutDuplicates = [];
    vehicles.forEach(function (item, index) {
      let series = { 'label': item["SeriesName"], 'value': item["SeriesName"] };
      let modelNumber = { 'label': item["ModelNumber"].toString(), 'value': item["ModelNumber"].toString() }
      optionsDataWithDuplicates.push(series);
      optionsDataWithDuplicates.push(modelNumber);
    });

    optionsDataWithOutDuplicates = this.removeDuplicates(optionsDataWithDuplicates, "label");
    this.setState({ options: optionsDataWithOutDuplicates });
    this.forceUpdate();

  }

  removeDuplicates(arr, key) {
    /* if (!(arr instanceof Array) || key && typeof key !== 'string') {
         return false;
     }*/

    if (key && typeof key === 'string') {
      return arr.filter((obj, index, arr) => {
        return arr.map(mapObj => mapObj[key]).indexOf(obj[key]) === index;
      });

    } else {
      return arr.filter(function (item, index, arr) {
        return arr.indexOf(item) === index;
      });
    }
  }
  _getVehiclesFromApiAsync() {
    let self = this;
    return self.state.filteredData.map((vehicle) => {
      return <tr key={vehicle._id}><td>{vehicle.VIN}</td><td>{vehicle.ModelNumber}</td><td>{vehicle.ModelYear}</td><td>{vehicle.SeriesName}</td><td>{vehicle.UnitIdentifier}</td></tr>
    });
    
     
  }


  async search() {

    let self = this;
    let searchData = (this.state.value.length !== 0) ? this.state.value.split(",") : this.state.value;
    if (searchData.length > 1) {
    await axios.get('http://ec2-54-153-65-246.us-west-1.compute.amazonaws.com:4000/api/vehicles/series/'+searchData[0]+'/model/'+searchData[1])
      .then(function (response) {
        self.state.filteredData = response.data;
        console.log(response.data)
      }).catch(function (error) {});
    } else {
    }

  }

  selectClick(event){
    //const fieldInput = this.refs.fieldInput;
    //event.preventDefault();
    event.stopPropagation();
  }
  _handleSubmit(event) {
    event.preventDefault();
     let self = this;
     this.search()
      setTimeout(function(){
        searchedVehicles = self._getVehiclesFromApiAsync();
        self.state.showResults = true;
        self.forceUpdate();
      },300);
      
      
  }
  handleChange(event) {
    if (event.target.value === '') {
      //this.state.showResults = false;
    }
    this.setState({ usrSrch: event.target.value });

  }




  render() {

    let boxClass = ["pt-table .modifier hide"];
    let noRecordClass = ["hide"];
    if (this.state.showResults) {
      boxClass.push('show');
    } else {
      if (boxClass[2] !== undefined && boxClass[2] === 'show') {
        boxClass.pop();
      }

    }
    if (searchedVehicles !== undefined && searchedVehicles.length === 0) {
      noRecordClass.pop();
    }
    return (
      <div>
        <form onSubmit={this._handleSubmit.bind(this)}>
          <div className="SearchSection pt-align-left">
            <h5>Search Vehicle Details:</h5>
            <div onClick={this.selectClick.bind(this)}>
            <Select ref='fieldInput' onMouseDown={this.state.open = false} multi simpleValue disabled={this.state.disabled} value={this.state.value} placeholder="Hint: Series, Model" options={this.state.options}  onChange={this.handleSelectChange.bind(this)} />
</div>

            <br />
            <br />
            <h5>Search Location:</h5>
            <div className="SearchLocation LocationFiter">
              <label className="pt-control pt-checkbox pt-inline">
                <input type="checkbox" />
                <span className="pt-control-indicator" />
                Internal
</label>
              <label className="pt-control pt-checkbox pt-inline">
                <input type="checkbox" />
                <span className="pt-control-indicator" />
                External
</label>
              <label className="pt-control pt-checkbox pt-inline">
                <input type="checkbox" />
                <span className="pt-control-indicator" />
                District 1
</label>
              <label className="pt-control pt-checkbox pt-inline">
                <input type="checkbox" />
                <span className="pt-control-indicator" />
                Broward Country
</label>
              <label className="pt-control pt-checkbox pt-inline">
                <input type="checkbox" />
                <span className="pt-control-indicator" />
                District 3
</label>
            </div>
            <br />
            <br />
            <button type="submit" className="pt-button pt-intent-primary">Search</button>
            <br />
            <br />
            <div className = "">
              <table className={boxClass.join(' ')} >
                <thead>
                  <tr>
                    <th>VIN</th>
                    <th>Model Number</th>
                    <th>Model year</th>
                    <th>Series name</th>
                    <th>Unit identifier</th>
                  </tr>
                </thead>
                <tbody>
                  {searchedVehicles}
                  <tr className={noRecordClass.join(' ')}><td colSpan={5} className="noRecords">No Record Found</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </form>

      </div>
    );
  }
}


export default SearchSection;