"use strict";

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function userGet(url, callback) {
    var user = JSON.parse(localStorage.user);
    $.ajax(url, { type: "GET", headers: { user: JSON.stringify({_id:user._id,ap:user.ap,an:user.an,oID:user.oID}) }, success: callback });
}
var App = React.createClass({
    displayName: "App",

    componentDidMount: function componentDidMount() {
        // $.mobile.initializePage();
    },
    render: function render() {
        return React.createElement(
            "div",
            { "data-role": "page" },
            React.createElement(Content4, null)
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
            var obj = JSON.parse(localStorage.user).name;
            component.getMonthTable(component.state.month, obj);
            component.setState({ tank: obj });
            component.getLast(obj);
            tmp[obj] = result.pl.plc[obj];
            component.setState({ realTimeData: tmp });
            var temp = {};
            for (var i = 0; i < result.pl.address.length; i++) {
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
        var _props = this.props;
        var id = _props.id;

        var other = _objectWithoutProperties(_props, ["id"]);

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
ReactDOM.render(React.createElement(App, null), document.getElementById("content"));
