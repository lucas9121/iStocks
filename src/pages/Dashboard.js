import { Link } from "react-router-dom"
import stocks from "../data"


export default function Stocks() {
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