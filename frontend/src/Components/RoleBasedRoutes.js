import React from 'react';
import Layout from '../Layout';
import AdminHome from './Admin/AdminHome';
import ListEmployee from './Admin/Admin Employee/ListEmployee';
import AddOrUpdateEmployee from './Admin/Admin Employee/AddOrUpdateEmployee';
import ViewEmployee from './Admin/Admin Employee/ViewEmployee';
import ListLocation from './Admin/Admin Location/ListLocation';
import AddOrUpdateLoc from './Admin/Admin Location/AddOrUpdateLoc';
import ViewLocations from './Admin/Admin Location/ViewLocations';
import ListRoles from './Admin/Admin Role/ListRoles';
import AddOrUpdateRole from './Admin/Admin Role/AddOrUpdateRole';
import Profile from './Profile';
import EmployeeHome from './Employee/EmployeeHome';
import EmployeeMS from './Employee/EmployeeMS';
import EmployeeClosed from './Employee/EmployeeClosed';
import EmployeePT from './Employee/EmployeePT';
import EmployeeMeetDetails from './Employee/EmployeeMeetDetails';
import EmployeeHrNotes from './Employee/EmployeeHrNotes';
import EmployeeRemarks from './Employee/EmployeeRemarks';
import EmployeeMissedMeet from './Employee/EmployeeMissedMeet';
import HRRemarks from './HR/HRRemarks';
import HRNotes from './HR/HRNotes';
import HRMissedMeet from './HR/HRMissedMeet';
import HRPT from './HR/HRPT';
import HRClosedMeet from './HR/HRClosedMeet';
import HRSchMeet from './HR/HRSchMeet';
import HRMS from './HR/HRMS';
import HRHome from './HR/HRHome';
import { useContext } from 'react';
import Context from './Authentication';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MyRepotees from './Manager/MyRepotees';

function RoleBasedRoutes(props) {
    const adminRouter = createBrowserRouter([
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              path: `/`,
              element: <AdminHome/>,
            },
            {
              path: `/admin/:id/employee`,
              element: <ListEmployee/>,
            },
            {
              path: `/admin/:id/addEmployee/:employee_id`,
              element: <AddOrUpdateEmployee/>,
            },
            {
              path: `/admin/:id/viewEmployee/:employee_id`,
              element: <ViewEmployee/>,
            },
            {
              path: `/admin/:id/location`,
              element: <ListLocation/>,
            },
            {
              path: `/admin/:id/addLocation/:loc_id`,
              element: <AddOrUpdateLoc/>,
            },
            {
              path: `/admin/:id/viewLocation/:loc_id`,
              element: <ViewLocations/>,
            },
            {
              path: `/admin/:id/role`,
              element: <ListRoles/>,
            },
            {
              path: `/admin/:id/addRole/:role_id`,
              element: <AddOrUpdateRole/>,
            },
            {
              path:`/profile/:id`,
              element:<Profile/>
            }
          ],
        },
      ]);
      const employeeRouter = createBrowserRouter([
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              path: `/`,
              element: <EmployeeHome/>,
            },
            {
              path: `/employee/:id/meet-sch`,
              element: <EmployeeMS/>,
            },
            {
              path: `/employee/:id/closed-meet`,
              element: <EmployeeClosed/>,
            },
            {
              path: `/employee/:id/pending-task`,
              element: <EmployeePT/>,
            },
            {
              path: `/employee/:id/meetDetails/:meet_id`,
              element: <EmployeeMeetDetails/>,
            },
            {
              path:`/employee/:id/hr-notes/:meet_id`,
              element:<EmployeeHrNotes/>
            },
            {
              path:`/employee/:id/emp-remarks/:meet_id`,
              element:<EmployeeRemarks/>
            },
            {
              path:`/employee/:id/missed-task`,
              element:<EmployeeMissedMeet/>
            },
            {
              path:`/profile/:id`,
              element:<Profile/>
            }
          ],
        },
      ]);

      const hrRouter = createBrowserRouter([
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              path: `/`,
              element: <HRHome/>,
            },
            {
              path: `/hr/:id/meet-sch`,
              element: <HRMS/>,
            },
            {
              path: `/hr/:id/sch-meet/:meet_id`,
              element: <HRSchMeet/>,
            },
            {
              path: `/hr/:id/closed-meet`,
              element: <HRClosedMeet/>,
            },
            {
              path: `/hr/:id/pending-task`,
              element: <HRPT/>,
            },
            {
              path:`/hr/:id/missed-task`,
              element:<HRMissedMeet/>
            },
            {
              path:`/hr/:id/notes/:meet_id`,
              element:<HRNotes/>
            },
            {
              path:`/profile/:id`,
              element:<Profile/>
            },
            {
              path:`/hr/:id/hrRemarks/:meet_id`,
              element:<HRRemarks/>
            },
          ],
        },
      ]);


      const managerRouter = createBrowserRouter([
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              path: `/`,
              element: <EmployeeHome/>,
            },
            {
              path: `/employee/:id/meet-sch`,
              element: <EmployeeMS/>,
            },
            {
              path: `/employee/:id/closed-meet`,
              element: <EmployeeClosed/>,
            },
            {
              path: `/employee/:id/pending-task`,
              element: <EmployeePT/>,
            },
            {
              path: `/employee/:id/meetDetails/:meet_id`,
              element: <EmployeeMeetDetails/>,
            },
            {
              path:`/employee/:id/hr-notes/:meet_id`,
              element:<EmployeeHrNotes/>
            },
            {
              path:`/employee/:id/emp-remarks/:meet_id`,
              element:<EmployeeRemarks/>
            },
            {
              path:`/employee/:id/missed-task`,
              element:<EmployeeMissedMeet/>
            },
            {
              path:`/profile/:id`,
              element:<Profile/>
            },
            {
              path:`/manager/:id/repotees`,
              element:<MyRepotees/>
            }
          ],
        },
      ]);


      const login = createBrowserRouter([
        {
          path: "/",
          element: <Layout />,
        }
      ])

    const reader = useContext(Context);
    const {role} = reader;
    
    return (
        <>
        {role=="" && <RouterProvider router={login}/>}
        {role==="Admin" && <RouterProvider router={adminRouter}/>}
        {role==="Employee" && <RouterProvider router={employeeRouter}/>}
        {role==="HR" && <RouterProvider router={hrRouter}/>}
        {role==="Manager" && <RouterProvider router={managerRouter}/>}
        </>
    );
}

export default RoleBasedRoutes;