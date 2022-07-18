export default function DemoComponent(props) {
	return (
		<div className="max-w-2xl mx-auto my-12 px-4 border-2 border-slate-400 rounded-md">
			<h3 className="text-center text-3xl mb-4 font-extrabold">I'm a demo component</h3>
		  <p className="mb-4">Below data is coming from my "data" prop</p>
			<pre className="bg-gray-900 p-4 text-white">{JSON.stringify(props.data, null, 2)}</pre>
		</div>
	)
}
