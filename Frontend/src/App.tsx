import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUserDetails } from "./store/slices/authSlice";
import { useProfile } from "./hooks/useProfile";
import Spinner from "./components/spinner";
import { connectSocket, disconnectSocket } from "./utils/socket";

function App() {
  const dispatch = useDispatch();
  const { data, isLoading } = useProfile();

  // Set user & connect socket
  useEffect(() => {
    if (data?._id && data?.email && data?.name) {
      dispatch(setUserDetails(data));

      connectSocket(data._id);
    }

    return () => {
      disconnectSocket();
    };
  }, [data?._id]);

  if (isLoading) {
    return <Spinner />;
  }

  return <RouterProvider router={router} />;
}

export default App;
