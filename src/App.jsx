import {useEffect} from "react";

import './App.css'

function App() {


  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <p>Json Placeholder Items</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
    </>
  )
}

export default App
