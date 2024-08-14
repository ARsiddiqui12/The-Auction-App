import React , {Component} from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Home from './components/Home';
import store from './redux/store';
import { Provider } from 'react-redux';
import Nav from './components/Nav';
import Login from './components/Login';
import Auction from './components/Auction';
import Dashboard from './components/Dashboard';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import ProtectedRoute from './components/Protectedroute';
import Logout from './components/Logout';



const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
});
class App extends Component{

  

  render(){

    return (
      <ApolloProvider client={client}>
  <Provider store={store}>
   
    <Router>
    <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reg" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
        <ProtectedRoute>
           <Dashboard />
        </ProtectedRoute>
       } />
        <Route path="/auction" element={<Auction />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  </Provider>
  </ApolloProvider>
    );

  }


}



export default App;
