import React, { Component } from 'react';

import ItemList from '../itemList';
import ItemDetails from '../itemDetails';
import ErrorIndicator from '../errorIndicator';

import './peoplePage.css';
import SwapiService from "../../services/swapiService";
import ErrorBoundry from '../errorBoundry'
const Row = ({right, left}) => {
  return (
  <div className="row mb2">
    <div className="col-md-6">
    {left}
    </div>
    <div className="col-md-6">
    {right}
    </div>
  </div>
  )
}



export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: 3,
  };



  onPersonSelected = (selectedPerson) => {
    this.setState({ selectedPerson });
  };

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    const itemList = (
      <ItemList
      onItemSelected={this.onPersonSelected}
      getData={this.swapiService.getAllPeople}
      renderItem={(item) => `${item.name} (${item.gender}, ${item.birthYear})`}/>
      )
    const itemDetails = (
        <ErrorBoundry>
          <ItemDetails personId={this.state.selectedPerson} />
        </ErrorBoundry>
      )


    return (
      
        <Row left={itemList} right={itemDetails}/>
  
    );
  }
}
