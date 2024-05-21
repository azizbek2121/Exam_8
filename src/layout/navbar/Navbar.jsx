import React, { useContext } from "react";
import "./Navbar.css";
import { ProviderContextData } from "../../provider";
const Navbar = () => {
  const { value, setValue } = useContext(ProviderContextData);
  const handelCahne = (e) => {
    setValue(e.target.value);
    console.log(e.target.value);
  };
  return (
    <nav>
      <div className="container">
        <div className="nav-wrapper">
          <h2>CRYPTOFOLIO</h2>
          <div className="nav-right">
            <select onChange={handelCahne}>
              <option value="usd">USD</option>
              <option value="btc">BTC</option>
              <option value="rub">RUB</option>
            </select>
            <button>WATCHLIST</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
