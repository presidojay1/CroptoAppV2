import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import LandingPage from "./LandingPage/pages/landingpage";
import SigninPage from "./LandingPage/pages/SignIn/SignInPage";
import Topbar from "./DashBoard/scenes/global/Topbar";
import Sidebar from "./DashBoard/scenes/global/Sidebar";
import Dashboard from "./DashBoard/scenes/dashboard/index";
import Team from "./DashBoard/scenes/team/index";
import Invoices from "./DashBoard/scenes/invoices/index";
import Contacts from "./DashBoard/scenes/contacts";
import Bar from "./DashBoard/scenes/bar/index";
import Form from "./DashBoard/scenes/form/index";
import Line from "./DashBoard/scenes/line/index";
import Pie from "./DashBoard/scenes/pie/index";
import FAQ from "./DashBoard/scenes/faq/index";
import Geography from "./DashBoard/scenes/geography/index";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./DashBoard/scenes/calendar/calendar";

const DashboardLayout = ({ children, setIsSidebar }) => (
  <div style={{ display: "flex" }}>
    <Sidebar />
    <div style={{ flex: 1 }}>
      <Topbar setIsSidebar={setIsSidebar} />
      <div>{children}</div>
    </div>
  </div>
);

const BasicLayout = ({ children }) => <div>{children}</div>;

const App = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = React.useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <BasicLayout>
                  <LandingPage />
                </BasicLayout>
              }
            />
            <Route
              path="/signin"
              element={
                <BasicLayout>
                  <SigninPage />
                </BasicLayout>
              }
            />
            <Route
              path="/dashboard"
              element={
                <DashboardLayout setIsSidebar={setIsSidebar}>
                  <Dashboard />
                </DashboardLayout>
              }
            />
            <Route
              path="/team"
              element={
                <DashboardLayout setIsSidebar={setIsSidebar}>
                  <Team />
                </DashboardLayout>
              }
            />
            <Route
              path="/contacts"
              element={
                <DashboardLayout setIsSidebar={setIsSidebar}>
                  <Contacts />
                </DashboardLayout>
              }
            />
            <Route
              path="/invoices"
              element={
                <DashboardLayout setIsSidebar={setIsSidebar}>
                  <Invoices />
                </DashboardLayout>
              }
            />
            <Route
              path="/form"
              element={
                <DashboardLayout setIsSidebar={setIsSidebar}>
                  <Form />
                </DashboardLayout>
              }
            />
            <Route
              path="/bar"
              element={
                <DashboardLayout setIsSidebar={setIsSidebar}>
                  <Bar />
                </DashboardLayout>
              }
            />
            <Route
              path="/pie"
              element={
                <DashboardLayout setIsSidebar={setIsSidebar}>
                  <Pie />
                </DashboardLayout>
              }
            />
            <Route
              path="/line"
              element={
                <DashboardLayout setIsSidebar={setIsSidebar}>
                  <Line />
                </DashboardLayout>
              }
            />
            <Route
              path="/faq"
              element={
                <DashboardLayout setIsSidebar={setIsSidebar}>
                  <FAQ />
                </DashboardLayout>
              }
            />
            <Route
              path="/calendar"
              element={
                <DashboardLayout setIsSidebar={setIsSidebar}>
                  <Calendar />
                </DashboardLayout>
              }
            />
            <Route
              path="/geography"
              element={
                <DashboardLayout setIsSidebar={setIsSidebar}>
                  <Geography />
                </DashboardLayout>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
