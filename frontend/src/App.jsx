import { Route, Routes } from "react-router-dom";
import CreateAccount from "./views/CreateAccount";
import CreateForm from "./views/CreateForm";
import Login from "./views/Login";
import Welcome from "./views/Welcome";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/create-account' element={<CreateAccount />} />
      <Route path='/welcome' element={<Welcome />} />
      <Route path='/create-form' element={<CreateForm />} />
    </Routes>
  );
}

export default App;
