import * as React from "react" ;

const stories = [ {
  title: "React" ,
  url: "https://reactjs.org/",
  author: "John Doe",
  objectID: 0,
  points: 4,
  num_comments: 3,
},
{
  title: "Redux" ,
  url: "https://redux.js.org/",
  author: "Andrew Clark",
  objectID: 2,
  points: 5,
  num_comments: 1,
},];

function App () {
  return(
    <>
      <Header/>
      <br/>
      <Search/>
      <List/>
    </>

  );
}

function List() {
  return (
    <ul>
    {
      stories.map(function (item){
        return (
          <li key={item.objectID} >
            <span><a href={item.url}>{item.title}</a></span>
            <span> {item.author}</span>
            <span> {item.points}</span>
            <span> {item.num_comments}</span>
          </li>
        )
      }
      )
    }
    </ul>
  );
}

function Search() {
  return (
    <>
      <label htmlFor="search">Search:</label>
      <input id="search" type="text"></input>
    </>
  );
}

function Header() {
  return (
  <h1>Hacker news</h1>
  );
}

export default App; 