//Configureer de dependencies.
var Discord = require('discord.io');
var logger  = require('winston');
//auth.json zit niet in de repo, omdat je heel veel schade kan aanrichten met deze token.
var auth    = require('./auth.json');

//Configureer de logger.
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console,{
    colorize: true
});
logger.level = 'debug';

//Initialize the Smokobot.
var Smokobot = new Discord.Client({token: auth.token,autorun: true});

//Verbind.
Smokobot.on('ready', function (evt) {
    logger.info('Verbinding tot stand gebracht!');
    logger.info('Ingelogd als:');
    logger.info(Smokobot.username + ' - (' + Smokobot.id + ')');
});

Smokobot.on('message', function (user, userID, channelID, message, evt) {
    //Luister naar berichten die starten met / om te interpreteren als commando's.
    if (message.substring(0, 1) == '/') {
        var lijst_MetArgumenten = message.substring(1).split(' ');
        var commando = lijst_MetArgumenten[0];

        lijst_MetArgumenten = lijst_MetArgumenten.splice(1);

        switch(commando) {
            // !ping
        case 'ping':
            Smokobot.sendMessage({ to: channelID, message: 'Pong!' });
            break;
        case 'git':
            Smokobot.sendMessage({ to: channelID, message: "Ik wordt gehost op:https://github.com/PSJ-Sokolov/Smokobot.git"});
            break;
        default:
            Smokobot.sendMessage({ to: channelID, message: 'Unknown command.' });
        }
    }
})
