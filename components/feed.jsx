"use client";
import {useState, useEffect} from 'react'
import PromptCardList from './promptCardList';

const Feed = () => {

  const [posts, setPosts] = useState([]);

  const [searchText, setsearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async() => {
      const res= await fetch(`/api/prompt/`);
      const data = await res.json();
      setPosts(data);
    }

    fetchPosts();
  }, []);
  
  const SearchPromptsResults = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); 
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setsearchText(e.target.value);

    setSearchTimeout(
       setTimeout(()=>{
          const searchedResults = SearchPromptsResults(e.target.value);
          setSearchedResults(searchedResults);
       },500)
    );
  }

  const handleTagClick = (tag) => {
     setsearchText(tag);

     const searchedResults = SearchPromptsResults(tag);
     setSearchedResults(searchedResults);
  }

  return (
    <section className="feed" >
      <form className="relative flex-center w-full" >
        <input 
        type="text" 
        placeholder="Search..." 
        value={searchText}
        onChange={handleSearchChange}
        required
        className="search_input peer" />
      </form>

      {searchText?(
        <PromptCardList 
         data={searchedResults}
         handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList 
         data={posts}
         handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed