import React from 'react';
import './currency.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const currency = ({currencyImage,currencyName,currencyLogo,price,priceChange,marketCap,changedPrice24h,volume,lastUpdated}) => {
    var date = new Date(lastUpdated);
    let currentTime = date.toLocaleTimeString();
    return (
        <>
            <tr className="rowStyle">
                  <td  id="image"> <img src={currencyImage} className="img" alt="cryptoImage"/> </td>    
                   <td class="name"> 
                   <h2 className="h3">{currencyName}</h2>     <span className="">{currencyLogo}</span>
                  </td> 
                    <td className = "currencyPrice">{price.toLocaleString()}</td>
                    {changedPrice24h < 0 ? 
                    <td  id="percentagered">
                        {changedPrice24h.toFixed(2)}%
                    </td>
                    :
                    <td id="percentagegreen">
                        {changedPrice24h.toFixed(2)}%
                     </td>
                    }
                    <td  id="price">{priceChange.toLocaleString()}</td>
                    <td  className="currencyVolume">{volume.toLocaleString()}</td>
                    <td  className="marketCap">{marketCap.toLocaleString()}</td>
                    <td className="lastupdated">{currentTime}</td>
            </tr>
        </>
    )
}

export default currency
