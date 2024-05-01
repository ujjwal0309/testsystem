import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removePost } from './actions/postActions';

const PostCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const postsPerPage = 6;
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const toggleFeedbackForm = () => {
    setShowFeedbackForm(prevState => !prevState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    if (Object.keys(errors).length === 0) {
      console.log('Form submitted:', formData);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      setFormErrors({});
      setShowFeedbackForm(false);
    } else {
      setFormErrors(errors);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRemovePost = (postId) => {
    dispatch(removePost(postId));
  };

  return (
    <div className="post-card-container">
      <button className='listening-button' onClick={toggleFeedbackForm}>We are Listening</button>
      {showFeedbackForm && (
        <div className="feedback-form">
          <h3>Feedback Form</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            {formErrors.name && <div className="error">{formErrors.name}</div>}
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            {formErrors.email && <div className="error">{formErrors.email}</div>}
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} required />
            {formErrors.message && <div className="error">{formErrors.message}</div>}
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      {currentPosts.map(post => (
        <div key={post.id} className="post-card">
          <button className="remove-button" onClick={() => handleRemovePost(post.id)}>Remove</button>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
      <div className="pagination">
        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
          <button key={index} className="page-button" onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostCard;