export default function Cell (props: any) {
	return (<div style={{ gridColumnStart: props.gridStart ?? 0, gridColumnEnd: props.gridEnd ?? 1}}>{props.children}</div>)
}