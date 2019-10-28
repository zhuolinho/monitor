/**
 * Created by Y on 2017/9/4.
 */
"use strict";

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function groupBy(arr, key) {
    var res = {};
    arr.forEach(function (ele) {
        if (!res[ele[key]]) {
            res[ele[key]] = [];
        }
        res[ele[key]].push(ele);
    });
    return res;
}
function userGet(url, callback) {
    var user = JSON.parse(localStorage.user);
    $.ajax(url, { type: "GET", headers: { user: JSON.stringify({_id:user._id,ap:user.ap,an:user.an,oID:user.oID}) }, success: callback });
}
var EventEmitter = {
    _events: {},
    dispatch: function dispatch(event, data) {
        if (!this._events[event]) {
            // 没有监听事件
            return;
        }
        for (var i = 0; i < this._events[event].length; i++) {
            this._events[event][i](data);
        }
    },
    subscribe: function subscribe(event, callback) {
        // 创建一个新事件数组
        if (!this._events[event]) {
            this._events[event] = [];
        }
        this._events[event].push(callback);
    }
};
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
            React.createElement("img", { src: "/mobile/images/logo2.png",
                style: { height: "36px", position: "absolute", left: "0px", marginTop: "8px" } }),
            React.createElement("img", { src: "/mobile/images/logo1.png",
                style: { height: "36px", position: "absolute", right: "0px", margin: "8px 2px" } }),
            React.createElement(
                "div",
                { "data-role": "controlgroup", "data-type": "horizontal" },
                buttonNodes
            )
        );
    }
});
var AllTable = React.createClass({
    displayName: "AllTable",

    handleTable: function handleTable(e) {
        this.setState({ table: e.target.value });
    },
    getInitialState: function getInitialState() {
        return { plc: {}, address: [], table: 0 };
    },
    componentDidMount: function componentDidMount() {
        var component = this;
        userGet("/plc/connected/get-all.json", function (result) {
            var address = [];
            var plc = {};
            address = result.pl.address.sort(function (a, b) {
                return b.tank > a.tank ? 1 : -1;
            });
            result.pl.plc.forEach(function (obj) {
                plc[obj.tank] = obj;
            });
            component.setState({ plc: plc, address: address });
        });
    },
    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "select",
                { onChange: this.handleTable },
                React.createElement(
                    "option",
                    { value: "0" },
                    "表1"
                ),
                React.createElement(
                    "option",
                    { value: "1" },
                    "表2"
                )
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
                            { "data-priority": "1" },
                            "公司"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "累计流量(Nm",
                            React.createElement(
                                "sup",
                                null,
                                "3"
                            ),
                            ")"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "用量(Nm",
                            React.createElement(
                                "sup",
                                null,
                                "3"
                            ),
                            ")"
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    this.state.address.map((function (alert, i) {
                        return React.createElement(
                            "tr",
                            { key: i },
                            React.createElement(
                                "td",
                                null,
                                alert.addr
                            ),
                            React.createElement(
                                "td",
                                null,
                                this.state.table == false ? this.state.plc[alert.tank] ? this.state.plc[alert.tank].maxVal1 : undefined : this.state.plc[alert.tank] ? this.state.plc[alert.tank].maxVal2 : undefined
                            ),
                            React.createElement(
                                "td",
                                null,
                                this.state.table == false ? this.state.plc[alert.tank] ? this.state.plc[alert.tank].usage1 : undefined : this.state.plc[alert.tank] ? this.state.plc[alert.tank].usage2 : undefined
                            )
                        );
                    }).bind(this))
                )
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
        userGet("/plc/alerts/unprocessed.json", function (result) {
            component.setState({ alerts: result.pl.alerts });
        });
    },
    componentDidUpdate: function componentDidUpdate() {
        $("#content").trigger("create");
    },
    render: function render() {
        var i = 0;
        var bodyNodes = this.state.alerts.map(function (alert) {
            i++;
            return React.createElement(
                "table",
                { "data-role": "table", className: "ui-responsive", key: i },
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement("th", null),
                        alert.atype == "余量报警" ? React.createElement(
                            "th",
                            null,
                            "余量/压力"
                        ) : null,
                        alert.atype == "压力报警" ? React.createElement(
                            "th",
                            null,
                            "压力/异常"
                        ) : null,
                        alert.atype == "信号中断" ? React.createElement(
                            "th",
                            null,
                            "信号/异常"
                        ) : null,
                        alert.atype == "泄漏报警" ? React.createElement(
                            "th",
                            null,
                            "泄漏/异常"
                        ) : null,
                        alert.atype == "余量报警" ? React.createElement(
                            "th",
                            null,
                            "剩余时间"
                        ) : null,
                        alert.atype == "拉回报警" || alert.atype == "进场报警" ? React.createElement(
                            "th",
                            null,
                            "报警类型"
                        ) : null,
                        alert.atype == "拉回报警" || alert.atype == "进场报警" ? React.createElement(
                            "th",
                            null,
                            "已选罐号"
                        ) : null,
                        alert.atype == "拉回报警" || alert.atype == "进场报警" ? React.createElement(
                            "th",
                            null,
                            "拉回数量"
                        ) : null,
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
                    React.createElement(
                        "tr",
                        { key: i },
                        React.createElement(
                            "th",
                            null,
                            alert.tank
                        ),
                        alert.atype == "余量报警" ? React.createElement(
                            "td",
                            null,
                            alert.am || ""
                        ) : null,
                        alert.atype == "压力报警" ? React.createElement(
                            "td",
                            null,
                            alert.am || ""
                        ) : null,
                        alert.atype == "信号中断" ? React.createElement(
                            "td",
                            null,
                            alert.am || ""
                        ) : null,
                        alert.atype == "泄漏报警" ? React.createElement(
                            "td",
                            null,
                            alert.am || ""
                        ) : null,
                        alert.atype == "余量报警" ? React.createElement(
                            "td",
                            null,
                            alert.rt || ""
                        ) : null,
                        alert.atype == "拉回报警" || alert.atype == "进场报警" ? React.createElement(
                            "td",
                            null,
                            alert.am
                        ) : null,
                        alert.atype == "拉回报警" || alert.atype == "进场报警" ? React.createElement(
                            "td",
                            null,
                            alert.st.map(function (res) {
                                return res.ti + ",";
                            })
                        ) : null,
                        alert.atype == "拉回报警" || alert.atype == "进场报警" ? React.createElement(
                            "td",
                            null,
                            alert.st.length,
                            "个"
                        ) : null,
                        React.createElement(
                            "td",
                            null,
                            (alert.atime || "") + "/" + (alert.pa || "")
                        )
                    )
                )
            );
        });
        return React.createElement(
            "div",
            null,
            bodyNodes.length ? bodyNodes : ""
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
var GpsCollapsible = React.createClass({
    displayName: "GpsCollapsible",

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
                            "原罐号"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "换罐号"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "配送时间"
                        ),
                        React.createElement(
                            "th",
                            { "data-priority": "1" },
                            "送达时间"
                        ),
                        React.createElement(
                            "th",
                            { "data-priority": "3" },
                            "车牌/司机/押运"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "调度员"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "距离"
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
                                alert.oti
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.nti
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.dt
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.at
                            ),
                            React.createElement(
                                "td",
                                null,
                                (alert.lp || " ") + "/" + (alert.driver || " ") + "/" + (alert.s || " ")
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.pa
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.dist
                            )
                        );
                    })
                )
            )
        );
    }
});
var GpsMap = React.createClass({
    displayName: "GpsMap",

    componentDidMount: function componentDidMount() {
        var map = new BMap.Map("gpsMap"); // 创建地图实例
        var point = new BMap.Point(121.454, 31.153); // 创建点坐标
        map.centerAndZoom(point, 10); // 初始化地图，设置中心点坐标和地图级别
        userGet("/gps/cars/all.json", function (result) {
            var convertor = new BMap.Convertor();
            result.pl.cars.forEach(function (ele) {
                var ggPoint = new BMap.Point(ele.lng, ele.lat);
                convertor.translate([ggPoint], 1, 5, function (data) {
                    if (data.status === 0) {
                        var marker = new BMap.Marker(data.points[0]);
                        marker.addEventListener("click", function () {
                            $("#positionWindow").html("<p>车辆:" + ele.lp + "</p><p>速度:" + ele.speed + "km/h</p>");
                            $("#modal").trigger("click");
                        });
                        map.addOverlay(marker);
                        ele.marker = marker;
                    }
                });
            });
            EventEmitter.dispatch("GPS", result.pl);
        });
    },
    render: function render() {
        var mapHeight = $.mobile.getScreenHeight() - 205;
        return React.createElement("div", { id: "gpsMap", style: { height: mapHeight } });
    }
});
var GpsTable = React.createClass({
    displayName: "GpsTable",

    getInitialState: function getInitialState() {
        return { shipmentList: [] };
    },
    componentDidMount: function componentDidMount() {
        var component = this;
        userGet("/plc/shipments.json", function (result) {
            component.setState({ shipmentList: result.pl.shipmentList });
        });
    },
    componentDidUpdate: function componentDidUpdate() {
        $("table").table("refresh");
    },
    render: function render() {
        var i = 0;
        var bodyNodes = this.state.shipmentList.map(function (alert) {
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
                    alert.code
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
                bodyNodes.length ? bodyNodes : "加载中..."
            )
        );
    }
});
var Content1 = React.createClass({
    displayName: "Content1",

    render: function render() {
        var _props = this.props;
        var id = _props.id;

        var other = _objectWithoutProperties(_props, ["id"]);

        return React.createElement(
            "div",
            { "data-role": "main", className: "ui-content" },
            React.createElement(HomeTable, null)
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
        userGet("/plc/alerts/processed.json", function (result) {
            component.setState({ alerts: result.pl.alerts });
        });
    },
    render: function render() {
        var _props2 = this.props;
        var id = _props2.id;

        var other = _objectWithoutProperties(_props2, ["id"]);

        var alertTypes = ["余量报警", "压力报警", "信号中断", "泄漏报警", "拉回报警", "进场报警"];
        var i = 0;
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
var Content3 = React.createClass({
    displayName: "Content3",

    getInitialState: function getInitialState() {
        return { cars: [] };
    },
    componentDidMount: function componentDidMount() {
        var component = this;
        EventEmitter.subscribe("GPS", function (data) {
            component.setState(data);
        });
    },
    handleSelect: function handleSelect(e) {
        if (e.target.value < 0) {
            this.state.cars.forEach(function (obj) {
                obj.marker.show();
            });
        } else {
            this.state.cars.forEach(function (obj, index) {
                if (e.target.value == index) obj.marker.show();else obj.marker.hide();
            });
        }
    },
    render: function render() {
        var i = 0;
        return React.createElement(
            "div",
            { "data-role": "main", className: "ui-content", style: {} },
            React.createElement(
                "select",
                { onChange: this.handleSelect },
                React.createElement(
                    "option",
                    { value: -1 },
                    "全部车辆"
                ),
                this.state.cars.map(function (car) {
                    i++;
                    return React.createElement(
                        "option",
                        { key: i, value: i - 1 },
                        car.lp
                    );
                })
            ),
            React.createElement(GpsMap, null),
            React.createElement(
                "a",
                { href: "#positionWindow", className: "ui-btn ui-corner-all ui-shadow ui-btn-inline", "data-rel": "popup",
                    "data-position-to": "window", style: { display: "none" }, id: "modal" },
                "Position to window"
            ),
            React.createElement("div", { "data-role": "popup", id: "positionWindow", className: "ui-content", "data-theme": "a" })
        );
    }
});
var Content4 = React.createClass({
    displayName: "Content4",

    plc: { dates: [], values: [], values2: [] },
    generateC3: function generateC3() {
        var y = this.state.table == false ? this.plc.values : this.plc.values2;
        var x = this.plc.dates;
        var statsChart = c3.generate({
            bindto: '#statsChart',
            data: {
                x: 'x',
                xFormat: '%Y-%m-%d %H:%M:%S',
                columns: [x, y]
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        count: 24,
                        format: '%H:%M' //how the date is displayed
                    }
                }
            }
        });
    },
    getInitialState: function getInitialState() {
        var d = new Date();
        return {
            tableByMonth: [],
            realTimeData: {},
            plcAddresses: {},
            month: d.getMonth() + 1,
            tank: "",
            table: 0
        };
    },
    getMonthTable: function getMonthTable(mon, tank) {
        var component = this;
        this.setState({ tableByMonth: [] });
        var d = new Date();
        var year;
        var month;
        if (mon > 0) {
            month = mon;
            year = d.getFullYear();
        } else {
            month = 12 + parseInt(mon);
            year = d.getFullYear() - 1;
        }
        if (month < 10) {
            month = "0" + month;
        }
        userGet("/plc/stats/" + year + "-" + month + "-01/" + year + "-" + month + "-31/" + tank + "/day.json", function (result) {
            component.setState({ tableByMonth: result.pl.plc });
        });
    },
    getLast: function getLast(tank) {
        userGet("/plc/forlasthours/" + tank + ".json", (function (result) {
            this.plc = result.pl.plc;
            this.plc.dates.unshift("x");
            this.plc.values.unshift("瞬时流量");
            this.plc.values2.unshift("瞬时流量");
            this.generateC3();
        }).bind(this));
    },
    handleMonth: function handleMonth(e) {
        this.setState({ month: e.target.value });
        this.getMonthTable(e.target.value, this.state.tank);
    },
    handleTable: function handleTable(e) {
        this.setState({ table: e.target.value });
    },
    handleTank: function handleTank(e) {
        this.setState({ tank: e.target.value });
        this.getMonthTable(this.state.month, e.target.value);
        this.getLast(e.target.value);
        this.plc = { dates: [], values: [], values2: [] };
    },
    componentDidMount: function componentDidMount() {
        var component = this;
        userGet("/plc/latest/withaddress.json", function (result) {
            var tmp = {};
            var i = 0;
            for (var obj in result.pl.plc) {
                if (i == 0) {
                    component.getMonthTable(component.state.month, obj);
                    component.setState({ tank: obj });
                    component.getLast(obj);
                }
                tmp[obj] = result.pl.plc[obj];
                i++;
            }
            component.setState({ realTimeData: tmp });
            var temp = {};
            for (i = 0; i < result.pl.address.length; i++) {
                temp[result.pl.address[i].tank] = result.pl.address[i];
            }
            component.setState({ plcAddresses: temp });
        });
    },
    componentDidUpdate: function componentDidUpdate() {
        $("table").table("refresh");
        $("select").selectmenu("refresh");
        this.generateC3();
    },
    render: function render() {
        var _props3 = this.props;
        var id = _props3.id;

        var other = _objectWithoutProperties(_props3, ["id"]);

        var d = new Date();
        var months = [];
        for (var i = d.getMonth() + 1; i > 0; i--) {
            months.push(d.getFullYear() + "年" + i + "月");
        }
        for (var i = 12; i > d.getMonth() + 1; i--) {
            months.push(d.getFullYear() - 1 + "年" + i + "月");
        }
        var i = 0;
        var j = 0;
        var k = 0;
        var ii = 0;
        var component = this;
        var temp = this.state.realTimeData[this.state.tank];
        var realHead = "";
        var realBody = "";
        if (temp) {
            if (temp.plcType == "Guanwang") {
                realHead = React.createElement(
                    "tr",
                    null,
                    React.createElement("th", null),
                    React.createElement(
                        "th",
                        null,
                        "流量表名称"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "分配地址"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "累计流量(Nm",
                        React.createElement(
                            "sup",
                            null,
                            "3"
                        ),
                        ")"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "瞬时流量(Nm",
                        React.createElement(
                            "sup",
                            null,
                            "3"
                        ),
                        "/h)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "温度(",
                        React.createElement(
                            "sup",
                            null,
                            "o"
                        ),
                        "C)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "压力(Kpa)"
                    ),
                    React.createElement("th", null),
                    React.createElement(
                        "th",
                        null,
                        "流量表名称"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "分配地址"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "累计流量(Nm",
                        React.createElement(
                            "sup",
                            null,
                            "3"
                        ),
                        ")"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "瞬时流量(Nm",
                        React.createElement(
                            "sup",
                            null,
                            "3"
                        ),
                        "/h)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "温度(",
                        React.createElement(
                            "sup",
                            null,
                            "o"
                        ),
                        "C)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "压力(Kpa)"
                    )
                );
                realBody = React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        component.state.plcAddresses[component.state.tank] ? component.state.plcAddresses[component.state.tank].addr : component.state.tank
                    ),
                    React.createElement(
                        "td",
                        null,
                        "流量计 " + temp.addr1
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.addr1
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.psc1
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.isc1
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.temp1
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.p1
                    ),
                    React.createElement("td", null),
                    React.createElement(
                        "td",
                        null,
                        "流量计 " + temp.addr2
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.addr2
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.psc2
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.isc2
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.temp2
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.p2
                    )
                );
            } else if (temp.plcType == "CNG" && temp.cngType == 3) {
                realHead = React.createElement(
                    "tr",
                    null,
                    React.createElement("th", null),
                    React.createElement(
                        "th",
                        null,
                        "剩余时间(H)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "剩余量(Nm",
                        React.createElement(
                            "sup",
                            null,
                            "3"
                        ),
                        ")"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "累计流量1(Nm",
                        React.createElement(
                            "sup",
                            null,
                            "3"
                        ),
                        ")"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "瞬时流量1(Nm",
                        React.createElement(
                            "sup",
                            null,
                            "3"
                        ),
                        "/h)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "累计流量2(Nm",
                        React.createElement(
                            "sup",
                            null,
                            "3"
                        ),
                        ")"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "瞬时流量2(Nm",
                        React.createElement(
                            "sup",
                            null,
                            "3"
                        ),
                        "/h)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "流量计出口温度(",
                        React.createElement(
                            "sup",
                            null,
                            "o"
                        ),
                        "C)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "出口压力(Kpa)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "入口压力1(MPa)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "入口压力2(MPa)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "一级调压后压力1(Bar)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "一级调压后压力2(Bar)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "一级调压后温度1(",
                        React.createElement(
                            "sup",
                            null,
                            "o"
                        ),
                        "C)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "一级调压后温度2(",
                        React.createElement(
                            "sup",
                            null,
                            "o"
                        ),
                        "C)"
                    )
                );
                realBody = React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        component.state.plcAddresses[component.state.tank] ? component.state.plcAddresses[component.state.tank].addr : component.state.tank
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.rft
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.rfq
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.cumfow0
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.instfow0
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.cumfow
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.instfow
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.fmot
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.outputP
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.inputP1
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.inputP2
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.paflpa1
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.paflpa2
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.taflpa1
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.taflpa2
                    )
                );
            } else if (temp.plcType == "CNG" && temp.cngType == 2) {
                realHead = React.createElement(
                    "tr",
                    null,
                    React.createElement("th", null),
                    React.createElement(
                        "th",
                        null,
                        "累计流量(Nm",
                        React.createElement(
                            "sup",
                            null,
                            "3"
                        ),
                        ")"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "瞬时流量(Nm",
                        React.createElement(
                            "sup",
                            null,
                            "3"
                        ),
                        "/h)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "流量计出口温度(",
                        React.createElement(
                            "sup",
                            null,
                            "o"
                        ),
                        "C)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "出口压力(Kpa)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "入口压力1(MPa)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "入口压力2(MPa)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "一级调压后压力1(Bar)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "一级调压后压力2(Bar)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "一级调压后温度1(",
                        React.createElement(
                            "sup",
                            null,
                            "o"
                        ),
                        "C)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "一级调压后温度2(",
                        React.createElement(
                            "sup",
                            null,
                            "o"
                        ),
                        "C)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "一号换热器温度 (℃)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "二号换热器温度 (℃)"
                    )
                );
                realBody = React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        component.state.plcAddresses[component.state.tank] ? component.state.plcAddresses[component.state.tank].addr : component.state.tank
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.cumfow
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.instfow
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.fmot
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.outputP
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.inputP1
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.inputP2
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.paflpa1
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.paflpa2
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.taflpa1
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.taflpa2
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.hxt1
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.hxt2
                    )
                );
            } else if (temp.plcType == "CNG" && temp.cngType == 0) {
                realHead = React.createElement(
                    "tr",
                    null,
                    React.createElement("th", null),
                    React.createElement(
                        "th",
                        null,
                        "累计流量(Nm",
                        React.createElement(
                            "sup",
                            null,
                            "3"
                        ),
                        ")"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "瞬时流量(Nm",
                        React.createElement(
                            "sup",
                            null,
                            "3"
                        ),
                        "/h)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "流量计出口温度(",
                        React.createElement(
                            "sup",
                            null,
                            "o"
                        ),
                        "C)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "出口压力(Kpa)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "入口压力1(MPa)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "入口压力2(MPa)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "一级调压后压力1(Bar)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "一级调压后压力2(Bar)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "一级调压后温度1(",
                        React.createElement(
                            "sup",
                            null,
                            "o"
                        ),
                        "C)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "一级调压后温度2(",
                        React.createElement(
                            "sup",
                            null,
                            "o"
                        ),
                        "C)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "一号出口压力(Bar)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "二号出口压力(Bar)"
                    )
                );
                realBody = React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        component.state.plcAddresses[component.state.tank] ? component.state.plcAddresses[component.state.tank].addr : component.state.tank
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.cumfow
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.instfow
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.fmot
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.outputP
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.inputP1
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.inputP2
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.paflpa1
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.paflpa2
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.taflpa1
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.taflpa2
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.outputP1
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.outputP2
                    )
                );
            } else if (temp.plcType == "CNG") {
                realHead = React.createElement(
                    "tr",
                    null,
                    React.createElement("th", null),
                    React.createElement(
                        "th",
                        null,
                        "累计流量(Nm",
                        React.createElement(
                            "sup",
                            null,
                            "3"
                        ),
                        ")"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "瞬时流量(Nm",
                        React.createElement(
                            "sup",
                            null,
                            "3"
                        ),
                        "/h)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "流量计出口温度(",
                        React.createElement(
                            "sup",
                            null,
                            "o"
                        ),
                        "C)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "出口压力(Kpa)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "入口压力1(MPa)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "入口压力2(MPa)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "一级调压后压力1(Bar)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "一级调压后压力2(Bar)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "一级调压后温度1(",
                        React.createElement(
                            "sup",
                            null,
                            "o"
                        ),
                        "C)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "一级调压后温度2(",
                        React.createElement(
                            "sup",
                            null,
                            "o"
                        ),
                        "C)"
                    )
                );
                realBody = React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        component.state.plcAddresses[component.state.tank] ? component.state.plcAddresses[component.state.tank].addr : component.state.tank
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.cumfow
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.instfow
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.fmot
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.outputP
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.inputP1
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.inputP2
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.paflpa1
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.paflpa2
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.taflpa1
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.taflpa2
                    )
                );
            } else if (temp.plcType == "LNG") {
                realHead = React.createElement(
                    "tr",
                    null,
                    React.createElement("th", null),
                    React.createElement(
                        "th",
                        null,
                        "累计流量(Nm",
                        React.createElement(
                            "sup",
                            null,
                            "3"
                        ),
                        ")"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "瞬时流量(Nm",
                        React.createElement(
                            "sup",
                            null,
                            "3"
                        ),
                        "/h)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "流量计出口温度(",
                        React.createElement(
                            "sup",
                            null,
                            "o"
                        ),
                        "C)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "出口压力(Kpa)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "储罐压力(Bar)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "调压区入口压力(Bar)"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "储罐液位(%)"
                    )
                );
                realBody = React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        component.state.plcAddresses[component.state.tank] ? component.state.plcAddresses[component.state.tank].addr : component.state.tank
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.cumfow
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.instfow
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.fmot
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.outputP
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.tankp
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.azip
                    ),
                    React.createElement(
                        "td",
                        null,
                        temp.tanklavel
                    )
                );
            }
        }
        return React.createElement(
            "div",
            { "data-role": "main", className: "ui-content ui-grid-b" },
            React.createElement(
                "div",
                { style: { overflowX: "auto", overflowY: "hidden" } },
                React.createElement("div", { id: "statsChart", style: { width: "2000px" } })
            ),
            React.createElement(
                "div",
                { className: "ui-block-a" },
                React.createElement(
                    "select",
                    { onChange: this.handleTank },
                    Object.keys(this.state.realTimeData).sort(function (a, b) {
                        return b > a ? 1 : -1;
                    }).map(function (alert) {
                        ii++;
                        var str = "";
                        if (component.state.plcAddresses[alert]) {
                            str = component.state.plcAddresses[alert].addr;
                        } else {
                            str = alert;
                        }
                        return React.createElement(
                            "option",
                            { value: alert, key: ii },
                            str
                        );
                    })
                )
            ),
            React.createElement(
                "div",
                { className: "ui-block-b" },
                React.createElement(
                    "select",
                    { onChange: this.handleMonth },
                    months.map(function (ele) {
                        i++;
                        return React.createElement(
                            "option",
                            { value: d.getMonth() + 2 - i, key: i },
                            ele
                        );
                    })
                )
            ),
            React.createElement(
                "div",
                { className: "ui-block-c" },
                React.createElement(
                    "select",
                    { onChange: this.handleTable },
                    React.createElement(
                        "option",
                        { value: "0" },
                        "表1"
                    ),
                    React.createElement(
                        "option",
                        { value: "1" },
                        "表2"
                    )
                )
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
                            null,
                            "罐号"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "日期"
                        ),
                        React.createElement(
                            "th",
                            { "data-priority": "1" },
                            "累积流量"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "用量"
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    this.state.tableByMonth.map(function (alert) {
                        k++;
                        return React.createElement(
                            "tr",
                            { key: k },
                            React.createElement(
                                "td",
                                null,
                                component.state.tank
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.date
                            ),
                            React.createElement(
                                "td",
                                null,
                                component.state.table == false ? alert.maxVal1 : alert.maxVal2
                            ),
                            React.createElement(
                                "td",
                                null,
                                component.state.table == false ? alert.usage1 : alert.usage2
                            )
                        );
                    })
                )
            ),
            React.createElement(
                "table",
                { "data-role": "table", className: "ui-responsive" },
                React.createElement(
                    "thead",
                    null,
                    realHead
                ),
                React.createElement(
                    "tbody",
                    null,
                    realBody
                )
            )
        );
    }
});
var Content5 = React.createClass({
    displayName: "Content5",

    getInitialState: function getInitialState() {
        return { cam: 9, addr: 1, isFirst: false };
    },
    handleSelect: function handleSelect(e) {
        this.setState({ cam: e.target.value });
    },
    handleAddr: function handleAddr(e) {
        var cam = 0;
        var addr = e.target.value;
        if (addr == 1) {
            cam = 9;
        } else if (addr == 2) {
            cam = 1;
        } else if (addr == 3) {
            cam = 6;
        } else if (addr == 4) {
            cam = 11;
        }
        this.setState({ cam: cam, addr: addr, isFirst: true });
    },
    componentDidUpdate: function componentDidUpdate() {
        $("select").selectmenu("refresh", true);
        if (this.state.isFirst) {
            this.setState({ isFirst: false });
        }
        var url = "";
        if (this.state.cam == 1) {
            url = "d3b7fa59bdda4f55823629b0f0d5ef51";
        } else if (this.state.cam == 2) {
            url = "e80e35b46d624f92be8061fb3bc8d65b";
        } else if (this.state.cam == 3) {
            url = "d42418818a4f445687f7849f260e32ab";
        } else if (this.state.cam == 4) {
            url = "36c4baa31bb549d9a0751e89632b3821";
        } else if (this.state.cam == 5) {
            url = "858fea1ce70641ebb4ae02023fa8056b";
        } else if (this.state.cam == 6) {
            url = "3f5b206b08694346a765caf88d86ab09";
        } else if (this.state.cam == 7) {
            url = "0a7b6f17214d4a20a55a4f2602e1a9bb";
        } else if (this.state.cam == 8) {
            url = "ef6503a2096d418f9ecd18edd771e88a";
        } else if (this.state.cam == 9) {
            url = "b272845e5b5c434eae96bd68b85d8c39";
        } else if (this.state.cam == 10) {
            url = "0fcb89c9170d4b6896fadf88a5b52253";
        } else if (this.state.cam == 11) {
            url = "e3f2e13b4d834260bd356e7baeb302b1";
        } else if (this.state.cam == 12) {
            url = "c0c479371a32476ca46be02a1bc20898";
        } else if (this.state.cam == 13) {
            url = "328abe9b21a841c69520471d89d03805";
        } else if (this.state.cam == 14) {
            url = "5f16469279294953bc6c3bb4df8b328e";
        }
        $("#fucker").html('<video id="myPlayer" poster="" controls playsInline webkit-playsinline autoplay style="width: 100%"><source src="rtmp://rtmp.open.ys7.com/openlive/' + url + '" type=""/><source src="http://hls.open.ys7.com/openlive/' + url + '.m3u8" type="application/x-mpegURL"/> </video>');
        new EZUIPlayer('myPlayer');
    },
    componentDidMount: function componentDidMount() {
        $("#fucker").html('<video id="myPlayer" poster="" controls playsInline webkit-playsinline autoplay style="width: 100%"><source src="rtmp://rtmp.open.ys7.com/openlive/b272845e5b5c434eae96bd68b85d8c39" type=""/><source src="http://hls.open.ys7.com/openlive/b272845e5b5c434eae96bd68b85d8c39.m3u8" type="application/x-mpegURL"/> </video>');
        new EZUIPlayer('myPlayer');
    },
    render: function render() {
        var options;
        if (this.state.isFirst) {
            options = React.createElement("select", { onChange: this.handleSelect });
        } else {
            if (this.state.addr == 1) {
                options = React.createElement(
                    "select",
                    { onChange: this.handleSelect },
                    React.createElement(
                        "option",
                        { value: "9" },
                        "宝山万事红调度室"
                    ),
                    React.createElement(
                        "option",
                        { value: "10" },
                        "宝山万事红停车场"
                    )
                );
            } else if (this.state.addr == 2) {
                options = React.createElement(
                    "select",
                    { onChange: this.handleSelect },
                    React.createElement(
                        "option",
                        { value: "1" },
                        "日建站1号"
                    ),
                    React.createElement(
                        "option",
                        { value: "3" },
                        "日建站2号"
                    ),
                    React.createElement(
                        "option",
                        { value: "4" },
                        "日建控制室"
                    ),
                    React.createElement(
                        "option",
                        { value: "2" },
                        "日建大门"
                    )
                );
            } else if (this.state.addr == 3) {
                options = React.createElement(
                    "select",
                    { onChange: this.handleSelect },
                    React.createElement(
                        "option",
                        { value: "6" },
                        "上食站1号"
                    ),
                    React.createElement(
                        "option",
                        { value: "8" },
                        "上食站2号"
                    ),
                    React.createElement(
                        "option",
                        { value: "5" },
                        "上食站控制室"
                    ),
                    React.createElement(
                        "option",
                        { value: "7" },
                        "上食大门"
                    )
                );
            } else if (this.state.addr == 4) {
                options = React.createElement(
                    "select",
                    { onChange: this.handleSelect },
                    React.createElement(
                        "option",
                        { value: "11" },
                        "天源1号"
                    ),
                    React.createElement(
                        "option",
                        { value: "14" },
                        "天源2号"
                    ),
                    React.createElement(
                        "option",
                        { value: "13" },
                        "天源站控制室"
                    ),
                    React.createElement(
                        "option",
                        { value: "12" },
                        "天源站大门"
                    )
                );
            }
        }
        return React.createElement(
            "div",
            { "data-role": "main", className: "ui-content ui-grid-a" },
            React.createElement(
                "div",
                { className: "ui-block-a" },
                React.createElement(
                    "select",
                    { onChange: this.handleAddr },
                    React.createElement(
                        "option",
                        { value: "1" },
                        "上海万事红危险货物物流有限公司 春和路588号"
                    ),
                    React.createElement(
                        "option",
                        { value: "2" },
                        "CNG-日建供气站（万事红)"
                    ),
                    React.createElement(
                        "option",
                        { value: "3" },
                        "CNG-上食供气站（顺天)"
                    ),
                    React.createElement(
                        "option",
                        { value: "4" },
                        "CNG-天源供气站（顺天)"
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "ui-block-b" },
                options
            ),
            React.createElement("div", { id: "fucker" })
        );
    }
});
var Content6 = React.createClass({
    displayName: "Content6",

    render: function render() {
        var _props4 = this.props;
        var id = _props4.id;

        var other = _objectWithoutProperties(_props4, ["id"]);

        return React.createElement(
            "div",
            { "data-role": "main", className: "ui-content" },
            React.createElement(GpsTable, null)
        );
    }
});
var Content7 = React.createClass({
    displayName: "Content7",

    getInitialState: function getInitialState() {
        return { done: [] };
    },
    componentDidMount: function componentDidMount() {
        var component = this;
        userGet("/gps/shipments/done.json", function (result) {
            component.setState({ done: result.pl.shipments });
        });
    },
    render: function render() {
        var _props5 = this.props;
        var id = _props5.id;

        var other = _objectWithoutProperties(_props5, ["id"]);

        var alertTypes = ["CNG", "LNG", "集格", "杜瓦瓶", "进场", "拉回"];
        var i = 0;
        var groupObj = groupBy(this.state.done, "ntt");
        return React.createElement(
            "div",
            { "data-role": "main", className: "ui-content" },
            React.createElement(
                "div",
                { "data-role": "collapsible-set" },
                alertTypes.map(function (alertType) {
                    i++;
                    return React.createElement(GpsCollapsible, { key: i, aType: alertType, alerts: groupObj[alertType] || [] });
                })
            )
        );
    }
});
var Content8 = React.createClass({
    displayName: "Content8",

    render: function render() {
        return React.createElement(
            "div",
            { "data-role": "main", className: "ui-content" },
            React.createElement(AllTable, null)
        );
    }
});
var BlankContent = React.createClass({
    displayName: "BlankContent",

    render: function render() {
        return React.createElement("div", { "data-role": "main", className: "ui-content" });
    }
});
var Footer = React.createClass({
    displayName: "Footer",

    handleClick: function handleClick(event) {
        EventEmitter.dispatch(event.target.id);
    },
    render: function render() {
        return React.createElement(
            "div",
            { "data-role": "footer", "data-position": "fixed", "data-tap-toggle": "false" },
            React.createElement(
                "div",
                { "data-role": "navbar", className: "nav-glyphish-example" },
                React.createElement(
                    "ul",
                    null,
                    React.createElement(
                        "li",
                        { onClick: this.handleClick },
                        React.createElement(
                            "a",
                            { id: "pageone", href: "#pageone", "data-icon": "custom",
                                "data-transition": "none",
                                className: this.props.id == "pageone" ? "ui-btn-active ui-state-persist" : "" },
                            "首页"
                        )
                    ),
                    React.createElement(
                        "li",
                        { onClick: this.handleClick },
                        React.createElement(
                            "a",
                            { id: "pagethree", href: "#pagethree", "data-icon": "custom",
                                "data-transition": "none",
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
        return { selected: "button1", isDelete: false };
    },
    handleHeader: function handleHeader(buttonId) {
        this.setState({ selected: buttonId });
    },
    componentDidUpdate: function componentDidUpdate() {
        if (this.state.isDelete) {
            this.setState({ isDelete: false });
        } else {
            $("#content").trigger("create");
        }
    },
    componentDidMount: function componentDidMount() {
        var component = this;
        EventEmitter.subscribe(this.props.id, function () {
            component.setState({ isDelete: true });
        });
    },
    render: function render() {
        var content = React.createElement(BlankContent, null);
        if (!this.state.isDelete) {
            if (this.state.selected == "button1") {
                if (this.props.id == "pageone") {
                    content = React.createElement(Content1, null);
                } else if (this.props.id == "pagetwo") {
                    content = React.createElement(Content8, null);
                } else if (this.props.id == "pagethree") {
                    content = React.createElement(Content7, null);
                }
            } else if (this.state.selected == "button2") {
                if (this.props.id == "pageone") {
                    content = React.createElement(Content2, null);
                } else if (this.props.id == "pagethree") {
                    content = React.createElement(Content3, null);
                } else if (this.props.id == "pagetwo") {
                    content = React.createElement(Content4, null);
                }
            } else if (this.state.selected == "button3") {
                content = React.createElement(Content5, null);
            }
        } else {
            if (this.state.selected == "button2" && this.props.id == "pagethree") {
                content = React.createElement(Content3, null);
            }
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

    componentDidMount: function componentDidMount() {
        // $.mobile.initializePage();
    },
    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(Page, { id: "pageone", titles: ["报警通知", "处理完成"] }),
            React.createElement(Page, { id: "pagethree", titles: ["处理完成", "GPS地图"] })
        );
    }
});
ReactDOM.render(React.createElement(App, null), document.getElementById("content"));
/*<li onClick={this.handleClick}><a id="pagetwo" href="#pagetwo" data-icon="custom"*/ /*data-transition="none"*/ /*className={this.props.id == "pagetwo" ? "ui-btn-active ui-state-persist" : ""}>实时监控</a>*/ /*</li>*/ /*<Page id="pagetwo" titles={["各站总览", "各站详情", "视频监控"]}/>*/
