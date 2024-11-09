import { createBrowserRouter, Navigate } from 'react-router-dom';
import BranchPage1, { BranchPiece1 } from './pages/Branchpage1';
import BranchPage2, { BranchPiece2 } from './pages/Branchpage2';
import BranchPage3, { BranchPiece3 } from './pages/Branchpage3';
import BranchPage4, { BranchPiece4 } from './pages/Branchpage4';
import BranchPage5, { BranchPiece5 } from './pages/Branchpage5';
import Layout from './components/Layout';
import FrontPage from './pages/Frontpage';
import NotFoundPage from './pages/NotFoundPage';

const addr_info = [
  { path: '/', label: '首页', element: <FrontPage /> },
  {
    path: '/analysis', label: '基于景观可持续的地理设计', element: <Layout />,
    is_redirect: true,
    children: [
      { path: 'branch1', label: '可持续评估', element: <BranchPiece1 /> },
      { path: 'branch2', label: '景观格局演变分析', element: <BranchPiece2 /> },
      { path: 'branch3', label: '生态系统服务分析', element: <BranchPiece3 /> },
      { path: 'branch4', label: '城乡居民福祉分析', element: <BranchPiece3 /> },
      { path: 'branch5', label: '格局-服务-福祉的关系分析', element: <BranchPiece4 /> },
      { path: 'branch6', label: '情景分析与评估', element: <BranchPiece5 /> },
    ]     
  },
  { path: '*', label: '404', element: <NotFoundPage /> }
];

export const addr = addr_info
  .filter(item => item.children)
  .map(item => item.children.map((child, idx) => {
    let path = `${item.path}/${child.path}`;
    return { value: `s${idx+1}`, label: child.label, href: path };
  })
).flat();

// 函数生成每个label对应的地址
const generateAddrMap = (routes, basePath = '') => {
  const addressMap = [];

  routes.forEach(route => {
    const fullPath = basePath + route.path; // 生成完整路径

    // 添加当前路由的地址和标签到数组中
    addressMap.push({ label: route.label, path: fullPath });

    // 如果有子路由，则递归处理子路由
    if (route.children) {
      addressMap.push(...generateAddrMap(route.children, fullPath + '/'));
    }
  });

  return addressMap;
};

// 递归生成路由
const generateRoutes = (routes) => {
  return routes.map(route => {
    const { path, label, element, children, is_redirect } = route;
    const routeObj = {
      path,
      breadcrumbName: label,
      element: element, // 根据需要选择组件
      children: children ? generateRoutes(children) : undefined
    };

    if (children && is_redirect) {
      routeObj.children.unshift({
        index: true,
        element: <Navigate to={`${path}/${children[0].path}`} replace />
      });
    }

    return routeObj;
  });
};

// const router = createBrowserRouter([
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
//         element: <BranchPiece5 />
//       }
//     ]
//   },
//   {
//     path: '*',
//     element: <NotFoundPage />
//   }
// ]);


export const addrMap = generateAddrMap(addr_info);

const router = createBrowserRouter(generateRoutes(addr_info));

export default router;
