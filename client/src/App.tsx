import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/userContext";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading/Loading";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  const Home = lazy(() => import("./pages/Home"));
  const Login = lazy(() => import("./pages/Login"));
  const Registar = lazy(() => import("./pages/Registar"));
  const DashBard = lazy(() => import("./pages/DashBard"));
  return (
    <>
      <UserContextProvider>
        <Navbar />
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registar />} />
            <Route path="/dashboard" element={<DashBard />} />
          </Routes>
        </Suspense>
      </UserContextProvider>
    </>
  );
}

export default App;
