import { Backdrop, CircularProgress } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./components/auth/Login";
import { Dashboard } from "./components/Dashboard";
import MainLayout from "./components/MainLayout";
import { Settings } from "./components/settings/settings";
import { SystemInfo } from "./components/shared/system-info";
import { SharedVideos } from "./components/shared-videos/shared-videos";
import {
  AppContext,
  ContextDataType,
  defaultContext,
} from "./context/app-context";
import { CustomizedTheme } from "./youtube-share-theme";
import {
  deleteAccessToken,
  loadAccessToken,
} from "./persistent/access-token-util";
import { fetchUserProfile } from "./persistent/account-api";
import { ShareNewVideo } from "./components/shared-videos/share-video-new";
import { connectWs, disconnectWs, listenSharedVideoEvent } from "./utils/common";
import { NotificationDto } from "./models/notification-models";

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
  const [newEvent, setNewEvent] = useState<NotificationDto>();

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

          await connectWs();
        } catch (err) {
          deleteAccessToken();
        }
      }

      await listenSharedVideoEvent(setNewEvent);
    };

    initApp().finally(() => setLoading(false));

    return () => {
      disconnectWs();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!newEvent) {
      return;
    }
    const currentNotifications = contextData.notifications;
    if (!currentNotifications?.find((video) => video.id === newEvent.id)) {
      const newNotifications = [newEvent, ...(currentNotifications || [])];
      const message = `${newEvent.sharedUser} just shared a new video: ${newEvent.videoTitle}.`;
      setContextData({
        ...contextData,
        message: message,
        notifications: newNotifications,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ newEvent ]);

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

                  <Route path="/shared-videos">
                    <Route
                      index
                      element={
                        <ProtectedRoute
                          key="/shared-videos"
                          contextData={contextData}
                          setContextData={setContextData}
                        >
                          <SharedVideos />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/shared-videos/share"
                      element={
                        <ProtectedRoute
                          key="/shared-videos/share"
                          contextData={contextData}
                          setContextData={setContextData}
                        >
                          <ShareNewVideo />
                        </ProtectedRoute>
                      }
                    />
                  </Route>
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
