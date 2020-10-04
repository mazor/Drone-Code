var Cylon = require('cylon');
var bot;

Cylon.robot()
    .connection("ardrone", {
        adaptor: 'ardrone',
        port: '192.168.1.1'
    })
    .device("drone", {
        driver: "ardrone",
        connection: "ardrone"
    })
    .device("nav", {
        driver: "ardrone-nav",
        connection: "ardrone"
    })
    .on("ready", fly);

function fly(robot) {
    bot = robot;
    bot.drone.disableEmergency();
    bot.drone.ftrim();
    bot.drone.takeoff();
    after(5*1000, function() {
        bot.drone.right(0.4);
    });

    after(6*1000, function() {
        bot.drone.right(0);
        bot.drone.front(0.4);

    });

    after(8*1000, function() {
        bot.drone.front(0);
        bot.drone.left(0.4);

    });

    after(12*1000, function() {
        bot.drone.left(0);
        bot.drone.back(0.4);

    });

    after(14*1000, function() {
        bot.drone.back(0);
        bot.drone.right(0.4);

    });

    after(17*1000, function() {
        bot.drone.right(0);
        bot.drone.land();
    });

    after(22*1000, function() {
        bot.drone.stop();
    });

    bot.nav.on("navdata", function(data) {
        bot.drone.config('general:navdata_demo', 'TRUE');
        console.log(data);
    });

}

Cylon.start();

