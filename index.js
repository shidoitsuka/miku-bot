const Discord = require("discord.js");
const math = require("mathjs");
const dogname = require("dog-names");
const catname = require("cat-names");
const catpict = require("random-cat");
const bot = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
const badWords = ["fuck", "shit", "bitch", "asshole"];
const bedKeys = ["bed", "sleep"];
const newUsers = [];
//let afk = JSON.parse(fs.readFileSync("./afk.json", "utf8"));
//let points = JSON.parse(fs.readFileSync("./points.json", "utf8"));

bot.on("ready", () => {
    const user = bot.user;
    //user.setGame('He\'s trying hard to fix me QwQ.');
    user.setGame('in your room.');
    //'online', 'idle', 'dnd' and 'invisible'
    user.setStatus('dnd');
    const mReady = ["GRRRR!!! I'm Here, Baby!", "I'm Here!!!", "REAAAAADY", "Bring 'em on."];
    const readyText = mReady[Math.floor(Math.random() * mReady.length)];
    console.log(readyText);
});
bot.on("guildMemberAdd", (member) => {
    const guild = member.guild;
    if (!newUsers[guild.id]) newUsers[guild.id] = new Discord.Collection();
    newUsers[guild.id].set(member.id, member.user);

    if (newUsers[guild.id].size > 10) {
        const userlist = newUsers[guild.id].map(u => u.toString()).join(" ");
        guild.channels.get(guild.id).send("Welcome our new users!\n" + userlist);
        newUsers[guild.id].clear();
    }
});

bot.on("guildMemberRemove", (member) => {
    const guild = member.guild;
    if (newUsers[guild.id].has(member.id)) newUsers.delete(member.id);
});

