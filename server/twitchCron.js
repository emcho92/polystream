Meteor.startup(function(){
    SyncedCron.add({
        name: 'Twitch Cron to fetch streams',
        schedule: function(parser) {
            return parser.text('every 5 mins');
        },
        job: function() {
            var streamNames = [];

            Meteor.call("TwitchAPITotalStreams", function(error, response) {
                if (response !== null || response !== undefined){
                    var offset = 0;

                    for (var i = 0; i < 10; i++) {
                        Meteor.call("TwitchAPIStreams", offset, function(error, response) {
                            if (response !== null || response !== undefined){
                                for (var i = 0; i < response.data.streams.length; i++) {
                                    streamNames.push({
                                        name: response.data.streams[i].channel.display_name
                                    });
                                }
                            }
                            else {
                                return error;
                            }
                        });

                        offset = offset + 100;
                    }

                    bulkCollectionUpdate(TwitchStreams, streamNames, {
                        primaryKey: "name"
                    });

                }
                else {
                    return error;
                }
            });

            //Meteor.call("TwitchAPIStreams", function(error, response) {
            //    if (response !== null || response !== undefined){
            //        result.totalLiveStreams = response.data._total;
            //        result.streamNames = [];
            //        for (var i = 0; i < response.data.streams.length; i++) {
            //            result.streamNames.push(response.data.streams[i].channel.display_name);
            //        }
            //    }
            //    else {
            //        return result = error;
            //    }
            //});
        }
    });

    SyncedCron.start();
});