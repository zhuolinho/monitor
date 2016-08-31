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
            React.createElement("img", { src: "/dist/images/logo1.jpg",
                style: { height: "39px", float: "left", marginTop: "7px" } }),
            React.createElement("img", { src: "/dist/images/logo2.jpg",
                style: { height: "39px", float: "right", marginTop: "7px", width: "81.578px" } }),
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
        $.get("/plc/alerts/unprocessed.json", function (result) {
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
                bodyNodes.length ? bodyNodes : "无报警"
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
        $.get("/gps/cars/all.json", function (result) {
            var convertor = new BMap.Convertor();
            result.pl.cars.forEach(function (ele) {
                var ggPoint = new BMap.Point(ele.lng, ele.lat);
                convertor.translate([ggPoint], 1, 5, function (data) {
                    if (data.status === 0) {
                        var marker = new BMap.Marker(data.points[0]);
                        marker.addEventListener("click", function () {
                            alert("车辆:" + ele.lp + "\n速度:" + ele.speed + "km/h");
                        });
                        map.addOverlay(marker);
                    }
                });
            });
        });
    },
    render: function render() {
        var mapHeight = $.mobile.getScreenHeight() - 111;
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
        $.get("/plc/shipments.json", function (result) {
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
        $.get("/plc/alerts/processed.json", function (result) {
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

    render: function render() {
        return React.createElement(
            "div",
            { "data-role": "main", className: "ui-content", style: { padding: 0 } },
            React.createElement(GpsMap, null)
        );
    }
});
var Content4 = React.createClass({
    displayName: "Content4",

    getInitialState: function getInitialState() {
        return { tableByday: [] };
    },
    update: function update() {
        var component = this;
        $.get("/plc/latest.json", function (result) {
            var tmp = [];
            if (result.pl.plc.length) {
                tmp.push(result.pl.plc[0]);
            }
            component.setState({ tableByday: tmp });
        });
    },
    componentDidMount: function componentDidMount() {
        this.update();
    },
    componentDidUpdate: function componentDidUpdate() {
        $("table").table("refresh");
        var component = this;
        setTimeout(function () {
            component.update();
        }, 3000);
    },
    render: function render() {
        var _props3 = this.props;
        var id = _props3.id;

        var other = _objectWithoutProperties(_props3, ["id"]);

        var months = ["2016年8月", "2016年7月", "2016年6月", "2016年5月", "2016年4月", "2016年3月", "2016年2月", "2016年1月"];
        var i = 0;
        var j = 0;
        return React.createElement(
            "div",
            { "data-role": "main", className: "ui-content ui-grid-a" },
            React.createElement(
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
                            "使用情况"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "表1地址"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "表1瞬时工况"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "表1瞬时标况"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "表1压力"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "表1温度"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "表1正工况累计"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "表1正标况累计"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "表1逆标况累计"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "表1通讯故障"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "表1错误情报"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "表2地址"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "表2瞬时工况"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "表2瞬时标况"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "表2压力"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "表2温度"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "表2正工况累计"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "表2正标况累计"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "表2逆标况累计"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "表2通讯故障"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "表2错误情报"
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    this.state.tableByday.map(function (alert) {
                        j++;
                        return React.createElement(
                            "tr",
                            { key: j },
                            React.createElement(
                                "th",
                                null,
                                "L001-金山区枫湾路777号"
                            ),
                            React.createElement(
                                "td",
                                null,
                                "正在使用"
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.addr1
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.iwc1
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.isc1
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.p1
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.temp1
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.pwc1
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.psc1
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.rsc1
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.cf1
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.er1
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.addr2
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.iwc2
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.isc2
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.p2
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.temp2
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.pwc2
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.psc2
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.rsc2
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.cf2
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.er2
                            )
                        );
                    })
                )
            ),
            React.createElement(
                "div",
                { className: "ui-block-a" },
                React.createElement(
                    "select",
                    null,
                    React.createElement(
                        "option",
                        { value: "0" },
                        " 母站"
                    ),
                    React.createElement(
                        "option",
                        { value: "中转站1号" },
                        "中转站1号"
                    ),
                    React.createElement(
                        "option",
                        { value: "中转站2号" },
                        "中转站2号"
                    ),
                    React.createElement(
                        "option",
                        { value: "中转站3号" },
                        "中转站3号"
                    ),
                    React.createElement(
                        "option",
                        { value: "" },
                        "C001-闸北区天目中路111号XXX站"
                    ),
                    React.createElement(
                        "option",
                        { value: "" },
                        "C002-闸北区大宁路355号XXXXX站"
                    ),
                    React.createElement(
                        "option",
                        { value: "" },
                        " C003-闸北区万荣路23号XXX站"
                    ),
                    React.createElement(
                        "option",
                        { value: "" },
                        " L001-闸北区沪太路1500号XX基地"
                    ),
                    React.createElement(
                        "option",
                        { value: "" },
                        " L002-闸北区共和新路555号XXX基地"
                    ),
                    React.createElement(
                        "option",
                        { value: "" },
                        " L003-闸北区红星公路220号XXX基地"
                    ),
                    React.createElement(
                        "option",
                        { value: "" },
                        "X001-黄浦区新闸路333号XXXXXX站"
                    ),
                    React.createElement(
                        "option",
                        { value: "" },
                        "X002-静安区海防路111号XX站"
                    ),
                    React.createElement(
                        "option",
                        { value: "" },
                        "X003-虹口区四川北路222号XX站"
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "ui-block-b" },
                React.createElement(
                    "select",
                    null,
                    months.map(function (ele) {
                        i++;
                        return React.createElement(
                            "option",
                            { key: i },
                            ele
                        );
                    })
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
                            "CNG罐号"
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
                            "平均流量"
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    this.state.tableByday.map(function (alert) {
                        return React.createElement(
                            "tr",
                            { key: j },
                            React.createElement(
                                "td",
                                null,
                                "L001"
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.dct
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.iwc2
                            ),
                            React.createElement(
                                "td",
                                null,
                                alert.pwc2
                            )
                        );
                    })
                )
            )
        );
    }
});
var Content5 = React.createClass({
    displayName: "Content5",

    render: function render() {
        return React.createElement(
            "div",
            { "data-role": "main", className: "ui-content ui-grid-a" },
            React.createElement(
                "div",
                { className: "ui-block-a" },
                React.createElement(
                    "select",
                    null,
                    React.createElement(
                        "option",
                        null,
                        "L001-金山区枫湾路777号"
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "ui-block-b" },
                React.createElement(
                    "select",
                    null,
                    React.createElement(
                        "option",
                        { value: "0", disabled: true },
                        "后门2号摄像头"
                    ),
                    React.createElement(
                        "option",
                        { value: "1" },
                        "后门3号摄像头"
                    ),
                    React.createElement(
                        "option",
                        { value: "2" },
                        "后门4号摄像头"
                    )
                )
            ),
            React.createElement("video", {
                src: "http://vshare.ys7.com:80/openlive/566521595_1_2.m3u8?ticket=OE9JNzRyMUptaDJCRmdmcWRmdDI2ODgzaGVaS3hPM2FLOGp5QUhMV3NVaz0kMSQyMDE3MDMyNTE2MjUzNCQxNDU4ODk0MTQ5MDAwJDE0OTA0MzAxNDkwMDAkMCQxNDU4ODk0MTQ5MDAwJDE0OTA0MzAxNDkwMDAkMg==", /*此处填写购买获取到的m3u8地址 必填*/
                poster: "", /*此处填写封面图片地址 可选*/
                controls: "controls", width: "100%", height: "100%" })
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
        $.get("/gps/shipments/done.json", function (result) {
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
                { "data-role": "navbar" },
                React.createElement(
                    "ul",
                    null,
                    React.createElement(
                        "li",
                        { onClick: this.handleClick },
                        React.createElement(
                            "a",
                            { id: "pageone", href: "#pageone", "data-icon": "home",
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
                            { id: "pagetwo", href: "#pagetwo", "data-icon": "arrow-r",
                                "data-transition": "none",
                                className: this.props.id == "pagetwo" ? "ui-btn-active ui-state-persist" : "" },
                            "实时监控"
                        )
                    ),
                    React.createElement(
                        "li",
                        { onClick: this.handleClick },
                        React.createElement(
                            "a",
                            { id: "pagethree", href: "#pagethree", "data-icon": "clock",
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
                    content = React.createElement(Content4, null);
                } else if (this.props.id == "pagethree") {
                    content = React.createElement(Content7, null);
                }
            } else if (this.state.selected == "button2") {
                if (this.props.id == "pageone") {
                    content = React.createElement(Content2, null);
                } else if (this.props.id == "pagethree") {
                    content = React.createElement(Content3, null);
                } else if (this.props.id == "pagetwo") {
                    content = React.createElement(Content5, null);
                }
            } else if (this.state.selected == "button3") {
                content = React.createElement(Content7, null);
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

    // componentDidMount: function () {
    //     $.mobile.initializePage();
    // },
    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(Page, { id: "pageone", titles: ["报警通知", "处理完成"] }),
            React.createElement(Page, { id: "pagetwo", titles: ["气种设备", "视频监控"] }),
            React.createElement(Page, { id: "pagethree", titles: ["处理完成", "GPS地图"] })
        );
    }
});
ReactDOM.render(React.createElement(App, null), document.getElementById("content"));