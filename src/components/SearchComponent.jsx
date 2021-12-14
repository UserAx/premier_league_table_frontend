import React from 'react';

const seasons = [{
    label: "Premier League 2017/2018",
    value: "2017"
},{
    label: "Premier League 2016/2017",
    value: "2016"
},{
    label: "Premier League 2015/2016",
    value: "2015"
},
{
    label: "Premier League 2014/2015",
    value: "2014"
},{
    label: "Premier League 2013/2014",
    value: "2015"
}]

export default (props) => {

    const {handleSeasonChange, handleSearchChange} = props

    return (
        <div className="search__container">
            
            <input  onChange={handleSearchChange} 
            type="text" placeholder="Search by team name" />
            
            <select onChange={handleSeasonChange}>
                {seasons.map((season, index) => {
                    return (<option value={season.value} key={index}>{season.label}</option>)
                })}
            </select>
        </div>
    )
}