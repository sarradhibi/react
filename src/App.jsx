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
  const [searchTerm , setSearchTerm] = React.useState(localStorage.getItem('search') || 'React' );
  React.useEffect (() => {
    localStorage.setItem ('search', searchTerm)
  }, [searchTerm] );
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    console.log(event.target.value);
  };
  const searchedStories = stories.filter((story) => {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return(
    <>
      <Header/>
      <br/>
      <Search onSearch={handleSearch} searchTerm={searchTerm}/>
      <List stories={searchedStories}/>
    </>

  );
}

const List = ({stories}) => {
  return (
    <ul>
    {
      stories.map((item) => <Item key={item.objectID} item={item} />
      )
    }
    </ul>
  );
}

const Search = (props) => {
  const {searchTerm, onSearch} = props;
  return (
    <>
      <label htmlFor="search">Search:</label>
      <input id="search" type="text" onChange={onSearch} value={searchTerm}></input>
      <p>Searching for <strong>{searchTerm}</strong></p>
    </>
  );
}

const Item = ({item}) => {
  return (
    <li>
      <span><a href={item.url}>{item.title}</a></span>
      <span> {item.author}</span>
      <span> {item.points}</span>
      <span> {item.num_comments}</span>
    </li>
  );
}

const Header = () => <h1>Hacker news</h1> ;

export default App; 