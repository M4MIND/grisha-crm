import * as React from 'react';
import Paper from '@mui/material/Paper';
import {AppBar, Button, Grid, IconButton, TextField, Toolbar, Tooltip, Typography} from '@mui/material'

function SearchIcon(props: {color: string, sx: {display: string}}) {
	return null
}

function RefreshIcon(props: {color: string, sx: {display: string}}) {
	return null
}

export default function Content(props: any) {
	return (
		<Paper sx={{ maxWidth: 936, margin: 'auto', boxShadow: 'none', background: "none" }}>
			{props.children}
		</Paper>
	);
}