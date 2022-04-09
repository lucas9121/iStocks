import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import stocks from '../data'

export default function Stock() {
    const params = useParams()
    const symbol = params.symbol

    const [stock, setStock] = useState({})

    const getStock = async () => {
        try {
            const data = await stocks.find(s => s.symbol === symbol)
            setStock(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getStock()
    }, [])

    return (
        <main>
            <h1>Stock Page</h1>
            <p>Name: {stock.name}</p>
            <p>Symbol: {stock.symbol} </p>
            <p>Open Price: ${stock.open} </p>
            <p>Close Price: ${stock.lastPrice}</p>
            <p>Change: ${stock.change.toFixed(2)} </p>
            <p>Day High: ${stock.high} </p>
            <p>Day low: ${stock.low} </p>
        </main>
        
    )
}