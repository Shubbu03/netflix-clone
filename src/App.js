import "./App.css";
import Row from "./Row";
import Banner from "./Banner";
import Navbar from "./Navbar";
import requests from "./requests";

function App() {
  return (
    <div className="app">

      {/* NAVBAR */}

      <Navbar />

      {/* BANNER */}

      <Banner />

      <Row title="Trending Now" fetchUrl={requests.fetchTrending} isLargeRow />
      <Row
        title="Netflix Originals"
        fetchUrl={requests.fetchNetflixOriginals}
      />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row
        title="Documentry Movies"
        fetchUrl={requests.fetchDocumentryMovies}
      />
    </div>
  );
}

export default App;
