import {useState,useEffect} from 'react';
import './App.css';
import Currency from './Currency';
import './currency.css';
import bDark from '../images/bDark.svg';
import bLight from '../images/bLight.svg';
import dark from '../images/dark.png';
import light from '../images/light.png';

var url = "";


function App() {
  const [search,setSearch] = useState('');
  const [error,setError] = useState('');
  const [currency,setCurrency] = useState([]);
  const [country,setCountry] = useState('');

  const[value,setValue] = useState(false);
  const[mode,setMode] = useState(false);
 

  useEffect(() => {
    function fetchData() {
      if(country==='' || country === 'inr')
        url="https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false";
        else 
        url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
         fetch(url)
        .then(res => {
                if(res.ok){
                return res.json();
              }})
        .then(data =>{
              setCurrency(data);
            })
        .catch(error => {
          setError(`HTTP error status:${error}`);
        })
    }
    fetchData()
    const interval = setInterval(() => fetchData(), 3000)
    return () => {
      clearInterval(interval);
    }
}, [country]);

  const getCountry = (e) =>{
    setCountry(e.target.value);
    console.log(country);
  }
  
  const handleChange = (e) =>{
    setValue(true);
    setSearch(e.target.value);
  }

  var switchMode=(e)=>{
    setMode(!mode);
    let a = document.getElementById("mode");
    (mode===false)? a.innerText = "Light mode": a.innerText = "Dark mode";
  }

  const searchResults = currency.filter(crypto =>{
    return crypto.name.toLowerCase().includes(search.toLowerCase())
  })
  
  return (
    <div className={mode ? "rowbg" : "rowbgL"} >
      <div className="row">
        <div className="">
        <img className="logo" alt="img" src={mode ? bDark : bLight }/><p id={mode ? "h1" : "h1L"}>Crypto Tracker</p> 
        <img alt="img" src={mode ? light: dark } id = "mode" onClick = {switchMode}/>
        </div>
        <br/>
        <form className="formStyle">
        <input className = "search"type="text" onChange = {handleChange} placeholder="Search"/>
        <select style={{maxWidth:"7.5em",maxHeight:"3em"}} onChange={getCountry}>
        <option value="usd">Dollars(USD)</option>
        <option value="inr" >Rupees(INR)</option>
        </select>
        </form>
      </div>
      {(searchResults.length === 0 && value===true) ? 
        <h1>OOPS!! No Data Found for the entered currency..</h1>
      :
      <table className={(!mode) ? "table table-responsive-sm table-responsive-lg table-responsive-md table-light" : "table table-responsive-sm table-responsive-md table-responsive-lg table-dark"}>
        <thead>
          <tr  style={{position: "sticky",top:"0",textAlign:'center'}}>
            <th scope="col" colSpan="2" style={{position:"sticky",left:0,zIndex:2}}><h4>Name</h4></th>
            <th scope="col"><h4>Price</h4></th>
            <th scope="col"><h4>24h%</h4></th>
            <th scope="col" style={{minWidth:"10em"}}><h4>Price change</h4></th>
            <th scope="col"><h4>Volume</h4></th>
            <th scope="col"><h4>Market Cap</h4></th>
            <th scope="col"><h4>Last Updated</h4></th>
          </tr>
        </thead>
        <tbody>
          {(!error)?
          searchResults.map(currency => {
            return <Currency
            key={currency.id} 
            currencyName = {currency.name} 
            price = {currency.current_price}
            currencyImage = {currency.image} 
            volume = {currency.total_volume}
            marketCap = {currency.market_cap}
            currencyLogo = {currency.symbol} 
            changedPrice24h = {currency.price_change_percentage_24h}
            priceChange = {currency.price_change_24h}
            lastUpdated = {currency.last_updated}
            />}) :<h1>Error while getting Data....Please Refresh!!</h1>
          }
        </tbody>
     </table>
  }
    </div>
  );

}

export default App;
