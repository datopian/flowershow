export default function DemoComponent(props) {
	return (
		<div className="max-w-2xl mx-auto my-12 px-4">
			<h3 className="text-center text-3xl mb-4 font-extrabold">Demo component with props data</h3>
			<p className="mb-4">Below data is coming from props ie., <b>{"<DemoComponent data={testData} />"}</b></p>
			<pre className="bg-gray-900 p-4 text-white">{JSON.stringify(props.data, null, 2)}</pre>
		</div>
	)
}