import React from 'react'

import { PostList } from './PostList'

function App() {
  return (
    <section className="main-container">
      <PostList />
      <div>
        <p>Comments for post will appear here...</p>
      </div>
    </section>
  );
}

export default App;
