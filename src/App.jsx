import { createContext } from 'react';
import { Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import BranchPage1 from './pages/Branchpage1';
import BranchPage2 from './pages/Branchpage2';
import BranchPage3 from './pages/Branchpage3';
import BranchPage4 from './pages/Branchpage4';
import BranchPage5 from './pages/Branchpage5';
import Layout from './components/Layout';
import FrontPage from './pages/Frontpage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css'

export const VersionContext = createContext();

const router = createBrowserRouter([
  {
    path: '/',
    breadcrumbName: '首页',
    element: <FrontPage />,
    errorElement: <NotFoundPage />
  },
  {
    path: '/branch1',
    breadcrumbName: '可持续评估',
    element: <BranchPage1 />
  },
  {
    path: '/branch2',
    breadcrumbName: '景观格局评估',
    element: <BranchPage2 />
  },
  {
    path: '/branch3',
    breadcrumbName: '生态系统服务分析',
    element: <BranchPage3 />
  },
  {
    path: '/branch4',
    breadcrumbName: '景观格局-生态服务分析',
    element: <BranchPage4 />
  },
  {
    path: '/branch5',
    breadcrumbName: '空间优化',
    element: <BranchPage5 />
  },
  {
    path: '/test',
    breadcrumbName: '测试页面',
    element: <Layout />
  }
]);

function App() {

  return (
    <VersionContext.Provider value={'0.8.0'}>
      <RouterProvider router={router} />
    </VersionContext.Provider>
  );
}

export default App
