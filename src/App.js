import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import './styles.css'
import { useDispatch } from 'react-redux';
import { setPosts } from './actions/postActions';
import PostCard from './PostCard'

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)

  useEffect( () => {
    const fetchPosts = async () => {
      try{
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        dispatch(setPosts(response.data));
        setTimeout(() => {
          setLoading(false)
        }, 5000);

      }
      catch(error){
        console.error('Error fetching posts:', error);
        setLoading(false)
      }
    };
    fetchPosts();
  }, [dispatch]);

  return(
    <div className="App">
      <h1> Post Cards</h1>
      {loading? (
        <div> Loading...</div>):
        (<PostCard />)}
    </div>
  );
};

export default App;