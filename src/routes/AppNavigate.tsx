import { Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '../core/navigation/Index';
import { Sidebar } from '../admins/userManager/components/Sidebar';

export const AppRouter = () => {
  const token = localStorage.getItem('accessToken');
  const isAuthenticated = !!token;

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthenticated ? "/admin/users" : "/login"} replace />} />

      {publicRoutes.map((route) => (
        <Route 
          key={route.path} 
          path={route.path} 
          element={
            isAuthenticated ? <Navigate to="/admin/users" replace /> : <route.component />
          } 
        />
      ))}

      {privateRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            isAuthenticated ? (
              <div className="flex min-h-screen bg-slate-50">
                <Sidebar />
                <main className="flex-1 md:ml-64 p-8">
                  <route.component />
                </main>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      ))}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/admin/users" : "/login"} replace />} />
    </Routes>
  );
};