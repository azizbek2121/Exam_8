import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Info.css'
import ChartCoin from '../../layout/chart/ChartCoin'
const Info = () => {
    const [coin, setCoin] = useState({})
    const params = useParams()
    const fetchCoin = useCallback(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/${params.id}`)
            .then(data => setCoin(data.data))
            .catch(err => console.log(err))
    }, [])
    useEffect(() => {
        fetchCoin()
    }, [])
    return (
        <div className='coin-info'>
            <div className="coin-info-left">
                <div className='coin-image'>
                    <img src={coin?.image?.large} alt="" />
                </div>
                <h1>{coin?.name}</h1>
                <p>{coin?.description?.en.slice(0, 300)}</p>
                <h2>Rank: {coin?.market_data?.market_cap_rank}</h2>
                <h2>Current Price: ${coin?.market_data?.current_price.usd}</h2>
                <h2>Markte Cap: ${coin?.market_data?.market_cap?.usd}</h2>
            </div>
            <ChartCoin coin={params.id} />
        </div>
    )
}

export default Info