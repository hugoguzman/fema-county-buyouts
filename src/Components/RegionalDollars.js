import React from "react";
import { GeoJSON } from "react-leaflet";
import regionData from './Data/regionalBuyouts.json'

function RegionalDollars(props) {
    const from=props.from;
    const to=props.to;

    const regionStyle = {
        fillOpacity: 1,
        color: "black",
        weight: .5,
      
      };

      const onEachRegion = (region, layer) => {
        function getColor(d) {
          return d > 2  ? '#4a1486' :
                 d > 1  ? '#9e9ac8' :
                          '#f2f0f7' ;
      }
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        });
        const buyoutCounty = region.properties.county
        const buyoutSubgrantee = region.properties.subgrantee_clean
        const buyoutState = region.properties.state
        const buyoutGrantcount = region.properties.grantcount
        const buyoutDollaramount = formatter.format(region.properties.dollaramount)
    
        const countyName = "<b>County: </b>" + buyoutCounty 
        + "<br><b>Entity: </b>" + buyoutSubgrantee
        + "<br><b>State: </b>" + buyoutState
        + "<br><b>Grant Count: </b>" + buyoutGrantcount
        + "<br><b>Dollar Amount: </b>" + buyoutDollaramount;
        console.log(countyName);
        layer.bindTooltip(countyName);
        
        layer.options.fillColor = getColor(region.properties.grantcount);
    
      };

  function filter (buyoutCounty) {
    if (buyoutCounty.properties.dollaramount >= from && buyoutCounty.properties.dollaramount <= to) return true;
}

  return (
    <GeoJSON
    style={regionStyle}
    data={regionData.features}
    onEachFeature={onEachRegion}
    filter={filter}
    />
  )
}

export default RegionalDollars;