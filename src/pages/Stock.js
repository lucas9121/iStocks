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
            <p>{stock.name}</p>
        </main>
        
    )
}