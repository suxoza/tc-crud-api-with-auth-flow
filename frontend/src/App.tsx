import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from './app/store/store';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

const SignIn = React.lazy(() => import('./pages/SignIn'));
const SignUp = React.lazy(() => import('./pages/SignUp'));

const PostList = React.lazy(() => import('./pages/posts/PostList'));
const PostEdit = React.lazy(() => import('./pages/posts/PostEdit'));
const PostNew = React.lazy(() => import('./pages/posts/PostNew'));


function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
			    <React.Suspense fallback={''}>
            <Routes>
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<SignUp />} />
              </Route>

              <Route path="/" element={<PrivateRoute />}>
                <Route path="" element={<PostList />} />
                <Route path=":postId" element={<PostEdit />} />
                <Route path="/create" element={<PostNew />} />
              </Route>
            </Routes>
          </React.Suspense>
		    </Router>
      </Provider>
    </div>
  )
}

export default App
