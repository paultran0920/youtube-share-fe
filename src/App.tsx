import { Backdrop, CircularProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes
} from 'react-router-dom';
import Login from './components/auth/Login';
import { Dashboard } from './components/Dashboard';
import MainLayout from './components/MainLayout';
import { Settings } from './components/settings/settings';
import { SystemInfo } from './components/shared/system-info';
import {
  AppContext,
  ContextDataType,
  defaultContext
} from './context/app-context';
import { CustomizedTheme } from './youtube-share-theme';
import {
  deleteAccessToken,
  loadAccessToken
} from './persistent/access-token-util';
import { fetchUserProfile } from './persistent/account-api';

function ProtectedRoute(props: any) {
  const accessToken = loadAccessToken();
  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return props.children;
}

function App() {
  const [contextData, setContextData] =
    useState<ContextDataType>(defaultContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      const accessToken = loadAccessToken();
      if (accessToken) {
        try {
          const user = await fetchUserProfile();
          setContextData({
            ...contextData,
            currentUser: user,
          });
        } catch (err) {
          deleteAccessToken();
        }
      }
    };

    initApp().finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={CustomizedTheme}>
      <AppContext.Provider
        value={{ contextData: contextData, setContextData: setContextData }}
      >
        {loading ? (
          <Backdrop
            sx={{
              color: (theme) => theme.palette.pink.main,
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <>
            <SystemInfo />
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<MainLayout />}>
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute
                        key="/"
                        contextData={contextData}
                        setContextData={setContextData}
                      >
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute
                        key="/settings"
                        contextData={contextData}
                        setContextData={setContextData}
                      >
                        <Settings />
                      </ProtectedRoute>
                    }
                  />

                  <Route path="/shared-video">
                    <Route
                      index
                      element={
                        <ProtectedRoute
                          key="/shared-video"
                          contextData={contextData}
                          setContextData={setContextData}
                        >
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/shared-video/:id"
                      element={
                        <ProtectedRoute
                          key="/shared-video/view"
                          contextData={contextData}
                          setContextData={setContextData}
                        >
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />
                  </Route>

                  <Route
                    path="/notifications"
                    element={
                      <ProtectedRoute
                        key="/notifications"
                        contextData={contextData}
                        setContextData={setContextData}
                      >
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                </Route>
              </Routes>
            </Router>
          </>
        )}
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
