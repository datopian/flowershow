import { TestChild } from './TestChild.jsx'

export const TestComponent = ({ simpleList }) => {
  return (
    <div>
      <p>I'm a custom react component imported in this page</p>
      <div>
        <p>Here is my child component:</p>
        <div className="border-2 border-yellow-300">
          <TestChild />
        </div>
      </div>
      <div>
        <p>And here is data passed to me through props:</p>
        <div className="border-2 border-green-300">
          <ul>
            { simpleList.map((x, i) => <li key={i.toString()}>{x}</li>) }
          </ul>
        </div>
      </div>
    </div>)
}
