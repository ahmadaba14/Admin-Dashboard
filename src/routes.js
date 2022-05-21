import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Users = React.lazy(() => import('./views/users/Users'))
const Posts = React.lazy(() => import('./views/posts/Posts'))
const Complaints = React.lazy(() => import('./views/complaints/Complaints'))
const ComplaintDetails = React.lazy(() => import('./views/complaints/ComplaintDetails'))
const UserDetails = React.lazy(() => import('./views/users/UserDetails'))
const PostDetails = React.lazy(() => import('./views/posts/PostDetails'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/users', name: 'Users', element: Users },
  { path: '/posts', name: 'Posts', element: Posts },
  { path: '/complaints', name: 'Complaints', element: Complaints },
  { path: '/complaints/:id', name: 'Complaint Details', element: ComplaintDetails },
  { path: '/users/:id', name: 'User Details', element: UserDetails },
  { path: '/posts/:id', name: 'Post Details', element: PostDetails },
]

export default routes
