import "./Stats.css"

export default function Stats(props: any) {
	return (<div className="Stats">
		<div className="Content">
			<div className="Header">{props.title}</div>
			<h1 className="Count">{props.count}</h1>
		</div>
	</div>)
}