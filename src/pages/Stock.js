import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export default function Stock(props) {
    const apiKey = "1693ef68995ff34e46bfa87d2b6b909f"
    const params = useParams();
    const symbol = params.symbol;
    const URL = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`;
    // const example = `https://financialmodelingprep.com/api/v3/quote/AAPL?apikey=1693ef68995ff34e46bfa87d2b6b909f`
    const [stock, setStock] = useState({});
    const [color, setColor] = useState('black')

    //Checks if number is in the Trillions, Billions or Millions
    const numChecker = (num) => {
        let arr = num.toString().split('')
        if(arr.length > 12){
            return <span>{(num/1000000000000).toFixed(2)}T</span>
        } else if(arr.length > 9 && arr.length <= 12){
            return <span>{(num/1000000000).toFixed(2)}B</span>
        }else {
            return <span>{(num/1000000).toFixed(2)}M</span>
        }
    }

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
   


    const loaded = () => {
        return (
            <main>
                <h2>{stock.name} ({stock.symbol}) <small>$</small>{stock.price} <span style={{color: `${color}`}}><small>$</small>{stock.change.toFixed(2)} ({stock.changesPercentage.toFixed(2)}<small>%</small>)</span> </h2>
                <div id="grid">
                    <div className="column">
                        <p>Symbol <span>{stock.symbol}</span> </p>
                        <p>Exchnage: <span>{stock.exchange}</span></p>
                        <p>Price <span><small>$</small>{stock.price}</span></p>
                        <p>Open <span><small>$</small>{stock.open}</span></p>
                        <p>Previous Close <span><small>$</small>{stock.previousClose}</span></p>
                        <p>Volume {numChecker(stock.volume)}</p>
                        <p>Volume Avg. {numChecker(stock.avgVolume)} </p>
                    </div>
                    <div className="column">
                        <p>Market Cap {numChecker(stock.marketCap)} </p>
                        <p>Shares {numChecker(stock.sharesOutstanding)} </p>
                        <p>52 Week Range <span><small>$</small>{stock.yearLow}-<small>$</small>{stock.yearHigh}</span> </p>
                        <p>Daily High: <span><small>$</small>{stock.dayHigh}</span></p>
                        <p>Daily Low: <span><small>$</small>{stock.dayLow}</span></p>
                        <p>P/E <span>{stock.pe.toFixed(2)}</span></p>
                        <p>EPS <span>{stock.eps.toFixed(2)}</span></p>
                    </div>
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