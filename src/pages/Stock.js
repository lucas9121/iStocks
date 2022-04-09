import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"

export default function Stock(props) {
    const params = useParams()
    const symbol = params.symbol
    const [stock, setStock] = useState(null)
    const getStock = async () =>{
        try{
            const response = stock.find((stock)=>{
                stock.symbol === symbol
               setStock(symbol) 
            }); 
            
        }
        catch (e){
            console.error(e)
        }
    }
    return(
        <div>
            <h1>Some Stock</h1>
        </div>
    )

}