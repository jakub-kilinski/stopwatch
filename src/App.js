import React, {Component} from 'react';
import './App.scss';
import Stopwatch from './Stopwatch';

class App extends Component {
    render() {
        return (
            <div className="container">
                <Stopwatch/>
            </div>
        );
    }
}


export default App;
