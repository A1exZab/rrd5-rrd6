import { Navigate, NavLink, Outlet, useParams, useRoutes } from 'react-router-dom'

function App() {
	const routes = useRoutes([
		{
			path: '/',
			element: <HomePage />
		},
		{
			path: 'users',
			element: <UsersLayout />,
			children: [
				{ index: true, element: <UserListPage /> },
				{
					path: ':userId',
					element: <Outlet />,
					children: [
						{ path: 'profile', element: <UserProfilePage /> },
						{ path: 'edit', element: <EditUserPage /> },
						{ index: true, element: <Navigate to='./profile' /> },
						{ path: '*', element: <Navigate to='../profile' /> }
					]
				}
			]
		},
		{ path: '*', element: <Navigate to='/' /> }
	])

	return (
		<div>
			<h1>App Layout</h1>
			{routes}
		</div>
	)
}

function HomePage() {
	return (
		<>
			<h2>Main page</h2>
			<NavLink to='/users'>Users list Page</NavLink>
		</>
	)
}

function UsersLayout() {
	return (
		<div>
			<h2>Users Layout</h2>
			<NavLink to='/'>Home Page</NavLink>
			<Outlet />
		</div>
	)
}

function UserListPage() {
	return (
		<div>
			<h2> User List Page</h2>
			<ul>
				{new Array(5).fill('').map((_, index) => (
					<li key={'user_list_component_' + index}>
						<NavLink to={`${index + 1}/profile`}>User {index + 1}</NavLink>
					</li>
				))}
			</ul>
		</div>
	)
}

function UserProfilePage() {
	const { userId } = useParams()
	return (
		<div>
			<h2>UserPage</h2>
			<ul>
				<li>
					<NavLink to='/users'>Users List page</NavLink>
				</li>
				<li>
					<NavLink to={`/users/${userId}/edit`}>Edit user</NavLink>
				</li>
			</ul>
			<h3>Info</h3>
			<p> userId: {userId}</p>
		</div>
	)
}

function EditUserPage() {
	const { userId } = useParams()
	const nextUser = userId < 5 ? +userId + 1 : 1
	return (
		<div>
			<h2>Edit User Page</h2>
			<ul>
				<li>
					<NavLink to={'/users/' + userId}>User profile Page</NavLink>
				</li>
				<li>
					<NavLink to={`/users/${nextUser}`}> Another User</NavLink>
				</li>
				<li>
					<NavLink to={'/users'}> Users List page</NavLink>
				</li>
			</ul>
		</div>
	)
}

export default App
