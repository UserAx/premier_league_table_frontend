import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {LeagueResultsPage} from '../pages/LeagueResultsPage';

// const TestComponent = () => <h1>React BoilerPlate!</h1>

export const AppRoute = () => (
    <Router>
        <Routes>
            <Route element={<LeagueResultsPage />} path="/"/>
        </Routes>
    </Router>
);

export default AppRoute;