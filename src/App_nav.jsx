import { createContext } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './App.css'

export const VersionContext = createContext();

// const router2 = createBrowserRouter([
//   {
//     path: '/',
//     breadcrumbName: '首页',
//     element: <FrontPage />,
//     errorElement: <NotFoundPage />
//   },{
//     path: '/analysis',
//     breadcrumbName: '数据分析',
//     element: <Layout />,
//     children: [
//       {
//         index: true,
//         element: <Navigate to='branch1' replace />
//       },
//       {
//         path: 'branch1',
//         breadcrumbName: '可持续评估',
//         element: <BranchPiece1 />
//       },
//       {
//         path: 'branch2',
//         breadcrumbName: '景观格局评估',
//         element: <BranchPiece2 />
//       },
//       {
//         path: 'branch3',
//         breadcrumbName: '生态系统服务分析',
//         element: <BranchPiece3 />
//       },
//       {
//         path: 'branch4',
//         breadcrumbName: '景观格局-生态服务分析',
//         element: <BranchPiece4 />
//       },
//       {
//         path: 'branch5',
//         breadcrumbName: '空间优化',
//         element: <BranchPiece5 />,
//         // children: [
//         //   {
//         //     index: true,
//         //     element: <Navigate to='pre_simulation' replace />
//         //   },
//         //   {
//         //     path: 'pre_simulation',
//         //     breadcrumbName: '初始设置-预模拟',
//         //     element: <BranchPiece5_step1 />
//         //   },
//         //   {
//         //     path: 'formal_simulation',
//         //     breadcrumbName: '正式模拟',
//         //     element: <BranchPiece5_step2 />
//         //   }
//         // ]
//       }
//     ]
//   },
//   {
//     path: '*',
//     element: <NotFoundPage />
//   }
  
// ]);


function App() {

  return (
    <VersionContext.Provider value={'0.9.5'}>
      <RouterProvider router={router} />
    </VersionContext.Provider>
  );
}

export default App
