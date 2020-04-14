import React from 'react';
import { Routes } from '../../routes/Routes';
import './app.css';
import { Header } from '../header';
import AuthProvider from '../../contexts/AuthContext';
import { Provider } from 'react-redux';
import store from '../../redux/store';

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AuthProvider>
                    <>
                        <Header />
                        <Routes />
                    </>
                </AuthProvider>
            </Provider>
        )
    }
};

export default App;