Meteor.methods({
    TwitchAPIStreams: function(offset) {
        var result = HTTP.get("https://api.twitch.tv/kraken/streams?offset=" + offset + "&limit=100", {timeout: 5000});
        return result;
    },
    TwitchAPITotalStreams: function() {
        var result = HTTP.get("https://api.twitch.tv/kraken/streams/summary", {timeout: 5000});
        return result;
    }
});