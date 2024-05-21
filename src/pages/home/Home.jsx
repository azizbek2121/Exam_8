import React, { useContext, useEffect, useState } from "react";
import Coin from "../../components/coin/Coin";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Home.css";
import Pagination from "react-js-pagination";
import { ProviderContextData } from "../../provider";
import Carusel from "./Carusel";

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [cards, setCards] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  const { value, setValue } = useContext(ProviderContextData);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/")
      .then((data) => setCards(data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${value}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, [value]);

  const handleChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search) ||
      coin.symbol.toLowerCase().includes(search)
  );

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const indexOfLastCoin = activePage * itemsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - itemsPerPage;
  const currentCoins = filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin);
  return (
    <div className="home-wrapper">
      <div className="carousel"></div>
      <div className="home">
        <div className="container">
          <h1>CRYPTOFOLIO WATCH LIST</h1>
          <span>Get all the Info regarding your favorite Crypto Currency</span>
          <Carusel data={currentCoins} />
        </div>
      </div>
      <div className="home-table">
        <div className="coin-app">
          <div className="coin-search">
            <h1 className="coin-text">Cryptocurrency Prices by Market Cap</h1>
            <form>
              <input
                className="coin-input"
                type="text"
                onChange={handleChange}
                placeholder="Search"
              />
            </form>
          </div>
          <table className="table-coins">
            <thead>
              <tr className="table-header">
                <th>Coin</th>
                <th
                  style={{ textAlign: "right", display: "flex", gap: "130px" }}
                >
                  <span>Price</span>
                  <span>24h Change</span>
                  <span>Market Cap</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentCoins.map((coin) => {
                return (
                  <tr key={coin.id}>
                    <Coin
                      key={coin.id}
                      id={coin.id}
                      name={coin.name}
                      price={coin.current_price}
                      symbol={coin.symbol}
                      marketcap={coin.total_volume}
                      volume={coin.market_cap}
                      image={coin.image}
                      priceChange={coin.price_change_percentage_24h}
                    />
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            className="Paginatii"
            activePage={activePage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={filteredCoins.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
