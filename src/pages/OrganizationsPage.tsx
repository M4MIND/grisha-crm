import Paperbase from '../theme/Paperbase'
import {Box, Button, ButtonGroup, Card, CardContent, CardHeader, Fab, Grid, Modal, Snackbar, TextField, Typography} from '@mui/material'
import {DataGrid, GridColDef} from '@mui/x-data-grid'
import DatabaseProvider from '../DataBase/DatabaseProvider'
import {Add} from '@mui/icons-material'
import React, {useEffect, useState} from 'react'
import DataBase from '../DataBase/DataBase'
import Organization from '../interfaces/Organization'

export default function OrganizationsPage() {
	const [open, setOpen] = React.useState(false)
	const [snackbarOpen, setSnackbarOpen] = React.useState(false)
	const [db, setDb] = React.useState<DataBase | null>(null)
	const [organizations, setOrganizations] = React.useState<Organization[]>([])

	const [fio, setFio] = useState('')
	const [email, setEmail] = useState('')

	const handleOpen = () => setOpen(true)
	const handleClose = () => {
		setOpen(false)
	}

	useEffect(() => {
		new DatabaseProvider('crm', 2).open().then(d => {
			setDb(d)

			d.getAll('organizations').then(t => {
				setOrganizations(t as Organization[])
			})
		}).catch(e => {
		})

		return () => {
			db?.close()
		}
	}, [])

	const columns: GridColDef[] = [
		{field: 'id', headerName: 'ID', flex: 1},
		{field: 'fio', headerName: 'ФИО исполнитель', flex: 1},
		{field: 'email', headerName: 'E-Mail', flex: 1}
	]

	return <Paperbase header={{title: 'Исполнители'}}>
		<Grid container>
			<Grid item xs={12}>
				<Card>
					<div style={{height: '600px', width: '100%'}}>
						<DataGrid
							rows={organizations}
							columns={columns}
							pageSize={60}
							rowsPerPageOptions={[5]}
						/>
					</div>
				</Card>
			</Grid>
		</Grid>
		<Fab size={'large'} color="secondary" aria-label="add" sx={{
			position: 'fixed',
			bottom: (theme) => theme.spacing(2),
			right: (theme) => theme.spacing(2)
		}} onClick={handleOpen}>
			<Add/>
		</Fab>

		<Snackbar
			open={snackbarOpen}
			autoHideDuration={6000}
			message="Добавить исполнителя"
			onClose={(t) => {setSnackbarOpen(false)}}
		/>

		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={{width: '600px'}}>
				<Card>
					<CardHeader title="Добавить организацию"></CardHeader>
					<CardContent>
						<form>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField variant="filled"
											   sx={{width: '100%'}}
											   value={fio}
											   name={'name'}
											   label={'ФИО сотрудника'}
											   onChange={e => setFio(e.target.value)}/>
								</Grid>
								<Grid item xs={12}>
									<TextField variant="filled"
											   value={email}
											   sx={{width: '100%'}}
											   name={'e-mail'}
											   label={'E-Mail'}
											   onChange={e => setEmail(e.target.value)}/>
								</Grid>
								<Grid item xs={12}>
									<ButtonGroup>
										<Button type={'submit'} size={'large'} variant="contained" color={'success'} onClick={e => {
											console.log(fio, email)

											setFio('')
											setEmail('')

											e.preventDefault()

											let data: Record<string, any> = {
												fio: fio,
												email: email
											}

											console.dir(data)

											db?.add('organizations', 'readwrite', data).then(e => {
												db.getAll('organizations').then(t => {
													setOrganizations(t as Organization[])

													setSnackbarOpen(true)
												})
											})

											handleClose()
										}}>Сохранить</Button>
										<Button variant="contained" size={'large'} color={'error'} onClick={e => {
											setFio('')
											setEmail('')

											handleClose()
										}}>Отмена</Button>
									</ButtonGroup>
								</Grid>
							</Grid>
						</form>
					</CardContent>
				</Card>
			</Box>
		</Modal>
	</Paperbase>
}