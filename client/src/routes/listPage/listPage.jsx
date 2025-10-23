import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
// import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
// import PacmanLoader from "react-spinners/PacmanLoader";
import GridLoader from "react-spinners/GridLoader";

function ListPage() {
  const data = useLoaderData();
  // console.log(data.postResponse);

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <Suspense
            fallback={
              <div
                style={{
                  display: "grid",
                  placeContent: "center",
                  height: "100vh",
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
              resolve={data.postResponse}
              errorElement={<p>Greška prilikom učitavanja podataka!</p>}
            >
              {(postResponse) =>
                postResponse.data.length > 0 ? (
                  postResponse.data.map((post) => (
                    <Card key={post.id} item={post} />
                  ))
                ) : (
                  <p
                    style={{
                      textAlign: "center",
                      color: "#efebeb",
                      fontSize: 24,
                      marginTop: 50,
                    }}
                  >
                    Nema rezultata za traženi kriterijum
                  </p>
                )
              }
            </Await>
          </Suspense>
        </div>
        {/* </div>
      <div className="mapContainer">
        <div className="wrapper">
          <Suspense
            fallback={
              <div
                style={{
                  display: "grid",
                  placeContent: "center",
                  height: "100vh",
                  // margin: "0 auto",
                }}
              >
                <GridLoader
                  color="#fece51"
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            }
          >
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <Map items={postResponse.data} />}
            </Await>
          </Suspense>
        </div> */}
      </div>
    </div>
  );
}

export default ListPage;
