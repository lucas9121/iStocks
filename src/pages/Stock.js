import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import stocksData from "../data";


export default function Stock(props) {
    const apiKey = "1693ef68995ff34e46bfa87d2b6b909f"
    const params = useParams();
    const symbol = params.symbol;
    const URL = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`;
    const [stock, setStock] = useState({});
    
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
                    <h1>{stock.name}</h1>
                    <h1>Price ${stock.price}</h1>
                    <h2>Change: ${stock.change.toFixed(2)}</h2>
                    <h2>Daily High: ${stock.dayHigh}</h2>
                    <h2>Daily Low: ${stock.dayLow}</h2>
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