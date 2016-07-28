"use strict";

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Header = React.createClass({
    displayName: "Header",

    getInitialState: function getInitialState() {
        return { selected: "button1" };
    },
    handleClick: function handleClick(event) {
        this.setState({ selected: event.target.id });
        this.props.callback(event.target.id);
    },
    render: function render() {
        var component = this;
        var i = 0;
        var buttonNodes = this.props.titles.map(function (title) {
            i++;
            if ("button" + i == component.state.selected) {
                return React.createElement(
                    "button",
                    { key: i, onClick: component.handleClick, id: "button" + i, style: {
                            backgroundColor: "#3388cc",
                            color: "white",
                            textShadow: "0 1px 0 #005599"
                        } },
                    title
                );
            } else {
                return React.createElement(
                    "button",
                    { key: i, onClick: component.handleClick, id: "button" + i,
                        style: { backgroundColor: "white" } },
                    title
                );
            }
        });
        return React.createElement(
            "div",
            { "data-role": "header", "data-position": "fixed", "data-tap-toggle": "false", style: { textAlign: "center" } },
            React.createElement(
                "div",
                { "data-role": "controlgroup", "data-type": "horizontal" },
                buttonNodes
            )
        );
    }
});
var HomeTable = React.createClass({
    displayName: "HomeTable",

    getInitialState: function getInitialState() {
        return { alerts: [] };
    },
    componentDidMount: function componentDidMount() {
        var component = this;
        $.get("/dev/unprocessed.json", function (result) {
            component.setState({ alerts: result.pl.alerts });
        });
    },
    componentDidUpdate: function componentDidUpdate() {
        $("table").table("refresh");
    },
    render: function render() {
        var i = 0;
        var bodyNodes = this.state.alerts.map(function (alert) {
            i++;
            return React.createElement(
                "tr",
                { key: i },
                React.createElement(
                    "th",
                    null,
                    alert.tank
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "select",
                        null,
                        React.createElement(
                            "option",
                            { value: "6348" },
                            "J6348"
                        ),
                        React.createElement(
                            "option",
                            { value: "6548" },
                            "C6548"
                        ),
                        React.createElement(
                            "option",
                            { value: "6898" },
                            "D6898"
                        )
                    )
                ),
                React.createElement(
                    "td",
                    null,
                    alert.am || ""
                ),
                React.createElement(
                    "td",
                    null,
                    alert.rt || ""
                ),
                React.createElement(
                    "td",
                    null,
                    (alert.atime || "") + "/" + (alert.pa || "")
                )
            );
        });
        return React.createElement(
            "table",
            { "data-role": "table", className: "ui-responsive" },
            React.createElement(
                "thead",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement("th", null),
                    React.createElement(
                        "th",
                        null,
                        "罐号"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "余量/压力"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "剩余时间"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "时间/工号"
                    )
                )
            ),
            React.createElement(
                "tbody",
                null,
                bodyNodes
            )
        );
    }
});
var HomeCollapsible = React.createClass({
    displayName: "HomeCollapsible",

    componentDidUpdate: function componentDidUpdate() {
        $("table").table("refresh");
    },
    render: function render() {
        var months = ["4月", "3月", "2月", "1月"];
        var i = 0;
        var j = 0;
        return React.createElement(
            "div",
            { "data-role": "collapsible", "data-collapsed-icon": "carat-d", "data-expanded-icon": "carat-u" },
            React.createElement(
                "h3",
                null,
                this.props.aType
            ),
            React.createElement(
                "select",
                null,
                months.map(function (month) {
                    i++;
                    return React.createElement(
                        "option",
                        { key: i },
                        month
                    );
                })
            ),
            React.createElement(
                "table",
                { "data-role": "table", "data-mode": "columntoggle", className: "ui-responsive" },
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            { "data-priority": "2" },
                            "罐号"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "报警时间"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "接报时间"
                        ),
                        React.createElement(
                            "th",
                            { "data-priority": "3" },
                            "调度员"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "报警类型"
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    this.props.alerts.map(function (alert) {
                        j++;
                        return React.createElement(
                            "tr",
                            { key: j },
                            React.createElement(
                                "td",
                                null,
                                alert.code
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.atime
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.pt
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.pa
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.atype
                            )
                        );
                    })
                )
            )
        );
    }
});
var Content2 = React.createClass({
    displayName: "Content2",

    getInitialState: function getInitialState() {
        return { alerts: [] };
    },
    componentDidMount: function componentDidMount() {
        var component = this;
        $.get("/dev/processed.json", function (result) {
            component.setState({ alerts: result.pl.alerts });
        });
    },
    render: function render() {
        var _props = this.props;
        var id = _props.id;

        var other = _objectWithoutProperties(_props, ["id"]);

        var alertTypes = ["余量报警", "压力报警", "信号中断", "泄漏报警", "拉回报警", "进场报警"];
        var i = 0;

        function groupBy(arr, key) {
            var res = {};
            arr.forEach(function (e) {
                if (!res[e[key]]) {
                    res[e[key]] = [];
                }
                res[e[key]].push(e);
            });
            return res;
        }

        var groupObj = groupBy(this.state.alerts, "atype");
        return React.createElement(
            "div",
            { "data-role": "main", className: "ui-content" },
            React.createElement(
                "div",
                { "data-role": "collapsible-set" },
                alertTypes.map(function (alertType) {
                    i++;
                    return React.createElement(HomeCollapsible, { key: i, aType: alertType, alerts: groupObj[alertType] || [] });
                })
            )
        );
    }
});
var Content1 = React.createClass({
    displayName: "Content1",

    render: function render() {
        var _props2 = this.props;
        var id = _props2.id;

        var other = _objectWithoutProperties(_props2, ["id"]);

        return React.createElement(
            "div",
            { "data-role": "main", className: "ui-content" },
            React.createElement(HomeTable, null)
        );
    }
});
var Content3 = React.createClass({
    displayName: "Content3",

    render: function render() {
        var _props3 = this.props;
        var id = _props3.id;

        var other = _objectWithoutProperties(_props3, ["id"]);

        return React.createElement(
            "div",
            { "data-role": "main", className: "ui-content" },
            "Page3"
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
                            { href: "#pageone", "data-icon": "home", "data-transition": "none",
                                className: this.props.id == "pageone" ? "ui-btn-active ui-state-persist" : "" },
                            "首页"
                        )
                    ),
                    React.createElement(
                        "li",
                        null,
                        React.createElement(
                            "a",
                            { href: "#pagetwo", "data-icon": "arrow-r", "data-transition": "none",
                                className: this.props.id == "pagetwo" ? "ui-btn-active ui-state-persist" : "" },
                            "实时监控"
                        )
                    ),
                    React.createElement(
                        "li",
                        null,
                        React.createElement(
                            "a",
                            { href: "#pagethree", "data-icon": "clock", "data-transition": "none",
                                className: this.props.id == "pagethree" ? "ui-btn-active ui-state-persist" : "" },
                            "GPS"
                        )
                    )
                )
            )
        );
    }
});
var Page = React.createClass({
    displayName: "Page",

    getInitialState: function getInitialState() {
        return { selected: "button1" };
    },
    handleHeader: function handleHeader(buttonId) {
        this.setState({ selected: buttonId });
    },
    componentDidUpdate: function componentDidUpdate() {
        $("#content").trigger("create");
    },
    render: function render() {
        var content = React.createElement(Content3, null);
        if (this.state.selected == "button1") {
            if (this.props.id == "pageone") {
                content = React.createElement(Content1, null);
            }
        } else if (this.state.selected == "button2") {
            content = React.createElement(Content2, null);
        }
        return React.createElement(
            "div",
            { "data-role": "page", id: this.props.id },
            React.createElement(Header, { titles: this.props.titles, callback: this.handleHeader }),
            content,
            React.createElement(Footer, { id: this.props.id })
        );
    }
});
var App = React.createClass({
    displayName: "App",

    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(Page, { id: "pageone", titles: ["报警通知", "处理与完成"] }),
            React.createElement(Page, { id: "pagetwo", titles: ["气种设备", "视频监控"] }),
            React.createElement(Page, { id: "pagethree", titles: ["配送列表", "GPS地图", "处理与完成"] })
        );
    }
});
ReactDOM.render(React.createElement(App, null), document.getElementById("content"));