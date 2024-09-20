// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Proceso from './Proceso';
import {PanelProcess} from './PanelProcess';
function Routess() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Proceso />} />
                <Route path="/panel" element={<PanelProcess />} />  {/* Nueva vista */}
            </Routes>
        </Router>
    );
}

export default Routess;
