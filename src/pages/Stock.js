import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import stocksData from "../data";


export default function Stock(props) {
    const apiKey = "1693ef68995ff34e46bfa87d2b6b909f"
    const params = useParams();
    const symbol = params.symbol;
    const URL = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`;
    // const example = `https://financialmodelingprep.com/api/v3/quote/AAPL?apikey=1693ef68995ff34e46bfa87d2b6b909f`
    const [stock, setStock] = useState({});
    const [color, setColor] = useState('black')
    
    // const getStock = async () => {
    //     try {
    //         const data = await stocksData.find(s => s.symbol === symbol)
    //         setStock(data)
    //     }   catch(err) {
    //         console.log(err)
    //     }
    // };

    const getStock = async() => {
        try {
            const response = await fetch(URL);
            const data = await response.json();
            setStock(data[0]);
        }   catch(err) {
            console.error(err)
        }
    };

    useEffect(() => {
        getStock()
        if(stock.change > 0){
            setColor('green')
        } else {
            setColor('red')
        }
    }, []);


    // return (
    //     <main className="stock-page">
    //         <div>
    //             <h1>{stock.name}</h1>
    //             <h2>Current Price: {stock.lastPrice}</h2>
    //             <h2>Change: {stock.change}</h2>
    //             <h2>Daily High: {stock.high}</h2>
    //             <h2>Daily Low{stock.low}</h2>
    //         </div>
    //     </main>
    // );
   


    const loaded = () => {
        return (
            <main>
                <div>
                    <h2>{stock.name} ({stock.symbol}) {stock.price} <span style={{color: `${color}`}}>{stock.change.toFixed(2)}</span> </h2>
                    <p>Symbol {stock.symbol} </p>
                    <p>Price ${stock.price}</p>
                    <p>Volume Avg. {(stock.volume/1000000).toFixed(2)}M </p>
                    {stock.marketCap > 12 ? <p>Market Cap {(stock.marketCap/1000000000000).toFixed(3)}T</p>: stock.marketCap > 9 && stock.marketCap <= 12 ? <p>Market Cap {(stock.marketCap/1000000000).toFixed(3)}B </p> : <p>Market Cap {(stock.marketCap/1000000).toFixed(3)}M </p> }
                    <p>Change: ${stock.change.toFixed(2)} ({stock.changesPercentage.toFixed(2)})</p>
                    <p>Daily High: ${stock.dayHigh}</p>
                    <p>Daily Low: ${stock.dayLow}</p>
                    <p>52 Week Range {stock.yearLow}-{stock.yearHigh} </p>
                    <p>Year Low: {stock.yearLow} </p>
                </div>
            </main>
        )
    };

    const loading = () => {
        return (
            <h1>Loading...</h1>
        )
    };

    return (
        stock && stock.price ? loaded() : loading()
    );
};