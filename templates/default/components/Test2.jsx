import { Test } from './Test.jsx'

export const Test2 = ({simpleList}) => {
  return (
    <div>
      <p>I'm a custom react component imported in this page</p>
      <div>
        <p>Here is my child component "Test.js"</p>
        <div className="border-2 border-yellow-300">
          <Test/>
        </div>
      </div>
      <div>
        <p>And here is data passed through props:</p>
        <div className="border-2 border-green-300">
          <ul>
            { simpleList.map((x, i) => <li key={i.toString()}>{x}</li>) }
          </ul>
        </div>
      </div>
    </div>)
}
