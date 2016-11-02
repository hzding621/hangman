import React, { Component } from 'react';
import SearchFood from './component/food/SearchFood';
import SelectedFood from './component/food/SelectedFood';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFoods: [],
    };
  }
  render() {
    return (
      <div className='App'>
        <div className='ui text container'>
          <SelectedFood
            foods={this.state.selectedFoods}
            onFoodRemove={
              (idx) => (
                this.setState({
                  selectedFoods: [
                    ...this.state.selectedFoods.slice(0, idx),
                    ...this.state.selectedFoods.slice(
                      idx + 1, this.state.selectedFoods.length
                    ),
                  ],
                })
              )
            }
          />
          <SearchFood
            onFoodSelect={
              (food) => (
                this.setState({
                  selectedFoods: this.state.selectedFoods.concat(food),
                })
              )
            }
          />
        </div>
      </div>
    );
  }
}

export default App;
