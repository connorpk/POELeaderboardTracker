require('dotenv').config();
const express = require('express');
const app = express();
const cron = require('node-cron');
const bodyParser = require('body-parser');
const fetch = require('node-fetch')
const pool = require('./server/configs/mysql.config');
const leagues = ['Harvest', 'Hardcore Harvest', 'SSF Harvest', 'SSF Harvest HC'];

let leagueIndex = 0;
let i = 0;
let accounts = [];
let leaderboardDone = false;

app.use(bodyParser.json());
app.use(express.static(__dirname+"/dist/PathOfExileLeagueTracker"))

app.get('/api/leaderboard', (req, res) => {
    pool.query('SELECT * FROM poe_leaderboard_data', (err, accs) => {
        if (err) {
            return res.send({ success: false, msg: "something went wrong try again later" });
            }

        accs = accs.map(val=>({
            characterID: val.char_id,
            rank: val.rank,
            dead: val.dead,
            characterName: val.char_name,
            level: val.level,
            class: val.char_class,
            delveDefault: val.delve_default,
            delveSolo: val.delve_solo,
            accountName: val.acc_name,
            challenges: val.challenge_complete,
            twitchName: val.twitch_name,
            totalEXP: val.total_exp,
            league: val.league
        }))     
        return res.send({success: true, accounts: accs});
    })
})

app.get('*', (req, res) => {
    res.sendFile('/dist/PathOfExileLeagueTracker/index.html', { root: __dirname + "/" });
});

function updateTable() {
    pool.query('DELETE FROM poe_leaderboard_data', (err) => {
        if (err) throw err;
    })
    pool.query('INSERT INTO poe_leaderboard_data (char_id, rank, dead, char_name, level, char_class, delve_default, delve_solo, acc_name, challenge_complete, twitch_name, total_exp, league) VALUES ?',
        [accounts], (err) => {
            if (err) throw err;
        });
    accounts = [];
}

function getLeaderboard() {
    setTimeout(() => {
        fetch(`http://api.pathofexile.com/ladders/${leagues[leagueIndex]}?offset=${i}&limit=200`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                data.entries.forEach(acc => {
                    let depthCheck = { solo: 0, default: 0 };
                    let twitch = 'N/A';
                    let challenges = 0;
                    if (acc.character.depth != undefined) depthCheck = { solo: acc.character.depth.solo, default: acc.character.depth.default };
                    if (acc.account.twitch != undefined) twitch = acc.account.twitch.name;
                    if (acc.account.challenges != undefined) challenges = acc.account.challenges.total
                    if (acc.dead) acc.dead = 1;
                    let newAcc = [acc.character.id, acc.rank, acc.dead, acc.character.name, acc.character.level, acc.character.class,
                    depthCheck.solo, depthCheck.default, acc.account.name, challenges, twitch, acc.character.experience, leagues[leagueIndex]];
                    accounts = [...accounts, newAcc];
                });
            })
            .then(() => {
                i += 200
                if (i < 1000) {
                    getLeaderboard()
                }
                else if (leagueIndex < 3 && i === 1000) {
                    leagueIndex++;
                    i = 0;
                    getLeaderboard()
                }
                else if (leagueIndex = 3 && i === 1000) {
                    leagueIndex = 0;
                    i = 0;
                    leaderboardDone = true;
                }
            })
    }, 2000);
}

cron.schedule('* * * * *', () => {
    console.log('checking for leaderboard updates');
    if (leaderboardDone) {
        updateTable();
        leaderboardDone = false;
    }
})

cron.schedule('*/15 * * * *', () => {
    console.log('updating leaderboard')
    getLeaderboard();
})

app.listen(3000);