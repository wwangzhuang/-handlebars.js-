;(function ($) {
    function Tabs($element) {
        //初始化每一个tab对象
        this.tabs = {}; //储存tab
        var self = this;
        $('.tabs-panel', $element).hide(); //将所有隐藏掉
        $('.tabs-nav', $element).removeClass('active'); //消除所有的选择状态
        this.showName = $('.tabs-nav:eq(0)', $element).attr('name'); //初始化设置显示第一个tab
        $('.tabs-nav', $element).each(function () {
            var name = $(this).attr('name');
            var $menu = $(this);
            var $panel = $(name, $element);
            var tab = new Tab($menu, $panel);
            self.tabs[name] = tab; //缓存tab
        });
        //事件监听
        $element.on('click', '.tabs-nav', function () {
            self.show($(this).attr('name'));
        });
        this.show();
    }
    Tabs.prototype.show = function (name) {
        if (name === this.showName) return;
        if (name) {
            this.tabs[this.showName].hide(); //隐藏原来的
            this.showName = name;
        }
        this.tabs[this.showName].show(); //显示当前的
    };

    function Tab($menu, $panel) {
        this.$menu = $menu;
        this.$panel = $panel;
    }

    Tab.prototype.show = function () {
        this.$menu.addClass('active');
        this.$panel.show();
    };

    Tab.prototype.hide = function () {
        this.$menu.removeClass('active');
        this.$panel.hide();
    };

    $.fn.tabs = function () {
        new Tabs(this);
    };
})(jQuery);            
// tab插件