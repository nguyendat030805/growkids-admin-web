import { LoginPage } from '../../admins/auths/pages/LoginPage';
import { UserManagementPage } from '../../admins/userManager/pages/UserManagementPage';

export const publicRoutes = [
  { 
    path: '/login', 
    component: LoginPage 
  },
];

export const privateRoutes = [
  { path: '/admin/users', component: UserManagementPage },
];