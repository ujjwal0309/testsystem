export const setPosts = (posts) => {
    return {
      type: 'SET_POSTS',
      payload: posts
    };
  };
  
  export const removePost = (postId) => {
    return {
      type: 'REMOVE_POST',
      payload: postId
    };
  };
  
  export const fetchPosts = () => {
    return async (dispatch) => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        dispatch(setPosts(data));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  };