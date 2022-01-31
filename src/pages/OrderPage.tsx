import Paperbase from '../theme/Paperbase'
import {Autocomplete, Box, Button, ButtonGroup, Chip, Divider, Drawer, Fab, Grid, TextField} from '@mui/material'
import {Add} from '@mui/icons-material'
import React, {useEffect, useState} from 'react'
import DataBase from '../DataBase/DataBase'
import DatabaseProvider from '../DataBase/DatabaseProvider'
import {DataGrid} from '@mui/x-data-grid'
import Organization from '../interfaces/Organization'
import Order from '../interfaces/Order'

export default function OrderPage() {
	let [drawerOpen, setDrawerOpen] = React.useState(false)
	let [db, setDb] = React.useState<DataBase | null>(null)
	let [organizations, setOrganizations] = React.useState<Organization[]>([])
	let [orderType, setOrderType] = useState('')
	let [orderNumber, setOrderNumber] = useState('')
	let [orderPerformer, setOrderPerformer] = useState('')
	let [orderComment, setOrderComment] = useState('')
	let [orderWizardComment, setOrderWizardComment] = useState('')
	let [orders, setOrders] = useState<Order[]>([])

	useEffect(() => {
		new DatabaseProvider('crm', 2).open().then(e => {
			setDb(e)

			e.getAll<Order>('orders').then(e => {
				setOrders(e)
			})
			e.getAll<Organization>('organizations').then(e => {
				setOrganizations(e)
			})

		})

		return () => {
			db?.close()
		}
	}, [])

	return (
		<Paperbase header={{title: 'Заказы'}}>
			<Box sx={{backgroundColor: '#FFF', minHeight: 600}}>
				<div style={{height: '600px', width: '100%'}}>
					<DataGrid columns={[
						{field: 'id', headerName: 'ID', flex: 1},
						{field: 'order-type', headerName: 'Вид техники', flex: 1},
						{field: 'order-item-number', headerName: 'Инвентаризационный номер', flex: 1},
						{field: 'order-performer', headerName: 'Исполнитель', flex: 1},
						{
							field: 'order-status', headerName: 'Статус работы', flex: 1, align: 'center', renderCell: p => {
								if (p.row['order-status'] === 0) {
									return <Chip label={'На складе'} size={'small'}/>
								}
								if (p.row['order-status'] === 1) {
									return <Chip label={'В работе'} size={'small'}/>
								}
								if (p.row['order-status'] === 2) {
									return <Chip label={'Завершен'} size={'small'}/>
								}
							}
						},
						{
							field: 'tools', flex: 2, headerName: 'Действия', renderCell: e => {
								return <ButtonGroup>
									{e.row['order-status'] === 0 ? <Button variant={'text'} size={'small'} onClick={e => {

									}
									}>В работу</Button> : ''}
									{e.row['order-status'] === 2 ? <Button variant={'text'} size={'small'}>Документы</Button> : ''}
									<Button variant={'text'} color={'error'} size={'small'}>Удалить</Button>
								</ButtonGroup>
							}
						}
					]
					} rows={orders.map(i => {
						return {
							'id': i.id,
							'order-type': i['order-type'],
							'order-performer': i['order-performer'],
							'order-item-number': i['order-item-number'],
							'order-status': i['order-status'],
							'tools': i.id
						}
					})} disableSelectionOnClick={true} pageSize={60} rowsPerPageOptions={[5]}/>
				</div>
			</Box>
			<Drawer
				open={drawerOpen}
				anchor={'right'}
				PaperProps={{sx: {backgroundColor: '#FFF'}}}
				onClose={e => setDrawerOpen(false)}>
				<Box p={3} sx={{width: 360, backgroundColor: '#FFF'}}>
					<Box> Добавить заказ</Box>
					<Box py={1}/>
					<Divider/>
					<Box py={1}/>
					<Box>
						<form onSubmit={e => e.preventDefault()}>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<TextField name={'order-type'} value={orderType} onChange={e => setOrderType(e.target.value)} sx={{width: '100%'}} label={'Вид техники'}/>
								</Grid>
								<Grid item xs={12}>
									<TextField name={'order-item-number'} value={orderNumber} onChange={e => setOrderNumber(e.target.value)} sx={{width: '100%'}}
											   label={'Инвентаризационный номер'}/>
								</Grid>
								<Grid item xs={12}>
									<Autocomplete
										sx={{width: '100%'}}
										options={(organizations ?? []).map(e => {
											return e.fio
										})}
										value={orderPerformer} onChange={(e, v) => setOrderPerformer(v as string)}
										renderInput={(params) =>
											<TextField name={'order-performer'} {...params} label="Исполнители"/>}/>

								</Grid>
								<Grid item xs={12}>
									<TextField multiline={true} value={orderComment} onChange={e => setOrderComment(e.target.value)} name={'order-comment-of-user'} rows={8}
											   sx={{width: '100%'}} label={'Комментарий пользователя'}/>
								</Grid>
								<Grid item xs={12}>
									<TextField multiline={true} value={orderWizardComment} onChange={e => setOrderWizardComment(e.target.value)} rows={8}
											   name={'order-wizard-instructions'} sx={{width: '100%'}} label={'Указания матстера'}/>
								</Grid>
								<Grid item>
									<Button type={'submit'} size={'large'} variant="contained" color={'success'} onClick={e => {
										db?.add('orders', 'readwrite', {
											'order-type': orderType,
											'order-comment-of-user': orderComment,
											'order-item-number': orderNumber,
											'order-performer': orderPerformer,
											'order-wizard-instructions': orderWizardComment,
											'order-status': 0
										} as Order).then(e => {
											db?.getAll<Order>('orders').then(e => {
												setOrders(e)
											})
										})
									}}>Добавить</Button>
								</Grid>
							</Grid>
						</form>
					</Box>
				</Box>
			</Drawer>
			<Fab size={'large'} color="secondary" aria-label="add" sx={{
				position: 'fixed',
				bottom: (theme) => theme.spacing(2),
				right: (theme) => theme.spacing(2)
			}} onClick={e => setDrawerOpen(true)}>
				<Add/>
			</Fab>
		</Paperbase>
	)
}