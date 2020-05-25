import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../randomPlanet';
import ItemList from '../itemList';
import ItemDetails from '../itemDetails';
import ErrorButton from '../errorButton'
import ErrorIndicator from '../errorIndicator';
import './app.css';
import PeoplePage from '../peoplePage/peoplePage';
import SwapiService from '../../services/swapiService';


export default class App extends Component {
  
  swapiService = new SwapiService()


  state = {
    hasError: false
  }

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    })
  }

  componentDidCatch(){
    console.log('componentDidCatch')
    this.setState({hasError: true})
  }


  render() {

    if(this.state.hasError){
      return <ErrorIndicator />
    }

  return (
    <div>
      <Header />
      <RandomPlanet />
      <ErrorButton />
      <PeoplePage />
      <div className="row mb2">
        <div className="col-md-6">
            <ItemList onItemSelected={this.onPersonSelected} 
                      getData={this.swapiService.getAllPlanets} 
                      renderItem={(item) => item.name}/>
        </div>
        <div className="col-md-6">
            <ItemDetails personId={this.state.selectedPerson}/>
        </div>
      </div>
      <div className="row mb2">
        <div className="col-md-6">
            <ItemList onItemSelected={this.onPersonSelected} 
                      getData={this.swapiService.getAllStarships} 
                      renderItem={(item) => item.name}/>
        </div>
        <div className="col-md-6">
            <ItemDetails personId={this.state.selectedPerson}/>
        </div>
      </div>
    </div>
  );
}
};
