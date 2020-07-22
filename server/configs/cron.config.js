
// const cron = require('node-cron');
// const fetch = require('node-fetch');
// const pool = require('./mysql.config');
// const leagues = ['Harvest', 'Hardcore Harvest',
//                 'SSF Harvest', 'SSF Harvest HC'];
// let leagueIndex = 0;
// let i = 0;

// function updateTable(d){
//     d.entries.forEach(acc => {
//         pool.query('SELECT * FROM poe_leaderboard_data WHERE league = ?', [leagues[leagueIndex]], (err, res)=>{
//             if(err){
//                 console.log(err);
//                 throw err;
//             }
//             if(res.length < 15000){
//                 pool.query('INSERT INTO poe_leaderboard_data (char_id, rank, dead, char_name, level, char_class, delve_default, delve_solo, acc_name, challenge_complete, twitch_name, total_exp, league VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
//                 [acc.character.id, acc.rank, acc.dead, acc.character.name, acc.character.level, acc.character.class,
//                 acc.depth.solo, acc.character.depth.default, acc.account.name, acc.account.challenges.total, acc.account.twitch.name,
//                 acc.character.experience, leagues[leagueIndex]], (err)=>{
//                     if(err) throw err;
//                 })
//             }
//             if(res.length >= 1500){
//                 pool.query('UPDATE poe_leaderboard_data SET char_id = ?, rank = ?, dead = ?, char_name =?, level = ?, char_class = ? delve_default = ?, delve_solo = ?, acc_name = ? challenge_complete = ?, twitch_name = ?, total_exp =?, league = ?'
//                 [acc.character.id, acc.rank, acc.dead, acc.character.name, acc.character.level, acc.character.class,
//                 acc.depth.solo, acc.character.depth.default, acc.account.name, acc.account.challenges.total, acc.account.twitch.name,
//                 acc.character.experience, leagues[leagueIndex]], (err)=>{
//                     if(err) throw err;
//                 })
//             }
//         })
//     });
// }

// cron.schedule('* 30 * * *', ()=>{
//     setTimeout(() => {
//         fetch(`http://api.pathofexile.com/ladders/${leagues[leagueIndex]}?offset=${i}&limit=200`)
//             .then(res => {
//                 return res.json()
//             })
//             .then(data => {
//                 updateTable(data);
//             })
//         i+=200
//         if(i < 15000){
//             getLeaderboard()
//         }
//         else if(leagueIndex < 3 && i === 15000){
//             leagueIndex++;
//             i = 0;
//             getLeaderboard()
//         }
//         else if(leagueIndex = 3 && i === 15000){
//             leagueIndex = 0;
//             i = 0;
//         }
//     }, 2000);
// })