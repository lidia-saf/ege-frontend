import React from 'react';
import { Routes } from '../../routes/Routes';
import './app.css';
import { Header } from '../header';

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Routes />
            </div>
        )
    }

};

export default App;