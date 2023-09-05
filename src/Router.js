import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AddUser from './components/AddUser';
import Home from './components/Home';
import UpdateUser from './components/UpdateUser';
function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='addUser' element={<AddUser/>}/>
                <Route path='update/:id' element={<UpdateUser/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;