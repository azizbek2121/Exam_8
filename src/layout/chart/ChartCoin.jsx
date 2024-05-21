import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2"
import { chartDays } from '../../config/data'
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';

import SelectButton from '../../components/selectbutton/SelectButton'
Chart.register(CategoryScale);
const ChartCoin = ({ coin }) => {
    const [historyData, setHistoryData] = useState()
    const [days, setDays] = useState(1)
    const fetchHistoryData = () => {
        axios
            .get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}`)
            .then(res => setHistoryData((res.data.prices)))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        fetchHistoryData()
    }, [days])
    return (
        <div style={{ width: "100%" }}>
            {!historyData ? (
                <p style={{color: '#fff'}}>Loading...</p>
            ) : (
                <>
                    <Line
                        data={{
                            labels: historyData.map((coin) => {
                                let date = new Date(coin[0]);
                                let time =
                                    date.getHours() > 12
                                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                        : `${date.getHours()}:${date.getMinutes()} AM`;
                                return days === 1 ? time : date.toLocaleDateString();
                            }),
                            datasets: [
                                {
                                    data: historyData.map((coin) => coin[1]),
                                    label: `Price ( Past ${days} Days ) in USD`,
                                    borderColor: "#87CEEB",
                                },
                            ],
                        }}
                        options={{
                            elements: {
                                point: {
                                    radius: 1,
                                },
                            },
                        }}
                    />
                    <div
                        style={{
                            display: "flex",
                            marginTop: 20,
                            justifyContent: "space-around",
                            width: "100%",
                        }}
                    >
                        {chartDays.map((day) => (
                            <SelectButton
                                key={day.value}
                                onClick={() => {
                                    setDays(day.value);
                                }}
                                selected={day.value === days}
                            >
                                {day.label}
                            </SelectButton>
                        ))}
                    </div>

                </>
            )}
        </div>
    )
}

export default ChartCoin