bot.on("message", (message) => {
    try {
        //MENTION-MIKU
        if (message.content.startsWith(config.botID)) {
            message.channel.send("The prefix is `,`");
        }
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        // ============ //
        /*
        if (!points[message.author.id]) points[message.author.id] = {
            points: 0,
            level: 0
        };
        if (message.author.bot) return;
        let userData = points[message.author.id];
        userData.points++;

        let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
        let userLevel = points[message.author.id] ? points[message.author.id].level : 0;
        if (curLevel > userData.level) {
            // Level up!
            userData.level = curLevel;
            message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
        }

        if (message.content.startsWith(config.prefix + "level")) {
            message.reply(`You are currently level ${userData.level}, with ${userData.points} points.`);
        }
        fs.writeFile("./points.json", JSON.stringify(points), (err) => {
            if (err) console.error(err)
        });
    */
        //start afk-mode

        /*   if (!afk[message.author.id]) afk[message.author.id] = {
                    userID: " ",
                    afkmode: " "
            };
            let userAFK = afk[message.author.id];
           if (command === "afk on") {
            if (userAFK.afkmode == "true") {
                message.channel.send(`${message.author.username}, your \`AFK mode\` is currently \`on\`.`);
                return;
            }
            userAFK.afkmode = "true";
               userAFK.userID = message.author.id;
            fs.writeFile("./afk.json", JSON.stringify(afk), (err) => {
                if (err) console.error(err)
            });
            message.channel.send(`${message.author.username}, turned on AFK mode for you.`);
           }
           if (command === "afk off") {
            if (userAFK.afkmode == "false") {
                message.channel.send(`${message.author.username}, your \`AFK mode\` is currently \`off\`.`);
                return;
            }
            userAFK.afkmode = "false";
            fs.writeFile("./afk.json", JSON.stringify(afk), (err) => {
                if (err) console.error(err)
            });
            message.channel.send(`Welcome back, ${message.author.username}!`);
           }
            if (message.content.includes(message.author.id)) {
                if (userAFK.afkmode == "true") {
                    message.reply("x");
                }
            }
            //if (command === "x") {
            //  message.reply(`${userAFK.afkmode}`);
            //}
               if (command === "x") {
                   message.reply(`${userAFK.afkmode}`);
               }*/




        //   if (message.content.toLowerCase().startsWith(config.prefix + "afk on") && message.author.id !== config.ownerID) {
        //       message.channel.send("You don't have permission(s) to run this command");
        //       return;
        //   }
        //   if (message.content.toLowerCase().startsWith(config.prefix + "afk off") && message.author.id !== config.ownerID) {
        //       message.channel.send("You don't have permission(s) to run this command");
        //       return;
        //   }
        //   if (bedKeys.some(word =>
        //           message.content.toLowerCase().includes(word))) {
        //       if (message.author.id !== config.ownerID) return;
        //       else {
        //           const goodNight = ["Good Night Hun:heart:!" + " I'll let 'em know you're away:zzz:", "Night night mah luv:heart_eyes:", "Sleep well, baby:hearts:"];
        //           const replyNight = goodNight[Math.floor(Math.random() * goodNight.length)];
        //           message.channel.send(replyNight);
        //           afk = true;
        //           message.channel.send("Turned on AFK mode.");
        //       }
        //   }
        //   if (message.content.toLowerCase().startsWith(config.prefix + "afk on") && message.author.id == config.ownerID) {
        //       //turn on afk mode
        //       afk = true;
        //       message.channel.send("Turned on AFK mode.");
        //   } else if (message.content.toLowerCase().startsWith(config.prefix + "afk off") && message.author.id == config.ownerID) {
        //      //turn off afk mode
        //      afk = false;
        //       message.channel.send("Turned off AFK mode.");
        //   } else if (afk == true && message.content.includes(config.ownerID)) {
        //       //reply if afk true
        //       message.reply("Brian is :zzz: :zzz: :zzz:, try again later.");
        //   }
        // end afk-mode

        //DERE-QUIZ
        if (command === "quiz") {
            /*
            let dere = JSON.parse(fs.readFileSync("./dere.json", "utf8"));
            let dereAns = require("./dere.json");
            let msg = message.content.slice(5);
            let userAnswers = new Set();
            message.channel.send("1 or 2?");
            if (msg == "1" || msg == "2") {
                fs.writeFile("./dere.json", JSON.stringify(userAnswers), (err) => {
                    if (err) console.error(err)
                });
                message.channel.send("2 or 1?");
                    if (msg == "1" || msg == "2") {
                        fs.writeFile("./dere.json", JSON.stringify(userAnswers), (err) => {
                            if (err) console.error(err)
                        });
                    messages.channel.send(`Ok, Your first answer: ${dereAns.ans1}, your 2nd answer: ${dereAns.ans2}`);
                    }
            }
            setTimeout(() => {
                message.channel.send("Ended.");
                return;
            }, 5000);
            */
            message.channel.send("This command isn\'t available yet.");
        }
        let talkedRecently = new Set();

        // Checks if they have talked recently
        if (talkedRecently.has(message.author.id)) {
          /*
           You can change the nature of the cool down by changing the return to something else.
           REMINDER: You may need to add an else statement if you do not have any returns in this scope.
          */
          return;
        }
        // Adds the user to the set so that they can't talk for 2.5 seconds
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after 2.5 seconds
          talkedRecently.delete(message.author.id);
        }, 2500);


        //SYSTEM

        //BAD WORDS DETECTOR
        if (badWords.some(word =>
                message.content.toLowerCase().includes(word))) {
            message.reply("Watch your language c:");
        }
        if (command === "ping") {
            message.channel.send("Pong :ping_pong:! `" + (new Date().getTime() - message.createdTimestamp + "` ms"));
        }
        //if its bot and without ',' no answers.
        if (!message.content.startsWith(config.prefix) || message.author.bot) return;
        //PING
        /*if(message.content.startsWith(config.prefix+'ping')) {
            message.channel.send('Ping?')
            .then(m =>
                m.edit(`Pong! Latency is + ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`) );
        }*/
        //UP-TIME
        if (command === "uptime") {
            var s, m, h;
            s = Math.round(bot.uptime / 1000) + 55;
            m = Math.round(bot.uptime / (1000 * 60));
            h = Math.round(m / (1000 * 60));

            message.channel.send(s + m + h);
        }

        //END-SYSTEM


        //FUN

        //EMOJIS
        const emojis = [
            //FUN
            ":joy:",
            ":grimacing:",
            ":smile:",
            ":smiley:",
            //HANDS
            ":ok_hand:",
            //OTHERS
            ":open_mouth:",
            ":wink:",
            ":upside_down:",
            ":smirk:"
            ];
        const randomEmojis = emojis[Math.floor(Math.random() * emojis.length)];
        //CAT-PICT
        if (command === "cat") {
            const url = catpict.get();
            const embed = new Discord.RichEmbed()
            .setAuthor("Miku -- Cat", "https://cdn.discordapp.com/avatars/381018297019269121/6eecdd6f48c7e75239f77a58584f93dd.png")
            .setColor(0x1a9ca8)
            .setImage(url)
            .setDescription(`No picture? Please try again.🙁`)
            .setFooter("© 12042#5754 | random-cat (NPM)", "https://cdn.discordapp.com/avatars/381018297019269121/6eecdd6f48c7e75239f77a58584f93dd.png");
            message.channel.send({embed});
        }
        //DOG-NAME
        if (command === "dogname") {
            const msg = message.content.slice(8);
            if (msg.includes("f")) {
                const name = dogname.femaleRandom();
                const embed = new Discord.RichEmbed()
                .setAuthor("Miku -- Dog Name (Female)", "https://cdn.discordapp.com/avatars/381018297019269121/6eecdd6f48c7e75239f77a58584f93dd.png")
                .setColor(0x1a9ca8)
                .setFooter("© 12042#5754 | dog-names (NPM)", "https://cdn.discordapp.com/avatars/381018297019269121/6eecdd6f48c7e75239f77a58584f93dd.png")
                .setDescription(`${message.author.username}, if you were my dog i'd name you ${name}${randomEmojis}.`);
                message.channel.send({embed});
            }
            if (msg.includes("m")) {
                const name = dogname.maleRandom();
                const embed = new Discord.RichEmbed()
                .setAuthor("Miku -- Dog Name (Male)", "https://cdn.discordapp.com/avatars/381018297019269121/6eecdd6f48c7e75239f77a58584f93dd.png")
                .setColor(0x1a9ca8)
                .setFooter("© 12042#5754 | dog-names (NPM)", "https://cdn.discordapp.com/avatars/381018297019269121/6eecdd6f48c7e75239f77a58584f93dd.png")
                .setDescription(`${message.author.username}, if you were my dog i'd name you ${name}${randomEmojis}.`);
                message.channel.send({embed});
            }
            if (!msg.includes("f") && !msg.includes("m")) {
                const name = dogname.allRandom();
                const embed = new Discord.RichEmbed()
                .setAuthor("Miku -- Dog Name", "https://cdn.discordapp.com/avatars/381018297019269121/6eecdd6f48c7e75239f77a58584f93dd.png")
                .setColor(0x1a9ca8)
                .setFooter("© 12042#5754 | dog-names (NPM)", "https://cdn.discordapp.com/avatars/381018297019269121/6eecdd6f48c7e75239f77a58584f93dd.png")
                .setDescription(`${message.author.username}, if you were my dog i'd name you ${name}${randomEmojis}.`);
                message.channel.send({embed});
            }
        }
        //CAT-NAME
        if (command === "catname") {
            const name = catname.random();
            const embed = new Discord.RichEmbed()
                .setAuthor("Miku -- Cat Name", "https://cdn.discordapp.com/avatars/381018297019269121/6eecdd6f48c7e75239f77a58584f93dd.png")
                .setColor(0x1a9ca8)
                .setFooter("© 12042#5754 | cat-names (NPM)", "https://cdn.discordapp.com/avatars/381018297019269121/6eecdd6f48c7e75239f77a58584f93dd.png")
                .setDescription(`If you were my cat, I'd name you ${name}${randomEmojis}.`);
                message.channel.send({embed});
        }
        //INDO-NAME
        if (command === "idname") {
          const idnames = require('./idnames.json');
          const name = idnames.names[Math.floor(Math.random() * idnames.names.length)];
          const embed = new Discord.RichEmbed()
                .setAuthor("Miku -- ID Name", "https://cdn.discordapp.com/avatars/381018297019269121/6eecdd6f48c7e75239f77a58584f93dd.png")
                .setColor(0x1a9ca8)
                .setFooter("© 12042#5754", "https://cdn.discordapp.com/avatars/381018297019269121/6eecdd6f48c7e75239f77a58584f93dd.png")
                .setDescription(`If you were Indonesian, your Mom'd name you ${name}${randomEmojis}.`);
                message.channel.send({embed});
        }
        /*
            * CATEGORY_SAY
        */
        //SAY
        if (command === "say") {
            msg = message.content.slice(4);
                message.delete();
                message.channel.send(msg);
        }
        //BIGTEXT
        if (command === "bigtext") {
            message.delete();
            const msg = message.content.slice(9);
            const mRegex = msg.replace(/\s/g,'');
            /*
            if (msg.match(/\W/g)) {
                message.channel.send(":no_mouth:");
            }
            */
            //else {
            /*
                message.channel.send(msg.split("").filter(v=> v!==" ").map(i=>
                  ":regional_indicator_" + i + ":"
              ).join(""));
              */
              function withoutSpace() {
                message.channel.send(msg.split("").map(i=>
                  ":regional_indicator_"+i+":"
                ).join(""));
              }
              function withSpace() {
                message.channel.send(mRegex.split("").map(i=>
                  ":regional_indicator_"+i+":"
                ).join(""));
              }
              if (!msg.match(/\W/g)) {
                withoutSpace();
              }
              else if (msg.match(/\W/g)) {
                withSpace();
              }
                /*
                message.channel.send(mRegex.split("").map(i=>
                    ":regional_indicator_" + i + ":"
                  ).join(""));
                  */
            //}
            /*
            for (var i = 0; msg.length; i++) {
                msg.charAt(i);
            }
            */
            /*
            const msgArray = msg.split("");
            for (var i = 0; msgArray.length; i++) {
                message.channel.send(`:regional_indicator_${bs}:`);
            }
            */
        }
        /*
            END_CATEGORY_SAY *
        */
        //RATEWAIFU
        if (command === "ratewaifu") {
            let msg = message.content.slice();
            if (msg.length < 11) {
                message.channel.send("I can't rate *nobody* :confused:.");
            }
            if (message.content.includes(config.ownerID)) {
                message.channel.send("I'd rate " + `<@${config.ownerID}>` + " a 11/10! :heart:");
            }
            if (message.content.includes(config.botID)) {
                message.channel.send("I'd rate myself a 11/10. Just like him! :revolving_hearts:");
            } else if (msg.length > 11) {
                if (message.content.includes(config.ownerID) || message.content.includes(config.botID)) return;
                const rates = [
                    "1/10 :poop:", "2/10 :dizzy_face:", "3/10 :astonished:", "4/10 :grimacing:",
                    "5/10 :ok_hand:",
                    "6/10 :upside_down:", "7/10 :relieved:", "8/10 :blush:", "9/10 :heart_eyes:", "10/10 :clap:"
                ];
                const waifus = rates[Math.floor(Math.random() * rates.length)];
                if (message.content.includes(message.author.id)) {
                    message.channel.send(`Sure, lemme give you a ${waifus}.`);
                } else {
                    message.channel.send(`Sure ${message.author.username}. Lemme give ${message.content.substr(10)} a ${waifus}.`);
                }
            }
        }
        //8BALL
        if (command === "8ball" || command === "8b") {
            const egb = ["No", "Don't count on it", "Try again later", "Yes", "Of course", "Yup", "I don't know"];
            let msg = message.content.slice();
            if (!msg.match(/\?/g)) {
                message.channel.send("Can you like... Ask something? :no_mouth:");
            } else if (msg.match(/\?/g)) {
                const ebans = egb[Math.floor(Math.random() * egb.length)];
                message.channel.send(ebans);
            }
        }
        //FLIPCOIN
        if (command === "flip" || command === "flipcoin" || command === "flipcoins") {
            const coins = ["Heads", "Tails", "Try again!"];
            const flipped = coins[Math.floor(Math.random() * coins.length)];
            message.channel.send(flipped);
        }
        //ALPHA-IS-BETTER
        if (command === "alphaisbetter") {
            message.reply("Actually, i am better.");
        }
        //YARANAIKA-FACE
        if (command === "lenny") {
            message.delete()
            message.channel.send("( ͡° ͜ʖ ͡°)");
        }
        //QUOTES
        if (command === "quotes") {
            const quotes = [
                "Make KnightRaid GREAT AGAIN!!11!!111 *-Donald J SinZ*"
            ];
            const rquotes = quotes[Math.floor(Math.random() * quotes.length)];
            message.channel.send(rquotes);
        }
        //YANDERE
        if (command === "yandere") {
            const sayings = [
                "Say that you want me every day\nThat you want me every way\nThat you need me",
                "You love me.",
                "I dont mind having *** with your dead body",
                "I love you so much, don't make me kill you",
                "Choose me and live, or choose her and die",
                "I'm the only one you need",
                "Your future belongs to me",
                "I'm crazy?!\nWhat's crazy is that this world refuses to let me be with you!!!",
                "Every bloody bit of your soul\nIs mine.",
                "Let me cut your hands so i can hold it forever",
                "IF I CANNOT HAVE YOU, THEN NO ONE CAN!"
            ];
            const answer = sayings[Math.floor(Math.random() * sayings.length)];
            message.channel.send(answer);
        }
        //TSUNDERE
        if (command === "tsundere") {
            const sayings = [
                "I-it's not like i love you or something, s-stupid!",
                "DIE 100 TIMES PLEASE!"
            ]
        }
        //DEREDERE
        if (command === "deredere") {
            const sayings = []
        }
        /*if (command === "ytmp3") {
        msg = message.content.slice(-11, -1);
        //https://youtubemp3api.com/@api/button/mp3/
        message.reply(`https://youtubemp3api.com/@api/button/mp3/${msg}`);
    }*/
        /*if (command === "math") {
            const txt = message.content.slice();
            const expr = txt.match(/(\d+)\s?([\+\-\*\/])\s?(\d+)/);
            const first = Number(expr[1]);
            const operator = expr[2];
            const second = Number(expr[3]);
            /*try {
                switch (operator) {
                    case '+':
                        message.channel.send(first + second);
                        break;
                    case '-':
                        message.channel.send(first - second);
                        break;
                    case '*':
                        message.channel.send(first * second);
                        break;
                    case '/':
                        message.channel.send(first / second);
                        break;
                }
            }
            catch (err) {
                console.log(err.name);
            }
            if (operator == '+') message.channel.send(first + second);
            if (operator == '*') message.channel.send(first * second);
            if (operator == '-') message.channel.send(first - second);
            if (operator == '/') message.channel.send(first / second);
        } */
        /*if (command === "ss") {
            var second = 0, minute = 0, hour = 0;
            function timer(){
            setTimeout(function() {
                second++;
                if (second >= 60) {
                    second = 0;
                    minute++;
                    if (minute >= 60) {
                        minute = 0;
                        hour++;
                    }
                }
            }, 1000);
        }
            message.channel.send(`${hour} Hour/s, ${minute} Minute/s, ${second} Second/s.`);
        }*/


        //ETC,ADMIN,OTHER.

        //PURGE-MSG
        if (command === "prune") {
          message.channel.bulkDelete(2).catch(error =>
            console.log(error.stack)
          );
        }
        //PURGE-MSGS
        if (command === "purge") {
            const user = message.mentions.users.first();
            const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
            if (!amount) return message.reply('Must specify an amount to delete!');
            if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
            message.channel.fetchMessages({
                limit: amount
            }).then((messages) => {
                if (user) {
                    const filterBy = user ? user.id : bot.user.id;
                    messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
                }
                message.channel.bulkDelete(messages).catch(error =>
                    console.log(error.stack));
            });
        }
        //MATH
        if (command === "math" || command === "mafs" || command === "maffs") {
            const msg = message.content.slice();
            const txt = message.content.slice(6);
            if (msg.length > 6) {
                message.channel.send(math.eval(txt));
                if (txt == "2 + 2" || txt == "2+2" || txt == "2+ 2" || txt == "2 +2") {
                    const embed = new Discord.RichEmbed()
                        .setAuthor("Miku", "https://cdn.discordapp.com/avatars/381018297019269121/6eecdd6f48c7e75239f77a58584f93dd.png")
                        .setColor(0x1a9ca8)
                        .setDescription("Didn't trust me? Here:")
                        .setImage("https://goo.gl/tVGvMX")
                        .setFooter("© 12042#5754", "https://cdn.discordapp.com/avatars/381018297019269121/6eecdd6f48c7e75239f77a58584f93dd.png");
                    message.channel.send({
                        embed
                    });
                }
                /*if (txt.match(/[a-zA-Z]+/g)) {
                    message.channel.send(":no_mouth:");
                    return;
                }
                    if (!txt.match(/[a-zA-Z]+/g)) {
                        message.channel.send(math.eval(txt));
                    }*/
            }
            if (msg.length < 6) {
                message.channel.send(":no_mouth:");
                return;
            }
        }
        //ABOUT
        if (command === "about") {
            const uptime = Math.round(bot.uptime / (1000 * 60 * 60)) + "Hour/s\n"; + Math.round(bot.uptime / (1000 * 60)) + "Minute/s"; //\n" + Math.round(bot.uptime / 1000) + "Second/s";
            const embed = new Discord.RichEmbed()
                .setAuthor("Miku -- About", "https://cdn.discordapp.com/avatars/381018297019269121/6eecdd6f48c7e75239f77a58584f93dd.png")
                .setColor(0x1a9ca8)
                .setFooter("© 12042#5754 | discord.js", "https://cdn.discordapp.com/avatars/381018297019269121/6eecdd6f48c7e75239f77a58584f93dd.png")
                .setDescription("Your wife is here. Yes! Hatsune Miku! I'm a just4fun discord-bot created by 12042#5754\nI was written with full of♥using nodejs.😍")
                .addField("NodeJS version:", "v9.5.0", true)
                .addField("DiscordJS version:", "v11.3.0", true)
                .addField("Uptime:", uptime, true);
            message.channel.send({
                embed
            });
        }
        //HELP
        if (command === "help") {
            const embed = new Discord.RichEmbed()
                .setAuthor("Miku -- Help", "https://cdn.discordapp.com/avatars/381018297019269121/6eecdd6f48c7e75239f77a58584f93dd.png")
                .setColor(0x1a9ca8)
                .setFooter("© 12042#5754", "https://cdn.discordapp.com/avatars/381018297019269121/6eecdd6f48c7e75239f77a58584f93dd.png")
                .setDescription("Available command(s):")
                .addField("Fun", "\
            8ball\
            \nquotes\
            \nflip\
            \nratewaifu\
            \nping\
            \nyandere\
            \ntsundere\
            \nderedere\
            \n", true)
                .addField("System/Administrator", "purge", true);
            message.channel.send({
                embed
            });
        }
    } catch (err) {
        message.channel.send({
            embed: {
                color: 0xc62828,
                title: "ERROR :(",
                description: `${err.name}\n${err.message}`,
                footer: {
                    text: "© 12042#5754"
                }
            }
        });
        console.log(`${message.author.username}=> "${message.content.slice()}" \n Error: \n ============== \n ${err.message} \n ${err.name} \n ==============`);
    }
});
bot.login(config.token);
// quest-mark https://www.improvisedlife.com/cms/wp-content/uploads/2011/07/question-mark-blue-21.jpg
// miku color 1a9ca8
//console.log(`${message.author.username}=> "${message.content.slice()}" \n Error: \n ============== \n ${err.message} \n ${err.name} \n ==============`);
// if (message.content.toLowerCase().startsWith(PREFIX + 'cat')) {
//        var randomCat = require('random-cat');
//        var url = randomCat.get();
//        message.channel.send(`Here's your random cat! :cat:`, { files: [url] })
//    }
