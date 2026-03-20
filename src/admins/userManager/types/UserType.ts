export interface User {
  id: string;
  fullName: string;
  email: string;
  status: 'active' | 'banned' | 'inactive';
  role: string;
  createdAt: string;
  _count: {
    children: number;
  };
}

export interface UserResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  activeTotal: number,
  lockedTotal:number,
  message?: string;
}

export interface UserQueryParams {
  searchTerm?: string;
  page?: number;
  limit?: number;
}