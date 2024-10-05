import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BranchPage1 from './pages/Branchpage1';
import BranchPage2 from './pages/Branchpage2';
import BranchPage3 from './pages/Branchpage3';
import BranchPage4 from './pages/Branchpage4';
import FrontPage from './pages/Frontpage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <FrontPage />,
    errorElement: <NotFoundPage />
  },
  {
    path: '/branch1',
    element: <BranchPage1 />
  },
  {
    path: '/branch2',
    element: <BranchPage2 />
  },
  {
    path: '/branch3',
    element: <BranchPage3 />
  },
  {
    path: '/branch4',
    element: <BranchPage4 />
  }
]);

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App
