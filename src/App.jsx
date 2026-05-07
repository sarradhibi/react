import * as React from "react" ;

let courseTitle= "advanced web dev" ;

function App () {
  const student = {
  name : "sara" ,
  age : 20 ,
  track : "Business Analytics" ,
};
  return (
    <div>
      <p>{sayHello()}</p>
      <h1>Hacker News</h1>
      <p>welcome to {courseTitle}, {student.name}!</p>
      <label htmlFor="search" >Search:</label>
      <input id="search" type="text" ></input>
    </div>
  );
}
function sayHello () {
  return "Hello!";
}


export default App; 