import { Link } from "react-router-dom"


export default function Nav() {
    return (
            <nav aria-label="Main Navigation" role="navigation">
                <ul>
                    <li><Link to="/stocks">Stocks</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </nav>
    
    )
}