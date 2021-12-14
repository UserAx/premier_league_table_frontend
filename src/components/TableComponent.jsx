import React, {useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import processData from '../utils/ProcessData';

const tableHeads = [{
    value: "position",
    label: "Position"
},{
    value: "team",
    label: "Team"
}, {
    value: "won",
    label: "Won"
}, {
    value: "loss",
    label: "Loss"
}, {
    value: "draw",
    label: "Draw"
}, {
    value: "gf",
    label: "GF"
}, {
    value: "ga",
    label: "GA"
}, {
    value: "gd",
    label: "GD"
}, {
    value: "points",
    label: "Points"
},{
    value: "results",
    label: "Results"
}];

const orderList= [{
    value: "asc",
    label: "Ascending"
},
{
    value: "des",
    label: "Descending"
}]

export const TableComponent = (props) => {

    const {season = '', searchTeam = '', setModalData} = props;
    
    const [tableOrder, setTableOrder] = useState("asc");

    const data = useSelector((state) => state.league_reducer.results
    .find((result) => result?.name.includes(season)));

    const tableData = useMemo(() => processData(data?.rounds), [data]);

    const handleArrangeItems = (e) => {
        setTableOrder(e.target.value);
    }

    return (
        <div className="league__results__table__container">
            <div className="league__results__table__order">
                {orderList.map((order) => (
                    <div key={order.key}>
                        <input type="radio" value={order.value} 
                        checked={tableOrder === order.value} onClick={handleArrangeItems}/>
                        <label>{order.label}</label>
                    </div>
                ))}
            </div>
            <table className="league__results__table">
                <thead>
                    <tr>
                        {tableHeads.map((head) => (<th key={head.value}>{head.label}</th>))}
                    </tr>
                </thead>
                <tbody >
                    {tableData.map((data, index, datalist) => {
                        if(tableOrder === "des") data = tableData[datalist.length - 1 - index];

                        if (data.team.toLowerCase().includes(searchTeam)) return (
                        <tr key={index}>
                            <td>{data?.position}</td>

                            <td 
                            onClick={() => setModalData(data)}
                            className={
                                `table__body__team__name 
                                ${(data.position < 4 && "league__results__table__top__teams")}
                                ${(data.position > (datalist.length - 4) && "league__results__table__bottom__teams")}`
                            }>{data?.team}</td>
                            
                            <td>{data?.won}</td>
                            <td>{data?.loss}</td>
                            <td>{data?.draw}</td>
                            <td>{data?.gf}</td>
                            <td>{data?.ga}</td>
                            <td>{data?.gd}</td>
                            <td>{data?.points}</td>
                            <td>
                                <div className="table__body__team__latest__results__container">
                                    {data?.lastestresults.map((value) => (
                                        <span className={`table__body__team__latest__results__${value.result}`} 
                                        key={value.date}>{value.result}</span>
                                    ))}
                                </div>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TableComponent;