import React from 'react';

import './Sidebar.css'

export default function Sidebar(props: any) {
	return (
		<div className="Sidebar">

			{props.children}
		</div>
	);
}


