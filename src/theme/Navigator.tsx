import * as React from 'react'
import Divider from '@mui/material/Divider'
import Drawer, {DrawerProps} from '@mui/material/Drawer'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import {AccountCircle, AdminPanelSettings, Analytics, ShoppingCart, Task} from '@mui/icons-material'
import {BrowserRouter as Router, Link as RouterLink} from 'react-router-dom'
import {Link} from '@mui/material'

const categories = [
	{
		id: 'Инструменты',
		children: [
			{
				id: 'Рабочий стол',
				icon: <AdminPanelSettings/>,
				to: '/'
			},
			{
				id: 'Задачи',
				icon: <Task/>,
				to: '/tasks'
			},
			{id: 'Исполнители', icon: <AccountCircle/>, to: '/organizations/'},
			{id: 'Заказы', icon: <ShoppingCart/>, to: '/orders/'},
			{id: 'Аналитика', icon: <Analytics/>, to: '/analytics'}
		]
	}
]

const item = {
	py: '2px',
	px: 3,
	color: 'rgba(255, 255, 255, 0.7)',
	'&:hover, &:focus': {
		bgcolor: 'rgba(255, 255, 255, 0.08)'
	}
}

const itemCategory = {
	boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
	py: 1.5,
	px: 3
}

export default function Navigator(props: DrawerProps) {
	const {...other} = props

	return (
		<Drawer variant="permanent" {...other}>
			<List disablePadding>
				<ListItem sx={{...item, ...itemCategory, fontSize: 22, color: '#fff'}}>
					CRM
				</ListItem>
				{categories.map(({id, children}) => (
					<Box key={id} sx={{bgcolor: '#101F33'}}>
						<ListItem sx={{py: 2, px: 3}}>
							<ListItemText sx={{color: '#fff'}}>{id}</ListItemText>
						</ListItem>
						{children.map(({id: childId, icon, to}) => (
							<Link component={RouterLink} to={to} underline={'none'}>
								<ListItemButton sx={item}>
									<ListItemIcon>{icon}</ListItemIcon>
									<ListItemText>{childId}</ListItemText>
								</ListItemButton>
							</Link>
						))}
						<Divider sx={{mt: 2}}/>
					</Box>
				))}
			</List>
		</Drawer>
	)
}