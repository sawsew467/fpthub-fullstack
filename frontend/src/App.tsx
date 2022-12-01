import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import { State } from "./redux";
import Bookmark from "./pages/Bookmark";
import Notifications from "./pages/Notifications";
import ExplorePage from "./pages/ExplorePage";
import UserProfile from "./pages/UserProfile";
import Ranking from "./pages/Ranking";
import Settings from "./pages/Settings";

export interface IState {
  post: {
    id: string,
    author: string,
    createdAt: string,
    tag: string,
    counterSeed: number,
    counterFlag: number,
    content: string,
    attachments: string
  },
  postList: IState["post"][];
  user: {
    id: string,
    name: string,
    password: string,
    email: string,
    phone: string,
    registered: string,
    seeds: number,
    flags: number,
    avatar: string,
    postList: string[],
    seedList: string[],
    flagList: string[],
    bookmarkList: string[],
    description: string
  },
  userList: IState["user"][];
}

function App() {
  // const postList: IState["postList"] = useSelector(
  //   (state: State) => state.posts
  // );
  // console.log(postList);
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Login ></Login>} />
        <Route path="/login" element={<Login ></Login>} />
        <Route path="/register" element={<Register></Register>} />
        <Route
          path="/home"
          element={<Home></Home>}
        />
        <Route path="/bookmark" element={<Bookmark></Bookmark>} />
        <Route
          path="/notifications"
          element={<Notifications></Notifications>}
        />
        <Route path="/explore" element={<ExplorePage></ExplorePage>} />
        <Route path="/profile/:id" element={<UserProfile></UserProfile>} />
        <Route path="/ranking" element={<Ranking></Ranking>} /> 
        <Route path="/settings" element={<Settings></Settings>} />
        {/* <Route path="/signin" element={<SignIn></SignIn>} />
        
        
        
        <Route path="/profile" element={<Profile mode={isDark}></Profile>} />
        <Route path="/ranking" element={<Ranking mode={isDark}></Ranking>} /> */}
      </Routes>
    </>
  );
}

export default App;
