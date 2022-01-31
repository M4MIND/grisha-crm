import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

interface HeaderProps {
	onDrawerToggle: () => void;
	title?: string
}

export default function Header(props: HeaderProps) {

	return (
		<React.Fragment>
			<AppBar
				component="div"
				color="primary"
				position="static"
				elevation={0}
				sx={{zIndex: 0}}
			>
				<Toolbar>
					<Grid container alignItems={'flex-start'} flexDirection={'column'} spacing={1.5}>
						<Grid item/>
						<Grid item xs>
							<Typography color="inherit" variant="h6" component="h1">
								{props.title ?? 'Default title'}
							</Typography>
						</Grid>
						<Grid item/>
					</Grid>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	)
}