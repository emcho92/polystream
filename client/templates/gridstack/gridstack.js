Template.gridstack.helpers({
    tile: function () {
        return TempGridTiles.find();
    }
});

Template.gridstack.rendered = function () {
    var gridstackOptions = {};
    $('.grid-stack').gridstack(gridstackOptions);

    $('.grid-stack').on('change',function (event, items) {
        _.each(items, function (item) {
            var attributes = item.el.data();
            TempGridTiles.update({_id:attributes.panelId}, {$set:{x:attributes.gsX,
                y:attributes.gsY,height:attributes.gsHeight, width:attributes.gsWidth}});

            $('.grid-stack-item-content').each(function(index) {
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
        grid.remove_widget($("div[data-panel-id=" + this._id + "]"));
        TempGridTiles.remove(this._id);
    }
});