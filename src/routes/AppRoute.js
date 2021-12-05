import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const TestComponent = () => <h1>React BoilerPlate!</h1>

export const AppRoute = () => (
    <Router>
        <Routes>
            <Route element={<TestComponent />} path="/"/>
        </Routes>
    </Router>
);

export default AppRoute;