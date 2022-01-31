import React from 'react'
import './App.css'
import {Route, Routes} from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import OrderPage from './pages/OrderPage'
import OrganizationsPage from './pages/OrganizationsPage'
import AnalyticsPage from './pages/AnalyticsPage'
import DatabaseProvider from './DataBase/DatabaseProvider'

function App() {
	new DatabaseProvider('crm', 2).open().then(d =>  {
		if (!d.getObjectStoreNames().contains('organizations')) {
			d.createObjectStore('organizations', {keyPath: 'id', autoIncrement: true})
			d.createObjectStore('orders', {keyPath: 'id', autoIncrement: true})
		}
	}).catch(d => {
	})
	return (
		<Routes>
			<Route path="/" element={<DashboardPage/>}/>
			<Route path="/orders" element={<OrderPage/>}/>
			<Route path="/organizations" element={<OrganizationsPage/>}/>
			<Route path="/analytics" element={<AnalyticsPage/>}/>
		</Routes>
	)
}

export default App
