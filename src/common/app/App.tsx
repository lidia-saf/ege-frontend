import React from 'react';
import { Routes } from '../../routes/Routes';
import './app.css';
import { Header } from '../header';
import AuthProvider from '../../contexts/AuthContext';

class App extends React.Component {
    render() {
        return (
            <AuthProvider>
                <>
                    <Header />
                    <Routes />
                </>
            </AuthProvider>
        )
    }
};

export default App;