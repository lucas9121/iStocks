import { Link } from "react-router-dom"
import stocks from "../data"
import { useState, useEffect } from "react";


export default function Stocks() {
    const apiKey = "1693ef68995ff34e46bfa87d2b6b909f"
    // const URL = `https://financialmodelingprep.com/api/v3/quote/${stockList}?apikey=${apiKey}`;
    const [stocksData, setStocksData] = useState([]);
    const stockList = stocks.map((s => s.symbol)).join(',')
    return (
        <main>
            <h1>Stocks</h1>
            <ul>
                {
                    stocks.map((stock, idx) => {
                        const { symbol } = stock;
                        return (
                            <li key={idx}><Link to={`/stocks/${symbol}`}>{symbol}</Link></li>
                        )
                    })
                }
            </ul>
        </main>

    )
}
