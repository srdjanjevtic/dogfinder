import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import RecentPost from "../../components/recentPost/RecentPost";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import GridLoader from "react-spinners/GridLoader";

function HomePage() {
  const data = useLoaderData();

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Udomi, ne kupuj!</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
            explicabo suscipit cum eius, iure est nulla animi consequatur
            facilis id pariatur fugit quos laudantium temporibus dolor ea
            repellat provident impedit!
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Godina iskustva</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Osvojenih nagrada</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Udomljenih životinja</h2>
            </div>
          </div>
        </div>
      </div>
      <section className="right_section">
        <div className="wrapper">
          <h1>Najnovije</h1>
          <Suspense
            fallback={
              <div
                style={{
                  display: "grid",
                  placeContent: "center",
                  width: "100%",
                }}
              >
                <GridLoader
                  color="#fece51"
                  size={100}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            }
          >
            <Await
              resolve={data.recentPostsResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(recentPostsResponse) =>
                recentPostsResponse.data.map((post) => (
                  <RecentPost key={post.id} item={post} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
