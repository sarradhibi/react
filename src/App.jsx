import * as React from "react" ;


const App = () => {
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
  },
  ];
  const [searchTerm , setSearchTerm] = React.useState('');
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(event.target.value);
  };
  const searchedStories = stories.filter(function (story) {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return(
    <>
      <Header/>
      <br/>
      <Search onSearch={handleChange} searchTerm={searchTerm}/>
      <List stories={searchedStories}/>
    </>

  );
}

const List = (props) => {
  return (
    <ul>
    {
      props.stories.map((item) => <Item key={item.objectID} item={item} />
      )
    }
    </ul>
  );
}

const Search = (props) => {
  return (
    <>
      <label htmlFor="search">Search:</label>
      <input id="search" type="text" onChange={props.onSearch}></input>
      <p>Searching for <strong>{props.searchTerm}</strong></p>
    </>
  );
}

const Item = (props) => {
  return (
    <li>
      <span><a href={props.item.url}>{props.item.title}</a></span>
      <span> {props.item.author}</span>
      <span> {props.item.points}</span>
      <span> {props.item.num_comments}</span>
    </li>
  );
}

const Header = () => <h1>Hacker news</h1> ;

export default App; 