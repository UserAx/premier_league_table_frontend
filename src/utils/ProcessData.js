
export default (rounds = []) => {
    let teamList = [];
    let dataLists = [];
    // let dataLists = {};
    
    rounds[0]?.matches.forEach((match) => {
        teamList.push(match.team1);
        teamList.push(match.team2);
    })

    teamList.forEach((team) => {
        var data = {team: '', won: 0, loss: 0, gf: 0, ga: 0, gd: 0, draw: 0, points: 0, lastestresults: []};
        rounds.forEach((round) => {
            data.team = team;
            
            round.matches.forEach((match) => {
                if(match.team1 !== team && match.team2 !== team) return;
                
                if(match.team1 === team){
                    var date = new Date(match.date);
                    if(match.score.ft[0] > match.score.ft[1]) {
                        data.won += 1;
                        data.lastestresults.push({result: 'W', date: date.getTime()})
                    };
                    if(match.score.ft[0] < match.score.ft[1]){ 
                        data.loss +=  1;
                        data.lastestresults.push({result: 'L', date: date.getTime()});
                    };
                    if(match.score.ft[0] === match.score.ft[1]){ 
                        data.lastestresults.push({result: 'D', date: date.getTime()});
                        data.draw += 1
                    };
                    data.gf += match.score.ft[0];
                    data.ga += match.score.ft[1];

                }else if(match.team2 === team){
                    var date = new Date(match.date);
                    if(match.score.ft[0] < match.score.ft[1]) {
                        data.won += 1
                        data.lastestresults.push({result: 'W', date: date.getTime()})
                    };
                    if(match.score.ft[0] > match.score.ft[1]) {
                        data.lastestresults.push({result: 'L', date: date.getTime()});
                        data.loss += 1;                    
                    }
                    if(match.score.ft[0] === match.score.ft[1]){ 
                        data.lastestresults.push({result: 'D', date: date.getTime()});
                        data.draw += 1
                    };
                    data.gf += match.score.ft[1];
                    data.ga += match.score.ft[0];
                }

            });
            data.points = (data.won * 3) + data.draw;
            data.gd = data.gf - data.ga;
        });
        // dataLists[data.team] = data;
        dataLists.push(data);
    });

    dataLists.sort((a, b) => a.points > b.points ? 1 : -1)
    .forEach((data) => data.lastestresults.sort((a, b) => a.date < b.date ? 1: -1)
    .splice(5));
    
    console.log(dataLists);
    return dataLists;
}