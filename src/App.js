import { useEffect,useState } from 'react';
import './App.css';
import Recipe from './Recipe';

function App() {
  const APP_ID = "14e23da0";
  const APP_KEY = "362ec71f1ae0ea3e0940c440780679e0";
  
  const [recipes, setRecipe]=useState([]);
  const [search, setSearch] = useState(['']);
  const [query, setQuery] = useState('');

  useEffect(()=>{
    getRecipes();
  },[query]);
 
  const getRecipes = async()=>{
    const response = await fetch(
      `https://api.edamam.com/search?&app_id=${APP_ID}&app_key=${APP_KEY}&q=${query}`
    );
    const data = await response.json();
    setRecipe(data.hits);
    console.log(data.hits);
    
  }

  const updateSearch = e =>{
    setSearch(e.target.value);
   
  }

  const updateQuery = e =>{ 
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return ( 
    <div className="App">
      <form onSubmit={updateQuery}>
          <input className="search-bar" type="text" value={search} onChange={updateSearch} />
          <button className="search-button" type='submit' >
            Search
            </button>
      </form>
      {
        recipes.map(recipe =>(
          <Recipe 
            key = {recipe.recipe.label}
            title = {recipe.recipe.label} 
            ingredients = {recipe.recipe.ingredients}
            calories = {recipe.recipe.calories}
            image = {recipe.recipe.image}

          />
        ))
        
        }

    
    </div>
  );
}

export default App;