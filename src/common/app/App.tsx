import React from 'react';
import { Routes } from '../../routes/Routes';
import './app.css';
import { Header } from '../header';
import AuthProvider from '../../contexts/AuthContext';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { Footer } from '../footer/Footer';

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AuthProvider>
                    <>
                        <Header />
                        <main>
                            <Routes />
                        </main>
                        <Footer />
                    </>
                </AuthProvider>
            </Provider>
        )
    }
};

export default App;