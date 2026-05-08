import * as React from "react" ;


const App = () => {
  const initialStories = [ {
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
  const API_ENDPOINT = 'http://hn.algolia.com/api/v1/search?query=' ;
  const [stories , setStories] = React.useState(initialStories);
  const [isError , setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [url, setUrl] = React.useState (`${API_ENDPOINT}${searchTerm}`);
  const handleSearchSubmit = () => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };
  React.useEffect (() => {
    if (!searchTerm) return ;
    
    setIsLoading(true);

    fetch(url)
      .then ((response) => response.json())
      .then ((result) => {
        setIsLoading(false);
        setStories(result.hits)
      })
      .catch (() => {
        setIsLoading(false);
        setIsError(true);
      })
  }, [url]);
  const handleRemoveStory = (item) => {
    const newStories = stories.filter (
      (story) => item.objectID !== story.objectID
    );
    setStories(newStories);
  }
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
      <InputWithLabel id="search" type="text" value={searchTerm} onInputChange={handleSearch}><strong>Search:</strong></InputWithLabel>
      <button type="button" disabled={!searchTerm} onClick={handleSearchSubmit}>Submit</button>
      <p>Searching for <strong>{searchTerm}</strong></p>
      {isError && <p><i>Something went wrong...</i></p>}
      {isLoading? (<p><i>Loading...</i></p>) : (<List stories={stories} onRemoveItem={handleRemoveStory}/>)}
    </>
  );
}

const List = ({stories, onRemoveItem}) => {
  return (
    <ul>
    {
      stories.map((item) => <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
      )
    }
    </ul>
  );
}

const InputWithLabel = ({id, type, value, onInputChange, children}) => {
  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input id={id} type={type} onChange={onInputChange} value={value}></input>
      
    </>
  );
}

const Item = ({item, onRemoveItem}) => {
  return (
    <li>
      <span><a href={item.url}>{item.title}</a></span>
      <span> | {item.author}</span>
      <span> | {item.points} points</span>
      <span> | {item.num_comments} comments</span>
      <span> | <button type="button" onClick={()=> onRemoveItem(item)}>Remove</button>
      </span>
    </li>
  );
}

const Header = () => <h1>Hacker news</h1> ;

export default App; 