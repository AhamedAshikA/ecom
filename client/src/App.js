import React from "react";
import Splash from "./Component/Splash";
import Register from "./Component/Register";
import SellerLogin from "./Component/SellerLogin";
import SellerRegister from "./Component/SellerRegister";
import Home from "./Component/Home";
import SellerHome from "./Component/SellerHome";
import GetDetails from "./Component/GetDetails";
import ProductsList from "./Component/ProductsList";
import './App.css'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Splash />} />
          <Route path='/reg' element={<Register />} />
          <Route path='/sel' element={<SellerLogin />} />
          <Route path='/selreg' element={<SellerRegister />} />
          <Route path='/home' element={<Home />}/>
          <Route path='/selhom' element={<SellerHome />} />
          <Route path='/getdet' element={<GetDetails />} />
          <Route path='/products' element={<ProductsList />} />
        </Routes>
      </div>
    </Router>
    // <Splash />
 
  )
}
export default App;