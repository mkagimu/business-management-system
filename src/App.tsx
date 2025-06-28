import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { TenantProvider } from './contexts/TenantContext';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import Leads from './components/Leads/Leads';
import Projects from './components/Projects/Projects';
import Tasks from './components/Tasks/Tasks';
import Calendar from './components/Calendar/Calendar';
import Schedule from './components/Schedule/Schedule';
import ClientManagement from './components/ClientManagement/ClientManagement';
import Shop from './components/Shop/Shop';
import HR from './components/HR/HR';
import Finance from './components/Finance/Finance';
import Settings from './components/Settings/Settings';
import SMS from './components/SMS/SMS';
import Contracts from './components/Contracts/Contracts';
import Documents from './components/Documents/Documents';
import Support from './components/Support/Support';
import Events from './components/Events/Events';
import Assets from './components/Assets/Assets';

function App() {
  return (
    <ThemeProvider>
      <TenantProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="leads" element={<Leads />} />
              <Route path="projects" element={<Projects />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="clients" element={<ClientManagement />} />
              <Route path="shop" element={<Shop />} />
              <Route path="hr" element={<HR />} />
              <Route path="finance" element={<Finance />} />
              <Route path="settings" element={<Settings />} />
              <Route path="sms" element={<SMS />} />
              <Route path="contracts" element={<Contracts />} />
              <Route path="documents" element={<Documents />} />
              <Route path="support" element={<Support />} />
              <Route path="events" element={<Events />} />
              <Route path="assets" element={<Assets />} />
            </Route>
          </Routes>
        </Router>
      </TenantProvider>
    </ThemeProvider>
  );
}

export default App;