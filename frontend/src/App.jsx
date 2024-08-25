import React from "react";
import { Route, Routes } from "react-router-dom";



// landing page and dashboard
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";


// finance

// inventory

// employee
import Edashboard from "./pages/employee/Edashboard.jsx";
import Eregistration from "./pages/employee/Eregistration.jsx";
import Esalary from "./pages/employee/Esalary";
import EaddTask from "./pages/employee/EaddTask.jsx";
import EditTaskPage from "./pages/employee/EditTaskPage.jsx";
import ViewTaskList from "./pages/employee/ViewTaskList.jsx";


// harvest

// crop care

// product

// field view
import CultivationDashboard from "./pages/CropVarieties/CultivationDashboard.jsx";


// buyers


// import Test from "./pages/Test.jsx";
import PageError from "./pages/PageError.jsx";



export default function App() {
  return (
    <Routes>
      {/* landing page and dashboard */}
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* finance */}

      {/* inventory */}

      {/* employee */}
      <Route path="/employee/dashboard" element={<Edashboard/>}/>
      <Route path= "/employee/registration" element= {<Eregistration/>}/>
      <Route path="/employee/salary" element= {<Esalary/>}/>
      <Route path="/employee/task" element= {<EaddTask/>}/>
      <Route path="/employee/taskedit" element= {<EditTaskPage/>}/>
      <Route path="/employee/TaskListview" element= {<ViewTaskList/>}/>



      {/* harvest */}

      {/* crop care */}

      {/* product */}

      {/* field view  */}
      <Route path="cultivationDashboard" element={<CultivationDashboard />} />

      {/* buyers */}

      {/* page not found & error page */}
      {/* <Route path="/test" element={<Test />} /> */}

      <Route path="*" element={<PageError />} />
    </Routes>
  );
}
