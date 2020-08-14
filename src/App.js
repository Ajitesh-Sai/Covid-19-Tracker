import React from 'react';
import classes from './App.module.css';

import { Cards, Charts, CountryPicker } from './components';
import { fetchData } from './api';
import img from './Image/corona.jpg';
import { StylesProvider } from '@material-ui/core';

class App extends React.Component {
  state = {
    data: {},
    country: '',
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
    
    this.setState({data: fetchedData});
  }

  countryChangeHandler = async(country) => {
    const fetchedData = await fetchData(country);
    
    this.setState({data: fetchedData, country: country});
  }

  render() {

    const { data, country } = this.state; 
    return (
      <div className={classes.container}>
        <img className={classes.image} src={img} alt='Covid-19' />
        <Cards data={data} />
        <CountryPicker countryChangeHandler={this.countryChangeHandler} />
        <Charts data={data} country={country} />      
      </div>
    );
  }
}

export default App;
