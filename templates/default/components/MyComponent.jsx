export const MyComponent = ({ list }) => {
  return (
    <div className="border-2 border-sky-300 rounded-md p-2">
      <p>I'm a custom react component imported into this page!</p>
      <div>
        <p>And here is a list of some things passed to me through props:</p>
        <ul>
          { list.map((x, i) => <li key={i.toString()}>{x}</li>) }
        </ul>
      </div>
    </div>
  )
}
