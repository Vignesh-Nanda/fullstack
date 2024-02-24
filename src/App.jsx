// import "./App.css";
import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
import Login from "./Components/Login";
// import Home from './Components/Home';
import Navbar from './Components/Navbar';
import { Provider } from 'react-redux';
import store,{persistor} from './Redux/Store';
import Carousel from './Components/Caurosel';
import Card from './Components/Card';
import Side from './Components/Side';
import Profile from './Components/Profile';
import AHome from './Components/Admin/AHome';
import  Dashboard from './Components/Dashboard';
import  Courses from './Components/Courses';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
      <Routes>
        <Route exact path="/"element={<Navigate to="/login"/>}/>
        <Route path="/login"element={<Login/>}/>
        <Route path="/nav"element={<Navbar/>}/>
        <Route path="/cau"element={<Carousel/>}/>
        <Route path="/card"element={<Card/>}/>
        <Route path="/side"element={<Side/>}/>
        <Route path="/profile"element={<Profile/>}/>
        <Route path="/admin"element={<AHome/>}/>
        <Route path="/dash"element={<Dashboard/>}/>
        <Route path="/course"element={<Courses/>}/>
        
        {/* <Route path='*' element={<Route/>}/> */}

      </Routes>
      </BrowserRouter>
      </PersistGate>
      </Provider>
    </>
  );
}

export default App;
