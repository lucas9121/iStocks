import { Link } from "react-router-dom"
import { useState, useEffect } from "react";


export default function Stocks() {
    const apiKey = "1693ef68995ff34e46bfa87d2b6b909f"
    const URL = `https://financialmodelingprep.com/api/v3/stock_market/actives?apikey=${apiKey}`
    const [stocks, setStocks] = useState([]);
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
                                    <tr key={idx} className="tr" >
                                        <td className="td"><Link to={`/stocks/${stock.symbol}`}>{stock.name} ({stock.symbol})</Link></td>
                                        <td className="td"><small>$</small>{stock.price.toFixed(2)}</td>
                                        {stock.change > 0 ? <td className="td"><span style={{color: 'green'}}><small>$</small>{stock.change.toFixed(2)} (+{stock.changesPercentage.toFixed(2)}<small>%</small>)</span></td> : <td className="td"><span style={{color: 'red'}}><small>$</small>{stock.change.toFixed(2)} ({stock.changesPercentage.toFixed(2)}<small>%</small>)</span></td>}
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
