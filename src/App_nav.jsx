import { createContext } from 'react';
import { Route, createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import BranchPage1, {BranchPiece1} from './pages/Branchpage1';
import BranchPage2, {BranchPiece2} from './pages/Branchpage2';
import BranchPage3, {BranchPiece3} from './pages/Branchpage3';
import BranchPage4, {BranchPiece4} from './pages/Branchpage4';
import BranchPage5, {BranchPiece5} from './pages/Branchpage5';
import Layout from './components/Layout';
import FrontPage from './pages/Frontpage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css'

export const VersionContext = createContext();

const router2 = createBrowserRouter([
  {
    path: '/',
    breadcrumbName: '首页',
    element: <FrontPage />,
    errorElement: <NotFoundPage />
  },{
    path: '/analysis',
    breadcrumbName: '数据分析',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to='branch1' replace />
      },
      {
        path: 'branch1',
        breadcrumbName: '可持续评估',
        element: <BranchPiece1 />
      },
      {
        path: 'branch2',
        breadcrumbName: '景观格局评估',
        element: <BranchPiece2 />
      },
      {
        path: 'branch3',
        breadcrumbName: '生态系统服务分析',
        element: <BranchPiece3 />
      },
      {
        path: 'branch4',
        breadcrumbName: '景观格局-生态服务分析',
        element: <BranchPiece4 />
      },
      {
        path: 'branch5',
        breadcrumbName: '空间优化',
        element: <BranchPiece5 />,
        // children: [
        //   {
        //     index: true,
        //     element: <Navigate to='pre_simulation' replace />
        //   },
        //   {
        //     path: 'pre_simulation',
        //     breadcrumbName: '初始设置-预模拟',
        //     element: <BranchPiece5_step1 />
        //   },
        //   {
        //     path: 'formal_simulation',
        //     breadcrumbName: '正式模拟',
        //     element: <BranchPiece5_step2 />
        //   }
        // ]
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
  
]);


function App() {

  return (
    <VersionContext.Provider value={'0.9.0'}>
      <RouterProvider router={router2} />
    </VersionContext.Provider>
  );
}

export default App