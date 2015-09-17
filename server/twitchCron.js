Meteor.startup(function(){
    SyncedCron.add({
        name: 'Twitch Cron to fetch streams',
        schedule: function(parser) {
            return parser.text('every 1 minute');
        },
        job: function() {
            return console.log("eee");
        }
    });

    //SyncedCron.start();
});