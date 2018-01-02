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
        case 'picklerickle':
            Smokobot.sendMessage({ to: channelID, message: "To be fair, you have to have a very high IQ to understand Rick and Morty. The humour is extremely subtle, and without a solid grasp of theoretical physics most of the jokes will go over a typical viewer’s head. There’s also Rick’s nihilistic outlook, which is deftly woven into his characterisation- his personal philosophy draws heavily from Narodnaya Volya literature, for instance. The fans understand this stuff; they have the intellectual capacity to truly appreciate the depths of these jokes, to realise that they’re not just funny- they say something deep about LIFE. As a consequence people who dislike Rick & Morty truly ARE idiots- of course they wouldn’t appreciate, for instance, the humour in Rick’s existential catchphrase “Wubba Lubba Dub Dub,” which itself is a cryptic reference to Turgenev’s Russian epic Fathers and Sons. I’m smirking right now just imagining one of those addlepated simpletons scratching their heads in confusion as Dan Harmon’s genius wit unfolds itself on their television screens. What fools.. how I pity them. 😂 And yes, by the way, i DO have a Rick & Morty tattoo. And no, you cannot see it. It’s for the ladies’ eyes only- and even then they have to demonstrate that they’re within 5 IQ points of my own (preferably lower) beforehand. Nothin personnel kid 😎"});
            break;
        default:
            Smokobot.sendMessage({ to: channelID, message: 'Unknown command.' });
        }
    }
})
