import {
	BrowserRouter,
	Switch,
	Route,
	Redirect,
	useRouteMatch,
	useParams,
	NavLink
} from 'react-router-dom'

function App() {
	return (
		<div>
			<BrowserRouter>
				<h1>App Layout</h1>
				<Switch>
					<Route path='/users' component={UsersLayout} />
					<Route exact path='/' component={HomePage} />
					<Redirect to='/' />
				</Switch>
			</BrowserRouter>
		</div>
	)
}

function HomePage() {
	return (
		<>
			<h2>Main page</h2>
			<NavLink to={'/users'}>Users List page</NavLink>
		</>
	)
}

function UsersLayout() {
	const { path } = useRouteMatch()
	return (
		<div>
			<h2>Users Layout</h2>
			<NavLink to={'/'}>Main page</NavLink>
			<Switch>
				<Route path={path + '/:userId/profile'} component={UserProfilePage} />
				<Route path={path + '/:userId/edit'} component={EditUserPage} />
				<Route exact path={path} component={UserListPage} />
				<Redirect from={path + '/:userId'} to={path + '/:userId/profile'} />
			</Switch>
		</div>
	)
}

function UserListPage() {
	const { path } = useRouteMatch()
	return (
		<div>
			<h2>Users List page</h2>
			<ul>
				{new Array(5).fill('').map((_, index) => (
					<li key={'user_list_component' + index}>
						<NavLink to={`${path}/${index + 1}`}>User {index + 1}</NavLink>
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
			<h2>User page</h2>
			<ul>
				<li>
					<NavLink to='/users'>Users List page</NavLink>
				</li>
				<li>
					<NavLink to={`/users/${userId}/edit`}>Edit user</NavLink>
				</li>
			</ul>
			<h3>Info</h3>
			<p>userId: {userId}</p>
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
					<NavLink to={`/users/${userId}`}>User Profile page</NavLink>
				</li>
				<li>
					<NavLink to={`/users/${nextUser}`}>Another user</NavLink>
				</li>
				<li>
					<NavLink to='/users'>Users List page</NavLink>
				</li>
			</ul>
		</div>
	)
}

export default App
