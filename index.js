const simmedGames = 1000000; 
let p1 = {
    player: "Borges",
    hold: 0.76,
    break: 0.179, 
    points: 0, 
    games: 0, 
    sets: 0, 
    matches: 0, 
    serving: true,
    totalGames: 0, 
    totalSets:0,  
} 
let p2 = {
    player: "Medvedev",
    hold: 0.826,
    break: 0.283, 
    points: 0, 
    games: 0, 
    sets: 0, 
    matches: 0, 
    serving: false,
    totalGames: 0, 
    totalSets:0,  
}  


function switchServe() {
    if(p1.serving) {
        p1.serving = false; 
        p2.serving = true; 
    } else {
        p1.serving = true; 
        p2.serving = false;
    }
}

function playPoint () {
    const randomNumber = Math.random()
    if(p1.serving) {
        if(randomNumber + p2.break < p1.hold) {
            p1.points ++;
        } else {
            p2.points ++;
        }
    } else {
        if(randomNumber + p1.break < p2.hold) {
            p2.points ++; 
        } else {
            p1.points ++; 
        }
    }
}

function playTiebreak() {
    const randomNumber = Math.random();
    if (p1.serving) {
        if (randomNumber < p1.hold) {
            p1.points ++; 
            checkTiebreakWon();
        } else {
            p2.points ++;
            checkTiebreakWon();
        }
    } else {
        if (randomNumber < p2.hold) {
            p2.points ++; 
            checkTiebreakWon();
        } else {
            p1.points ++;
            checkTiebreakWon();
        }
    }
}

function checkGameWon () {
    if (p1.points >= 4 && p1.points > p2.points + 1) {
        p1.games ++;
        p1.totalGames ++; 
        newGame();
    }
    if (p2.points >= 4 && p2.points > p1.points + 1){
        p2.games ++;
        p2.totalGames ++;
        newGame();
    }
}

function checkSetsWon() {
    if (p1.games >= 6 && p1.games > p2.games + 1) {
        p1.sets ++; 
        p1.totalSets ++;
        newSet(); 
    }
    if (p2.games >= 6 && p2.games > p1.games + 1) {
        p2.sets ++; 
        p2.totalSets ++;
        newSet(); 
    }
}

function checkMatchWon() {
    if (p1.sets >= 3) {
        p1.matches ++;
        newMatch();  
    } 
    if (p2.sets >= 3) {
        p2.matches ++;
        newMatch(); 
    }
}

function checkTiebreakWon() {
    if (p1.points >= 7 && p1.points > p2.points + 1) {
        p1.sets ++;
        p1.totalSets++ 
        newGame();
        newSet();
    }
    if (p2.points >= 7 && p2.points > p1.points + 1) {
        p2.sets ++;
        p2.totalSets++
        newGame(); 
        newSet(); 
    }
}

function checkTiebreakServe() {
    if (((p1.points + p2.points) % 2) != 0 ) {
        switchServe();
    }
}

function newGame() {
    p1.points = 0; 
    p2.points = 0; 
    switchServe();
}

function newSet() {
    p1.games = 0; 
    p2.games = 0; 
}

function newMatch() {
    p1.sets = 0; 
    p2.sets = 0; 
}

function updateScore() {
    checkGameWon(); 
    checkSetsWon(); 
    checkMatchWon(); 
}

function simMatch() {
    if (p1.games === 6 && p2.games === 6) {
        playTiebreak(); 
        checkTiebreakServe();
    } else {
        playPoint()
        updateScore()
    }
}

function runSim() {
    while (p1.matches + p2.matches < simmedGames) {
        simMatch();
    }
}

function analyzeSim() {
    const p1PctWin = (p1.matches / simmedGames) * 100; 
    const p2PctWin = (p2.matches / simmedGames) * 100; 
    const avgGames = (p1.totalGames + p2.totalGames) / simmedGames;
    const p1AvgGames = (p1.totalGames) / simmedGames;
    const p1AvgSets = (p1.totalSets) / simmedGames;
    const p2AvgGames =(p2.totalGames) / simmedGames;
    const p2AvgSets = (p2.totalSets) /simmedGames;
    const avgMargin = (p1AvgGames - p2AvgGames);
    console.log(`${p1.player} Win %: ${p1PctWin.toFixed(2)}%`);
    console.log(`${p2.player} Win %: ${p2PctWin.toFixed(2)}%`);
    console.log("Avg Total Games: " + avgGames);
    console.log("Avg Games P1: " + p1AvgGames);
    console.log( "Avg Games P2: " + p2AvgGames); 
    console.log("Avg Margin: " + avgMargin);
    console.log(p1AvgSets)
    console.log(p2AvgSets)
}

function reset() {
    p1.totalGames = 0; 
    p1.totalSets = 0; 
    p1.matches = 0; 
    p2.totalGames = 0; 
    p2.totalSets = 0; 
    p2.matches = 0; 
}
