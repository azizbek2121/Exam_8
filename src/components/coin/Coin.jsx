import React from 'react'
import "./Coin.css";
import { BsEyeFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

const Coin = ({
    name,
    price,
    id,
    symbol,
    marketcap,
    volume,
    image,
    priceChange
}) => {
    return (
        <td className='coin-container'>
            <div className='coin-row'>
                <Link to={`/coins/${id}`}>
                    <div className='coin'>
                        <img src={image} alt='crypto' />
                        <div className='coin-name'>
                            <p className='coin-symbol'>{symbol}</p>
                            <span style={{ color: 'gray' }}>{name}</span>
                        </div>
                    </div>
                </Link>
                <div className='coin-data'>
                    <p className='coin-price'>${price}</p>
                    {/* <p className='coin-volume'>${volume.toLocaleString()}</p> */}

                    {/* {priceChange < 0 ? (
                        <p className='coin-percent red'>{priceChange.toFixed(2)}%</p>
                    ) : (
                        <p className='coin-percent green'>{priceChange.toFixed(2)}%</p>
                    )} */}
                    <div className='coin-percent-eye'>
                        <button className='eyefill'>
                            <BsEyeFill />
                        </button>
                        <p style={{ color: priceChange < 0 ? 'red' : 'green' }} className='coin-percent'>{priceChange.toFixed(2)}%</p>
                    </div>
 
                    <p className='coin-marketcap'>
                        ${marketcap.toLocaleString()}
                    </p>
                </div>
            </div>
        </td>
    )
}

export default Coin