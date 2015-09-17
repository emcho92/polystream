SearchSource.defineSource('streams', function(searchText, options) {
    var options = {sort: {isoScore: -1}, limit: 5};

    if(searchText) {
        var regExp = buildRegExp(searchText);
        var selector = {$or: [
            {name: regExp}
        ]};

        return TwitchStreams.find(selector, options).fetch();
    } else {
        return TwitchStreams.find({}, options).fetch();
    }
});

function buildRegExp(searchText) {
    // this is a dumb implementation
    var parts = searchText.trim().split(/[ \-\:]+/);
    return new RegExp("(" + parts.join('|') + ")", "ig");
}