import { Link } from "react-router-dom"
// import stocks from "../data"
import { useState, useEffect } from "react";


export default function Stocks() {
    const apiKey = "1693ef68995ff34e46bfa87d2b6b909f"
    // const URL = `https://financialmodelingprep.com/api/v3/quote/${stockList}?apikey=${apiKey}`;
    const URL = `https://financialmodelingprep.com/api/v3/stock_market/actives?apikey=${apiKey}`
    const [stocks, setStocks] = useState([]);
    // const stockList = stocks.map((s => s.symbol)).join(',')
    const [color, setColor] = useState('black')
    const [one, setOne] = useState(0)
    


    const getStock = async() => {
        try {
            const response = await fetch(URL);
            const data = await response.json();
            setStocks(data);
            console.log(data[2])
        }   catch(err) {
            console.error(err)
        }
    };

    useEffect(() => {
        getStock()
    }, []);

    // return (
    //     <main>
    //         <h1>Stocks</h1>
    //         <ul>
    //             {
    //                 stocks.map((stock, idx) => {
    //                     const { symbol } = stock;
    //                     return (
    //                         <li key={idx}><Link to={`/stocks/${symbol}`}>{symbol}</Link></li>
    //                     )
    //                 })
    //             }
    //         </ul>
    //     </main>

    // )
    const loaded = () => {
        return(
            <main>
                <h1>Most Active Stocks</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>Price</th>
                            <th>Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stocks.map((stock, idx) => {
                                return(
                                    <tr key={idx}>
                                    {/* <Link to={`/stocks/${stock.symbol}`}> */}
                                        {/* <td className="td"><Link to={`/stocks/${stock.symbol}`}>{stock.name} ({stock.symbol})</Link></td>
                                        <td className="td"><small>$</small>{stock.price}</td>
                                        {stock.change > 0 ? <td className="td"><span style={{color: 'green'}}><small>$</small>{stock.change.toFixed(2)} (+{stock.changesPercentage.toFixed(2)}<small>%</small>)</span></td> : <td className="td"><span style={{color: 'red'}}><small>$</small>{stock.change.toFixed(2)} ({stock.changesPercentage.toFixed(2)}<small>%</small>)</span></td>} */}
                                        <td className="td"><Link to={`/stocks/${stock.symbol}`}>{stock.name} ({stock.symbol})</Link></td>
                                        <td className="td"><Link to={`/stocks/${stock.symbol}`}><small>$</small>{stock.price}</Link></td>
                                        {stock.change > 0 ? <td className="td"><Link to={`/stocks/${stock.symbol}`}><span style={{color: 'green'}}><small>$</small>{stock.change.toFixed(2)} (+{stock.changesPercentage.toFixed(2)}<small>%</small>)</span></Link></td> : <td className="td"><Link to={`/stocks/${stock.symbol}`}><span style={{color: 'red'}}><small>$</small>{stock.change.toFixed(2)} ({stock.changesPercentage.toFixed(2)}<small>%</small>)</span></Link></td>}
                                    {/* </Link> */}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </main>
        )
    }

    const loading = () => {
        return (
            <h1>Loading...</h1>
        )
    };

    return (
        stocks ? loaded() : loading()
    );
}
