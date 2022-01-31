import Paperbase from '../theme/Paperbase'
import {Box, Card, CardContent, CardHeader, Grid, Typography} from '@mui/material'
import React, {useState} from 'react'
import DatabaseProvider from '../DataBase/DatabaseProvider'
import DataBase from '../DataBase/DataBase'
import {palette} from '@mui/system'
import Order from '../interfaces/Order'
import Organization from '../interfaces/Organization'

export default function DashboardPage() {
	let [db, setDb] = React.useState<DataBase | null>(null)
	let [organizations, setOrganizations] = React.useState<Organization[]>([])
	let [orders, setOrders] = React.useState<Order[]>([])

	useState(() => {
		new DatabaseProvider('crm', 2).open().then(e => {
			e.getAll<Organization>('organizations').then(e => setOrganizations(e))
			e.getAll<Order>('orders').then(e => setOrders(e))
		})
		return () => {
			db?.close()
		}
	})

	return (
		<Paperbase header={{title: 'Рабочий стол'}}>
			<Grid container spacing={2}>
				<Grid item xs={4}>
					<Box sx={{
						bgcolor: 'primary.dark',
						boxShadow: 3,
						borderRadius: 1,
						p: 2,
						color: '#FFF',
						textAlign: 'center'
					}}>
						<Box>Организации</Box>
						<Box sx={{fontSize: 34, fontWeight: 'medium', textAlign: 'center'}}>
							{organizations.length}
						</Box>
					</Box>
				</Grid>
				<Grid item xs={4}>
					<Box sx={{
						bgcolor: 'primary.dark',
						boxShadow: 3,
						borderRadius: 1,
						p: 2,
						color: '#FFF',
						textAlign: 'center'
					}}>
						<Box>Заявки</Box>
						<Box sx={{fontSize: 34, fontWeight: 'medium'}}>
							{orders.length}
						</Box>
					</Box>
				</Grid>
				<Grid item xs={4}>
					<Box sx={{
						bgcolor: 'primary.dark',
						boxShadow: 3,
						borderRadius: 1,
						p: 2,
						color: '#FFF',
						textAlign: 'center'
					}}>
						<Box>Организации</Box>
						<Box sx={{fontSize: 34, fontWeight: 'medium'}}>
							{organizations.length}
						</Box>
					</Box>
				</Grid>
				<Grid item xs={12}>
					<Card>
						<CardHeader title={'Зарегистрировать устройство'}/>
					</Card>
				</Grid>
			</Grid>
		</Paperbase>
	)
}