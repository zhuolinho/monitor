"use strict";

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Header = React.createClass({
    displayName: "Header",

    render: function render() {
        return React.createElement(
            "div",
            { "data-role": "header", "data-theme": "f" },
            React.createElement(
                "h1",
                null,
                this.props.id
            )
        );
    }
});
var ControlGroup = React.createClass({
    displayName: "ControlGroup",

    render: function render() {
        return React.createElement(
            "div",
            { "data-role": "controlgroup", "data-type": this.props.dataType },
            React.createElement(
                "a",
                { href: "#", "data-role": "button" },
                "按钮 1"
            ),
            React.createElement(
                "a",
                { href: "#", "data-role": "button" },
                "按钮 2"
            ),
            React.createElement(
                "a",
                { href: "#", "data-role": "button" },
                "按钮 3"
            )
        );
    }
});
var Collapsible = React.createClass({
    displayName: "Collapsible",

    render: function render() {
        return React.createElement(
            "div",
            { "data-role": "collapsible", "data-collapsed": "false" },
            React.createElement(
                "h3",
                null,
                "点击我 - 我可以折叠！"
            ),
            React.createElement(
                "p",
                null,
                this.props.count
            ),
            this.props.count > 1 ? React.createElement(Collapsible, { count: this.props.count - 1 }) : ""
        );
    }
});
var Content = React.createClass({
    displayName: "Content",

    render: function render() {
        var _props = this.props;
        var id = _props.id;

        var other = _objectWithoutProperties(_props, ["id"]);

        return React.createElement(
            "div",
            { "data-role": "content", "data-theme": "f" },
            React.createElement(
                "a",
                { href: "#pagetwo" },
                "外部页面"
            ),
            React.createElement("br", null),
            React.createElement(
                "a",
                { href: "externalnotexist.html" },
                "外部页面不存在。"
            )
        );
    }
});
var Footer = React.createClass({
    displayName: "Footer",

    render: function render() {
        return React.createElement(
            "div",
            { "data-role": "footer", "data-position": "fixed", "data-tap-toggle": "false" },
            React.createElement(
                "div",
                { "data-role": "navbar" },
                React.createElement(
                    "ul",
                    null,
                    React.createElement(
                        "li",
                        null,
                        React.createElement(
                            "a",
                            { href: "#pageone", "data-icon": "home", "data-transition": "none", "data-theme": "f",
                                className: this.props.isFirst ? "ui-btn-active ui-state-persist" : "" },
                            "首页"
                        )
                    ),
                    React.createElement(
                        "li",
                        null,
                        React.createElement(
                            "a",
                            { href: "#pagetwo", "data-icon": "arrow-r", "data-transition": "none", "data-theme": "e",
                                className: this.props.isFirst ? "" : "ui-btn-active ui-state-persist" },
                            "页面二"
                        )
                    )
                )
            )
        );
    }
});
var Page = React.createClass({
    displayName: "Page",

    render: function render() {
        return React.createElement(
            "div",
            { "data-role": "page", id: this.props.id, "data-overlay-theme": "b" },
            React.createElement(Header, this.props),
            React.createElement(Content, null),
            React.createElement(Footer, this.props)
        );
    }
});
var App = React.createClass({
    displayName: "App",

    componentDidMount: function componentDidMount() {
        $.mobile.initializePage();
        // debugger;
    },
    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(Page, { id: "pageone", isFirst: true }),
            React.createElement(Page, { id: "pagetwo", isFirst: false })
        );
    }
});
ReactDOM.render(React.createElement(App, null), $("#content")[0]);