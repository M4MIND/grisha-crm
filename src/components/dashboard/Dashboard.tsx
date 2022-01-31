import React from 'react'
import './Dashboard.css'
import Sidebar from './../sidebar/Sidebar'
import Content from './../content/Content'
import LinksGroup from './../sidebar/group/LinksGroup'
import Item from '../sidebar/group/item/Item'
import {Box, CssBaseline, Link, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography} from '@mui/material'
import {Inbox, Shop, Shop2, SupervisedUserCircle} from '@mui/icons-material'

export default function Dashboard(props: any) {
	return (
		<div className="Dashboard">
			<Sidebar>
				<Box>
					<List>
						<ListItem button>
							<ListItemIcon><Inbox/></ListItemIcon>
							<ListItemText primary="Рабочий стол"/>
						</ListItem>
						<ListItem button href="/orders/">
							<ListItemIcon><SupervisedUserCircle/></ListItemIcon>
							<ListItemText primary="Организации"/>
							<Link title="Организации"></Link>
						</ListItem>
						<ListItem button>
							<ListItemIcon><Shop2/></ListItemIcon>
							<ListItemText primary="Заказы"/>

						</ListItem>
					</List>
				</Box>
				<LinksGroup>
					<Item title="Рабочий стол" link="/"></Item>
					<Item title="Заказы" link="/orders/"></Item>
					<Item title="Организации" link="/organizations/"></Item>
				</LinksGroup>
			</Sidebar>
			<Content>
				<Typography variant="h1" component="h2" >{props.header ?? "Header"}</Typography>
				{props.children}
			</Content>
		</div>
	)
}