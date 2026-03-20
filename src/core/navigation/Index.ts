import { LoginPage } from '../../admins/auths/pages/LoginPage';
import { UserManagementPage } from '../../admins/userManager/pages/UserManagementPage';
import {AdminMiniSongPage} from '../../admins/manage-learning-content/pages/AdminMiniSongPage';
import { AdminStoryPage } from '../../admins/manage-learning-content/pages/AdminStoryPage';

export const publicRoutes = [
  { 
    path: '/login', 
    component: LoginPage 
  },
];

export const privateRoutes = [
  { path: '/admin/users', component: UserManagementPage },
  { path: '/admin/mini-songs', component: AdminMiniSongPage },
  {path: '/admin/stories', component: AdminStoryPage}
];
