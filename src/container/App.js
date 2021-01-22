import React, { Component }from 'react'
//import {robots} from '../robots.js';
import CardList from '../components/CardList';
import SearchBox from '../components/Searchbox';
import '../container/App.css';
import Scroll from '../components/Scroll';
import ErrorBoundle from '../components/ErrorBoundle';
class App extends Component {
  
    constructor() {
        super()
        this.state={
            'robots':[],
            'searchfields':''
        }
    }
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users =>this.setState({robots:users}))
        
    }

    onSearchChange=(event)=>{
        this.setState({ searchfields: event.target.value});
    }
    render(){
        const {robots,searchfields} =this.state;
        const filteredRobots =robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchfields.toLowerCase())
        });
        return !robots.length ?
         <h1 className="tc">Loading</h1>:
          (
                <div className="tc">
                    <h1 className="f1">Robofriends</h1>
                    <SearchBox SearchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundle>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundle>
                    </Scroll> 
                    
                </div>  
            )
        
        
    }
    
}
export default App;
