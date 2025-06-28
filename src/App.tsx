import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import Leads from './components/Leads/Leads';
import Projects from './components/Projects/Projects';
import Tasks from './components/Tasks/Tasks';
import ClientPortal from './components/ClientPortal/ClientPortal';
import Shop from './components/Shop/Shop';
import HR from './components/HR/HR';
import Finance from './components/Finance/Finance';
import Settings from './components/Settings/Settings';
import SMS from './components/SMS';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="projects" element={<Projects />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="clients" element={<ClientPortal />} />
          <Route path="shop" element={<Shop />} />
          <Route path="hr" element={<HR />} />
          <Route path="finance" element={<Finance />} />
          <Route path="settings" element={<Settings />} />
          <Route path="sms" element={<SMS />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;