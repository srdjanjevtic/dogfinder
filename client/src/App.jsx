import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomePage from "./routes/homePage/homePage";
import Dashboard from "./routes/dashboard/Dashboard";
import About from "./routes/about/About";
import Contact from "./routes/contact/Contact";
import Donation from "./routes/donation/Donation";
import ListPage from "./routes/listPage/listPage";
import { Layout, RequireAuth } from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import ClerkSignUp from "./routes/clerkSignUp/ClerkSignUp";
import ClerkSignIn from "./routes/clerkSignIn/ClerkSignIn";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import NewPostPage from "./routes/newPostPage/newPostPage";
import NotFound from "./routes/NotFound/NotFound";
import Error from "./routes/Error/Error";
import UpdateUser from "./routes/updateUSer/UpdateUser";
import UpdatePost from "./routes/updatePost/UpdatePost";
import UpdateChat from "./routes/updateChat/UpdateChat";
import {
  homePageLoader,
  listPageLoader,
  profilePageLoader,
  singlePageLoader,
  singleUserLoader,
  singleChatLoader,
} from "./lib/loaders";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<Error />}>
        <Route index element={<HomePage />} loader={homePageLoader} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="donation" element={<Donation />} />
        <Route path="list" element={<ListPage />} loader={listPageLoader} />
        <Route
          path="/:id"
          loader={singlePageLoader}
          element={<SinglePage />}
          errorElement={<Error />}
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="clerk-signin" element={<ClerkSignIn />} />
        <Route path="clerk-signup" element={<ClerkSignUp />} />
        <Route path="profile" element={<RequireAuth />}>
          <Route index element={<ProfilePage />} loader={profilePageLoader} />
          <Route path="update" element={<ProfileUpdatePage />} />
          <Route path="addPost" element={<NewPostPage />} />
        </Route>
        <Route path="dashboard" element={<RequireAuth />}>
          <Route index element={<Dashboard />} />
          <Route
            path="users/:id"
            element={<UpdateUser />}
            loader={singleUserLoader}
          />
          <Route
            path="posts/:id"
            element={<UpdatePost />}
            loader={singlePageLoader}
          />
          <Route
            path="chats/:id"
            element={<UpdateChat />}
            loader={singleChatLoader}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
