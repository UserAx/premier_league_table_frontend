import React, {useState, useEffect} from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Table from '../components/TableComponent';
import Search from '../components/SearchComponent';
import Logo from '../resources/img/Premier_League_Logo.svg';
import {useDispatch, useSelector} from 'react-redux';
import {fetchLeagueResult} from '../actions/LeagueResultAction';

const seasonsURIValues = ['2017_2018', '2016_2017', '2015_2016', '2014_2015', '2013_2014',];

const seasons = ['2017', '2016', '2015', '2014', '2013'];

export const LeagueResultsPage = () => {
    const dispatch = useDispatch();

    const [currentSeason, setCurrentSeason] = useState(seasons[0]);
    const [searchTeam, setSearchTeam] = useState("");
    const [viewResult, setViewResult] = useState({});
    const [openModal, setOpenModal] = useState(false);

    
    useEffect(() => {
        seasonsURIValues.forEach((season) => {
            dispatch(fetchLeagueResult(season));
        });
    }, []);

    useEffect(() => {
        viewResult.team && onOpenModal();
    }, [viewResult]);
    
    const onOpenModal = () => setOpenModal(true);

    const onCloseModal = () => {
        setOpenModal(false)
        setViewResult({});
    };
    
    const handleSeasonChange = (e) => {
        setCurrentSeason(e.target.value);
    }

    const handleSearchChange = (e) => {
        setSearchTeam(e.target?.value.toLowerCase());
    }

    const setModalData = (data) => {
        setViewResult(data)
    }

    return (
        <div className="league__results__page">
            <div className="league__results__container">
                <Logo/>
                
                <Search
                handleSearchChange={handleSearchChange}
                handleSeasonChange={handleSeasonChange} />

                <Table 
                setModalData={setModalData}
                searchTeam={searchTeam} 
                season={currentSeason} />
            </div>

            <Modal open={openModal} onClose={onCloseModal} center>
                <div className="modal__content__container">
                    {Object.keys(viewResult).splice(1).map((value, index) => (
                        value === 'team' ? (
                            <h1 
                            key={index}>{viewResult[value].toUpperCase()}</h1>
                        ) : (
                            <div
                            className="modal__content__container__contents"
                            key={index}>
                                    {value === "lastestresults" ?
                                    <>
                                        <label>LAST 5 GAMES</label>
                                        <div className="table__body__team__latest__results__container">
                                        {viewResult[value].map((gameResult) => (
                                                <span 
                                                className={`table__body__team__latest__results__${gameResult.result}`} 
                                                key={gameResult.date}>{gameResult.result}</span>
                                            ))}
                                        </div>
                                    </>
                                        :
                                        (<>
                                        <label>{value.toUpperCase()}</label>
                                        <span>{viewResult[value]}</span>
                                        </>)
                                    }
                            </div>
                        )   
                    ))}
                </div>
            </Modal>
        </div>
    )
}