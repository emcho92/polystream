Template.gridstack.helpers({
    tile: function () {
        return TempGridTiles.find();

        //var stream = {
        //    x: 0,
        //    y: 1,
        //    width: 2,
        //    height: 2,
        //    url: "ee"
        //};
        //
        //Session.set("nesto", stream);

        //var streamArray = [];
        //for (var key in Session.keys) {
        //    var object = JSON.parse(Session.keys[key]);
        //    streamArray.push({
        //        x: object.x,
        //        y: object.y,
        //        width: object.width,
        //        height: object.height,
        //        url: object.url
        //    });
        //}
        //Tracker.autorun(function() {
        //    Session.get("alo");
        //    console.log(Session);
        //});
        //return Session.get("alo");

        //return Template.instance().addStream.get();
    }
});

Template.gridstack.rendered = function () {
    var gridstackOptions = {};
    $('.grid-stack').gridstack(gridstackOptions);

    //$('.grid-stack-item-content').each(function(index) {
    //    $(this).children()[0].width = $(this)[0].offsetWidth;
    //    $(this).children()[0].height = $(this)[0].offsetHeight - 20;
    //});

    // add onChange event listener
    $('.grid-stack').on('change',function (event, items) {
        _.each(items, function (item) {
            var attributes = item.el.data();
            TempGridTiles.update({_id:attributes.panelId}, {$set:{x:attributes.gsX,
                y:attributes.gsY,height:attributes.gsHeight, width:attributes.gsWidth}});

            $('.grid-stack-item-content').each(function(index) {
                console.log($(this))
                //console.log($(this).children()[1].width);
                //console.log($(this).children()[1].height);
                //console.log($(this)[0].offsetWidth);
                //console.log($(this)[0].offsetHeight);
                $(this).children()[0].width = $(this)[0].offsetWidth;
                $(this).children()[0].height = $(this)[0].offsetHeight - 30;
            });
        });

    });
};

Template.gridstackItem.rendered = function () {
    var grid = $('.grid-stack').data('gridstack');
    grid.add_widget(this.$('.grid-stack-item'));
    $('.grid-stack-item-content').each(function(index) {
        $(this).children()[0].width = $(this)[0].offsetWidth;
        $(this).children()[0].height = $(this)[0].offsetHeight - 30;
    });
};

Template.gridstackItem.events({
    'click #removeStream': function() {
        var grid = $('.grid-stack').data('gridstack');
        console.log(grid);
        grid.remove_widget($("div[data-panel-id=" + this._id + "]"));
        console.log(grid);
        TempGridTiles.remove(this._id);
    }
});