/**
 * Created by Y on 2017/9/4.
 */
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
    $.ajax(url, {type: "GET", headers: {user: localStorage.user}, success: callback});
}
var EventEmitter = {
    _events: {},
    dispatch: function (event, data) {
        if (!this._events[event]) { // 没有监听事件
            return;
        }
        for (var i = 0; i < this._events[event].length; i++) {
            this._events[event][i](data);
        }
    },
    subscribe: function (event, callback) {
        // 创建一个新事件数组
        if (!this._events[event]) {
            this._events[event] = [];
        }
        this._events[event].push(callback);
    }
};
var Header = React.createClass({
    getInitialState: function () {
        return {selected: "button1"};
    },
    handleClick: function (event) {
        this.setState({selected: event.target.id});
        this.props.callback(event.target.id);
    },
    render: function () {
        var component = this;
        var i = 0;
        var buttonNodes = this.props.titles.map(function (title) {
            i++;
            if ("button" + i == component.state.selected) {
                return (
                    <button key={i} onClick={component.handleClick} id={"button" + i} style={{
                        backgroundColor: "#3388cc",
                        color: "white",
                        textShadow: "0 1px 0 #005599"
                    }}>{title}</button>
                );
            } else {
                return (
                    <button key={i} onClick={component.handleClick} id={"button" + i}
                            style={{backgroundColor: "white"}}>{title}</button>
                );
            }
        });
        return (
            <div data-role="header" data-position="fixed" data-tap-toggle="false" style={{textAlign: "center"}}>
                <img src="/mobile/images/logo2.png"
                     style={{height: "36px", position: "absolute", left: "0px", marginTop: "8px"}}/>
                <img src="/mobile/images/logo1.png"
                     style={{height: "36px", position: "absolute", right: "0px", margin: "8px 2px"}}/>
                <div data-role="controlgroup" data-type="horizontal">
                    {buttonNodes}
                </div>
            </div>
        );
    }
});
var AllTable = React.createClass({
    handleTable: function (e) {
        this.setState({table: e.target.value});
    },
    getInitialState: function () {
        return {plc: {}, address: [], table: 0};
    },
    componentDidMount: function () {
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
            component.setState({plc: plc, address: address});
        });
    },
    render: function () {
        return (
            <div>
                <select onChange={this.handleTable}>
                    <option value="0">表1</option>
                    <option value="1">表2</option>
                </select>
                <table data-role="table" data-mode="columntoggle" className="ui-responsive">
                    <thead>
                    <tr>
                        <th data-priority="1">公司</th>
                        <th>累计流量(Nm<sup>3</sup>)</th>
                        <th>用量(Nm<sup>3</sup>)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.address.map(function (alert, i) {
                            return (
                                <tr key={i}>
                                    <td>{alert.addr}</td>
                                    <td>{this.state.table == false ? (this.state.plc[alert.tank] ? this.state.plc[alert.tank].maxVal1 : undefined) : (this.state.plc[alert.tank] ? this.state.plc[alert.tank].maxVal2 : undefined)}</td>
                                    <td>{this.state.table == false ? (this.state.plc[alert.tank] ? this.state.plc[alert.tank].usage1 : undefined) : (this.state.plc[alert.tank] ? this.state.plc[alert.tank].usage2 : undefined)}</td>
                                </tr>
                            );
                        }.bind(this)
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
});
var HomeTable = React.createClass({
    getInitialState: function () {
        return {alerts: []};
    },
    componentDidMount: function () {
        var component = this;
        userGet("/plc/alerts/unprocessed.json", function (result) {
            component.setState({alerts: result.pl.alerts});
        });
    },
    componentDidUpdate: function () {
        $("#content").trigger("create");
    },
    render: function () {
        var i = 0;
        var bodyNodes = this.state.alerts.map(function (alert) {
            i++;
            return (
                <table data-role="table" className="ui-responsive" key={i}>
                    <thead>
                    <tr>
                        <th/>
                        {alert.atype == "余量报警" ? <th>余量/压力</th> : null}
                        {alert.atype == "压力报警" ? <th>压力/异常</th> : null}
                        {alert.atype == "信号中断" ? <th>信号/异常</th> : null}
                        {alert.atype == "泄漏报警" ? <th>泄漏/异常</th> : null}
                        {alert.atype == "余量报警" ? <th>剩余时间</th> : null}
                        {alert.atype == "拉回报警" || alert.atype == "进场报警" ? <th>报警类型</th> : null}
                        {alert.atype == "拉回报警" || alert.atype == "进场报警" ? <th>已选罐号</th> : null}
                        {alert.atype == "拉回报警" || alert.atype == "进场报警" ? <th>拉回数量</th> : null}
                        <th>时间/工号</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key={i}>
                        <th>{alert.tank}</th>
                        {alert.atype == "余量报警" ? <td>{alert.am || ""}</td> : null}
                        {alert.atype == "压力报警" ? <td>{alert.am || ""}</td> : null}
                        {alert.atype == "信号中断" ? <td>{alert.am || ""}</td> : null}
                        {alert.atype == "泄漏报警" ? <td>{alert.am || ""}</td> : null}
                        {alert.atype == "余量报警" ? <td>{alert.rt || ""}</td> : null}
                        {alert.atype == "拉回报警" || alert.atype == "进场报警" ? <td>{alert.am}</td> : null}
                        {alert.atype == "拉回报警" || alert.atype == "进场报警" ? <td>{alert.st.map(function (res) {
                            return res.ti + ",";
                        })}</td> : null}
                        {alert.atype == "拉回报警" || alert.atype == "进场报警" ? <td>{alert.st.length}个</td> : null}
                        <td>{(alert.atime || "") + "/" + (alert.pa || "")}</td>
                    </tr>
                    </tbody>
                </table>
            );
        });
        return (
            <div>
                {bodyNodes.length ? bodyNodes : ""}
            </div>

        );
    }
});
var HomeCollapsible = React.createClass({
    componentDidUpdate: function () {
        $("table").table("refresh");
    },
    render: function () {
        var months = ["4月", "3月", "2月", "1月"];
        var i = 0;
        var j = 0;
        return (
            <div data-role="collapsible" data-collapsed-icon="carat-d" data-expanded-icon="carat-u">
                <h3>{this.props.aType}</h3>
                <select>
                    {months.map(function (month) {
                        i++;
                        return (
                            <option key={i}>{month}</option>
                        );
                    })}
                </select>
                <table data-role="table" data-mode="columntoggle" className="ui-responsive">
                    <thead>
                    <tr>
                        <th data-priority="2">罐号</th>
                        <th >报警时间</th>
                        <th >接报时间</th>
                        <th data-priority="3">调度员</th>
                        <th>报警类型</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.alerts.map(function (alert) {
                        j++;
                        return (
                            <tr key={j}>
                                <td>{alert.code}</td>
                                <td>{alert.atime}</td>
                                <td>{alert.pt}</td>
                                <td>{alert.pa}</td>
                                <td>{alert.atype}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
});
var GpsCollapsible = React.createClass({
    componentDidUpdate: function () {
        $("table").table("refresh");
    },
    render: function () {
        var months = ["4月", "3月", "2月", "1月"];
        var i = 0;
        var j = 0;
        return (
            <div data-role="collapsible" data-collapsed-icon="carat-d" data-expanded-icon="carat-u">
                <h3>{this.props.aType}</h3>
                <select>
                    {months.map(function (month) {
                        i++;
                        return (
                            <option key={i}>{month}</option>
                        );
                    })}
                </select>
                <table data-role="table" data-mode="columntoggle" className="ui-responsive">
                    <thead>
                    <tr>
                        <th data-priority="2">原罐号</th>
                        <th>换罐号</th>
                        <th>配送时间</th>
                        <th data-priority="1">送达时间</th>
                        <th data-priority="3">车牌/司机/押运</th>
                        <th>调度员</th>
                        <th>距离</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.alerts.map(function (alert) {
                        j++;
                        return (
                            <tr key={j}>
                                <td>{alert.oti}</td>
                                <td>{alert.nti}</td>
                                <td>{alert.dt}</td>
                                <td>{alert.at}</td>
                                <td>{(alert.lp || " ") + "/" + (alert.driver || " ") + "/" + (alert.s || " ")}</td>
                                <td>{alert.pa}</td>
                                <td>{alert.dist}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
});
var GpsMap = React.createClass({
    componentDidMount: function () {
        var map = new BMap.Map("gpsMap");          // 创建地图实例
        var point = new BMap.Point(121.454, 31.153);  // 创建点坐标
        map.centerAndZoom(point, 10);                 // 初始化地图，设置中心点坐标和地图级别
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
        })
    },
    render: function () {
        var mapHeight = $.mobile.getScreenHeight() - 205;
        return (
            <div id="gpsMap" style={{height: mapHeight}}></div>
        );
    }
});
var GpsTable = React.createClass({
    getInitialState: function () {
        return {shipmentList: []};
    },
    componentDidMount: function () {
        var component = this;
        userGet("/plc/shipments.json", function (result) {
            component.setState({shipmentList: result.pl.shipmentList});
        });
    },
    componentDidUpdate: function () {
        $("table").table("refresh");
    },
    render: function () {
        var i = 0;
        var bodyNodes = this.state.shipmentList.map(function (alert) {
            i++;
            return (
                <tr key={i}>
                    <th>{alert.tank}</th>
                    <td>{alert.code}</td>
                    <td>{alert.am || ""}</td>
                    <td>{alert.rt || ""}</td>
                    <td>{(alert.atime || "") + "/" + (alert.pa || "")}</td>
                </tr>
            );
        });
        return (
            <table data-role="table" className="ui-responsive">
                <thead>
                <tr>
                    <th/>
                    <th>罐号</th>
                    <th>余量/压力</th>
                    <th>剩余时间</th>
                    <th>时间/工号</th>
                </tr>
                </thead>
                <tbody>
                {bodyNodes.length ? bodyNodes : "加载中..."}
                </tbody>
            </table>
        );
    }
});
var Content1 = React.createClass({
    render: function () {
        var {id, ...other} = this.props;
        return (
            <div data-role="main" className="ui-content">
                <HomeTable/>
            </div>
        );
    }
});
var Content2 = React.createClass({
    getInitialState: function () {
        return {alerts: []};
    },
    componentDidMount: function () {
        var component = this;
        userGet("/plc/alerts/processed.json", function (result) {
            component.setState({alerts: result.pl.alerts});
        });
    },
    render: function () {
        var {id, ...other} = this.props;
        var alertTypes = ["余量报警", "压力报警", "信号中断", "泄漏报警", "拉回报警", "进场报警"];
        var i = 0;
        var groupObj = groupBy(this.state.alerts, "atype");
        return (
            <div data-role="main" className="ui-content">
                <div data-role="collapsible-set">
                    {alertTypes.map(function (alertType) {
                        i++;
                        return (
                            <HomeCollapsible key={i} aType={alertType} alerts={groupObj[alertType] || []}/>
                        );
                    })}
                </div>
            </div>
        );
    }
});
var Content3 = React.createClass({
    getInitialState: function () {
        return {cars: []};
    },
    componentDidMount: function () {
        var component = this;
        EventEmitter.subscribe("GPS", function (data) {
            component.setState(data);
        });
    },
    handleSelect: function (e) {
        if (e.target.value < 0) {
            this.state.cars.forEach(function (obj) {
                obj.marker.show();
            });
        } else {
            this.state.cars.forEach(function (obj, index) {
                if (e.target.value == index) obj.marker.show();
                else obj.marker.hide();
            });
        }
    },
    render: function () {
        var i = 0;
        return (
            <div data-role="main" className="ui-content" style={{}}>
                <select onChange={this.handleSelect}>
                    <option value={-1}>全部车辆</option>
                    {this.state.cars.map(function (car) {
                        i++;
                        return <option key={i} value={i - 1}>{car.lp}</option>
                    })}
                </select>
                <GpsMap/>
                <a href="#positionWindow" className="ui-btn ui-corner-all ui-shadow ui-btn-inline" data-rel="popup"
                   data-position-to="window" style={{display: "none"}} id="modal">Position to window</a>
                <div data-role="popup" id="positionWindow" className="ui-content" data-theme="a">
                </div>
            </div>
        );
    }
});
var Content4 = React.createClass({
    plc: {dates: [], values: [], values2: []},
    generateC3: function () {
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
    getInitialState: function () {
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
    getMonthTable: function (mon, tank) {
        var component = this;
        this.setState({tableByMonth: []});
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
            component.setState({tableByMonth: result.pl.plc});
        });
    },
    getLast: function (tank) {
        userGet("/plc/forlasthours/" + tank + ".json", function (result) {
            this.plc = result.pl.plc;
            this.plc.dates.unshift("x");
            this.plc.values.unshift("瞬时流量");
            this.plc.values2.unshift("瞬时流量");
            this.generateC3();
        }.bind(this));
    },
    handleMonth: function (e) {
        this.setState({month: e.target.value});
        this.getMonthTable(e.target.value, this.state.tank);
    },
    handleTable: function (e) {
        this.setState({table: e.target.value});
    },
    handleTank: function (e) {
        this.setState({tank: e.target.value});
        this.getMonthTable(this.state.month, e.target.value);
        this.getLast(e.target.value);
        this.plc = {dates: [], values: [], values2: []};
    },
    componentDidMount: function () {
        var component = this;
        userGet("/plc/latest/withaddress.json", function (result) {
            var tmp = {};
            var i = 0;
            for (var obj in result.pl.plc) {
                if (i == 0) {
                    component.getMonthTable(component.state.month, obj);
                    component.setState({tank: obj});
                    component.getLast(obj);
                }
                tmp[obj] = result.pl.plc[obj];
                i++;
            }
            component.setState({realTimeData: tmp});
            var temp = {};
            for (i = 0; i < result.pl.address.length; i++) {
                temp[result.pl.address[i].tank] = result.pl.address[i];
            }
            component.setState({plcAddresses: temp});
        });
    },
    componentDidUpdate: function () {
        $("table").table("refresh");
        $("select").selectmenu("refresh");
        this.generateC3();
    },
    render: function () {
        var {id, ...other} = this.props;
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
                realHead = (
                    <tr>
                        <th/>
                        <th>流量表名称</th>
                        <th>分配地址</th>
                        <th>累计流量(Nm<sup>3</sup>)</th>
                        <th>瞬时流量(Nm<sup>3</sup>/h)</th>
                        <th>温度(<sup>o</sup>C)</th>
                        <th>压力(Kpa)</th>
                        <th></th>
                        <th>流量表名称</th>
                        <th>分配地址</th>
                        <th>累计流量(Nm<sup>3</sup>)</th>
                        <th>瞬时流量(Nm<sup>3</sup>/h)</th>
                        <th>温度(<sup>o</sup>C)</th>
                        <th>压力(Kpa)</th>
                    </tr>
                );
                realBody = (
                    <tr>
                        <th>{component.state.plcAddresses[component.state.tank] ? component.state.plcAddresses[component.state.tank].addr : component.state.tank}</th>
                        <td>{"流量计 " + temp.addr1}</td>
                        <td>{temp.addr1}</td>
                        <td>{temp.psc1}</td>
                        <td>{temp.isc1}</td>
                        <td>{temp.temp1}</td>
                        <td>{temp.p1}</td>
                        <td></td>
                        <td>{"流量计 " + temp.addr2}</td>
                        <td>{temp.addr2}</td>
                        <td>{temp.psc2}</td>
                        <td>{temp.isc2}</td>
                        <td>{temp.temp2}</td>
                        <td>{temp.p2}</td>
                    </tr>
                );
            } else if (temp.plcType == "CNG" && temp.cngType == 3) {
                realHead = (
                    <tr>
                        <th/>
                        <th>剩余时间(H)</th>
                        <th>剩余量(Nm<sup>3</sup>)</th>
                        <th>累计流量1(Nm<sup>3</sup>)</th>
                        <th>瞬时流量1(Nm<sup>3</sup>/h)</th>
                        <th>累计流量2(Nm<sup>3</sup>)</th>
                        <th>瞬时流量2(Nm<sup>3</sup>/h)</th>
                        <th>流量计出口温度(<sup>o</sup>C)</th>
                        <th>出口压力(Kpa)</th>
                        <th>入口压力1(MPa)</th>
                        <th>入口压力2(MPa)</th>
                        <th>一级调压后压力1(Bar)</th>
                        <th>一级调压后压力2(Bar)</th>
                        <th>一级调压后温度1(<sup>o</sup>C)</th>
                        <th>一级调压后温度2(<sup>o</sup>C)</th>
                    </tr>
                );
                realBody = (
                    <tr>
                        <th>{component.state.plcAddresses[component.state.tank] ? component.state.plcAddresses[component.state.tank].addr : component.state.tank}</th>
                        <td>{temp.rft}</td>
                        <td>{temp.rfq}</td>
                        <td>{temp.cumfow0}</td>
                        <td>{temp.instfow0}</td>
                        <td>{temp.cumfow}</td>
                        <td>{temp.instfow}</td>
                        <td>{temp.fmot}</td>
                        <td>{temp.outputP}</td>
                        <td>{temp.inputP1}</td>
                        <td>{temp.inputP2}</td>
                        <td>{temp.paflpa1}</td>
                        <td>{temp.paflpa2}</td>
                        <td>{temp.taflpa1}</td>
                        <td>{temp.taflpa2}</td>
                    </tr>
                );
            } else if (temp.plcType == "CNG" && temp.cngType == 2) {
                realHead = (
                    <tr>
                        <th/>
                        <th>累计流量(Nm<sup>3</sup>)</th>
                        <th>瞬时流量(Nm<sup>3</sup>/h)</th>
                        <th>流量计出口温度(<sup>o</sup>C)</th>
                        <th>出口压力(Kpa)</th>
                        <th>入口压力1(MPa)</th>
                        <th>入口压力2(MPa)</th>
                        <th>一级调压后压力1(Bar)</th>
                        <th>一级调压后压力2(Bar)</th>
                        <th>一级调压后温度1(<sup>o</sup>C)</th>
                        <th>一级调压后温度2(<sup>o</sup>C)</th>
                        <th>一号换热器温度 (℃)</th>
                        <th>二号换热器温度 (℃)</th>
                    </tr>
                );
                realBody = (
                    <tr>
                        <th>{component.state.plcAddresses[component.state.tank] ? component.state.plcAddresses[component.state.tank].addr : component.state.tank}</th>
                        <td>{temp.cumfow}</td>
                        <td>{temp.instfow}</td>
                        <td>{temp.fmot}</td>
                        <td>{temp.outputP}</td>
                        <td>{temp.inputP1}</td>
                        <td>{temp.inputP2}</td>
                        <td>{temp.paflpa1}</td>
                        <td>{temp.paflpa2}</td>
                        <td>{temp.taflpa1}</td>
                        <td>{temp.taflpa2}</td>
                        <td>{temp.hxt1}</td>
                        <td>{temp.hxt2}</td>
                    </tr>
                );
            } else if (temp.plcType == "CNG" && temp.cngType == 0) {
                realHead = (
                    <tr>
                        <th/>
                        <th>累计流量(Nm<sup>3</sup>)</th>
                        <th>瞬时流量(Nm<sup>3</sup>/h)</th>
                        <th>流量计出口温度(<sup>o</sup>C)</th>
                        <th>出口压力(Kpa)</th>
                        <th>入口压力1(MPa)</th>
                        <th>入口压力2(MPa)</th>
                        <th>一级调压后压力1(Bar)</th>
                        <th>一级调压后压力2(Bar)</th>
                        <th>一级调压后温度1(<sup>o</sup>C)</th>
                        <th>一级调压后温度2(<sup>o</sup>C)</th>
                        <th>一号出口压力(Bar)</th>
                        <th>二号出口压力(Bar)</th>
                    </tr>
                );
                realBody = (
                    <tr>
                        <th>{component.state.plcAddresses[component.state.tank] ? component.state.plcAddresses[component.state.tank].addr : component.state.tank}</th>
                        <td>{temp.cumfow}</td>
                        <td>{temp.instfow}</td>
                        <td>{temp.fmot}</td>
                        <td>{temp.outputP}</td>
                        <td>{temp.inputP1}</td>
                        <td>{temp.inputP2}</td>
                        <td>{temp.paflpa1}</td>
                        <td>{temp.paflpa2}</td>
                        <td>{temp.taflpa1}</td>
                        <td>{temp.taflpa2}</td>
                        <td>{temp.outputP1}</td>
                        <td>{temp.outputP2}</td>
                    </tr>
                );
            } else if (temp.plcType == "CNG") {
                realHead = (
                    <tr>
                        <th/>
                        <th>累计流量(Nm<sup>3</sup>)</th>
                        <th>瞬时流量(Nm<sup>3</sup>/h)</th>
                        <th>流量计出口温度(<sup>o</sup>C)</th>
                        <th>出口压力(Kpa)</th>
                        <th>入口压力1(MPa)</th>
                        <th>入口压力2(MPa)</th>
                        <th>一级调压后压力1(Bar)</th>
                        <th>一级调压后压力2(Bar)</th>
                        <th>一级调压后温度1(<sup>o</sup>C)</th>
                        <th>一级调压后温度2(<sup>o</sup>C)</th>
                    </tr>
                );
                realBody = (
                    <tr>
                        <th>{component.state.plcAddresses[component.state.tank] ? component.state.plcAddresses[component.state.tank].addr : component.state.tank}</th>
                        <td>{temp.cumfow}</td>
                        <td>{temp.instfow}</td>
                        <td>{temp.fmot}</td>
                        <td>{temp.outputP}</td>
                        <td>{temp.inputP1}</td>
                        <td>{temp.inputP2}</td>
                        <td>{temp.paflpa1}</td>
                        <td>{temp.paflpa2}</td>
                        <td>{temp.taflpa1}</td>
                        <td>{temp.taflpa2}</td>
                    </tr>
                );
            } else if (temp.plcType == "LNG") {
                realHead = (
                    <tr>
                        <th/>
                        <th>累计流量(Nm<sup>3</sup>)</th>
                        <th>瞬时流量(Nm<sup>3</sup>/h)</th>
                        <th>流量计出口温度(<sup>o</sup>C)</th>
                        <th>出口压力(Kpa)</th>
                        <th>储罐压力(Bar)</th>
                        <th>调压区入口压力(Bar)</th>
                        <th>储罐液位(%)</th>
                    </tr>
                );
                realBody = (
                    <tr>
                        <th>{component.state.plcAddresses[component.state.tank] ? component.state.plcAddresses[component.state.tank].addr : component.state.tank}</th>
                        <td>{temp.cumfow}</td>
                        <td>{temp.instfow}</td>
                        <td>{temp.fmot}</td>
                        <td>{temp.outputP}</td>
                        <td>{temp.tankp}</td>
                        <td>{temp.azip}</td>
                        <td>{temp.tanklavel}</td>
                    </tr>
                );
            }
        }
        return (
            <div data-role="main" className="ui-content ui-grid-b">
                <div style={{overflowX: "auto", overflowY: "hidden"}}>
                    <div id="statsChart" style={{width: "2000px"}}></div>
                </div>
                <div className="ui-block-a">
                    <select onChange={this.handleTank}>
                        {Object.keys(this.state.realTimeData).sort(function (a, b) {
                            return b > a ? 1 : -1;
                        }).map(function (alert) {
                            ii++;
                            var str = "";
                            if (component.state.plcAddresses[alert]) {
                                str = component.state.plcAddresses[alert].addr
                            } else {
                                str = alert;
                            }
                            return (<option value={alert} key={ii}>{str}</option>);
                        })}
                    </select>
                </div>
                <div className="ui-block-b">
                    <select onChange={this.handleMonth}>
                        {months.map(function (ele) {
                            i++;
                            return (<option value={d.getMonth() + 2 - i} key={i}>{ele}</option>);
                        })}
                    </select>
                </div>
                <div className="ui-block-c">
                    <select onChange={this.handleTable}>
                        <option value="0">表1</option>
                        <option value="1">表2</option>
                    </select>
                </div>
                <table data-role="table" data-mode="columntoggle" className="ui-responsive">
                    <thead>
                    <tr>
                        <th>罐号</th>
                        <th>日期</th>
                        <th data-priority="1">累积流量</th>
                        <th>用量</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.tableByMonth.map(function (alert) {
                        k++;
                        return (
                            <tr key={k}>
                                <td>{component.state.tank}</td>
                                <td>{alert.date}</td>
                                <td>{component.state.table == false ? alert.maxVal1 : alert.maxVal2}</td>
                                <td>{component.state.table == false ? alert.usage1 : alert.usage2}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                <table data-role="table" className="ui-responsive">
                    <thead>{realHead}</thead>
                    <tbody>{realBody}</tbody>
                </table>
            </div>
        );
    }
});
var Content5 = React.createClass({
    getInitialState: function () {
        return {cam: 9, addr: 1, isFirst: false};
    },
    handleSelect: function (e) {
        this.setState({cam: e.target.value});
    },
    handleAddr: function (e) {
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
        this.setState({cam: cam, addr: addr, isFirst: true});
    },
    componentDidUpdate: function () {
        $("select").selectmenu("refresh", true);
        if (this.state.isFirst) {
            this.setState({isFirst: false});
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
    componentDidMount: function () {
        $("#fucker").html('<video id="myPlayer" poster="" controls playsInline webkit-playsinline autoplay style="width: 100%"><source src="rtmp://rtmp.open.ys7.com/openlive/b272845e5b5c434eae96bd68b85d8c39" type=""/><source src="http://hls.open.ys7.com/openlive/b272845e5b5c434eae96bd68b85d8c39.m3u8" type="application/x-mpegURL"/> </video>');
        new EZUIPlayer('myPlayer');
    },
    render: function () {
        var options;
        if (this.state.isFirst) {
            options = (
                <select onChange={this.handleSelect}>
                </select>
            );
        } else {
            if (this.state.addr == 1) {
                options = (
                    <select onChange={this.handleSelect}>
                        <option value="9">宝山万事红调度室</option>
                        <option value="10">宝山万事红停车场</option>
                    </select>
                );
            } else if (this.state.addr == 2) {
                options = (
                    <select onChange={this.handleSelect}>
                        <option value="1">日建站1号</option>
                        <option value="3">日建站2号</option>
                        <option value="4">日建控制室</option>
                        <option value="2">日建大门</option>
                    </select>
                );
            } else if (this.state.addr == 3) {
                options = (
                    <select onChange={this.handleSelect}>
                        <option value="6">上食站1号</option>
                        <option value="8">上食站2号</option>
                        <option value="5">上食站控制室</option>
                        <option value="7">上食大门</option>
                    </select>
                );
            } else if (this.state.addr == 4) {
                options = (
                    <select onChange={this.handleSelect}>
                        <option value="11">天源1号</option>
                        <option value="14">天源2号</option>
                        <option value="13">天源站控制室</option>
                        <option value="12">天源站大门</option>
                    </select>
                );
            }
        }
        return (
            <div data-role="main" className="ui-content ui-grid-a">
                <div className="ui-block-a">
                    <select onChange={this.handleAddr}>
                        <option value="1">上海万事红危险货物物流有限公司 春和路588号</option>
                        <option value="2">CNG-日建供气站（万事红)</option>
                        <option value="3">CNG-上食供气站（顺天)</option>
                        <option value="4">CNG-天源供气站（顺天)</option>
                    </select>
                </div>
                <div className="ui-block-b">{options}</div>
                <div id="fucker"></div>
            </div>
        );
    }
});
var Content6 = React.createClass({
    render: function () {
        var {id, ...other} = this.props;
        return (
            <div data-role="main" className="ui-content">
                <GpsTable/>
            </div>
        );
    }
});
var Content7 = React.createClass({
    getInitialState: function () {
        return {done: []};
    },
    componentDidMount: function () {
        var component = this;
        userGet("/gps/shipments/done.json", function (result) {
            component.setState({done: result.pl.shipments});
        });
    },
    render: function () {
        var {id, ...other} = this.props;
        var alertTypes = ["CNG", "LNG", "集格", "杜瓦瓶", "进场", "拉回"];
        var i = 0;
        var groupObj = groupBy(this.state.done, "ntt");
        return (
            <div data-role="main" className="ui-content">
                <div data-role="collapsible-set">
                    {alertTypes.map(function (alertType) {
                        i++;
                        return (
                            <GpsCollapsible key={i} aType={alertType} alerts={groupObj[alertType] || []}/>
                        );
                    })}
                </div>
            </div>
        );
    }
});
var Content8 = React.createClass({
    render: function () {
        return (
            <div data-role="main" className="ui-content">
                <AllTable/>
            </div>
        );
    }
});
var BlankContent = React.createClass({
    render: function () {
        return (
            <div data-role="main" className="ui-content">
            </div>
        );
    }
});
var Footer = React.createClass({
    handleClick: function (event) {
        EventEmitter.dispatch(event.target.id);
    },
    render: function () {
        return (
            <div data-role="footer" data-position="fixed" data-tap-toggle="false">
                <div data-role="navbar" className="nav-glyphish-example">
                    <ul>
                        <li onClick={this.handleClick}><a id="pageone" href="#pageone" data-icon="custom"
                                                          data-transition="none"
                                                          className={this.props.id == "pageone" ? "ui-btn-active ui-state-persist" : ""}>首页</a>
                        </li>
                        {/*<li onClick={this.handleClick}><a id="pagetwo" href="#pagetwo" data-icon="custom"*/}
                                                          {/*data-transition="none"*/}
                                                          {/*className={this.props.id == "pagetwo" ? "ui-btn-active ui-state-persist" : ""}>实时监控</a>*/}
                        {/*</li>*/}
                        <li onClick={this.handleClick}><a id="pagethree" href="#pagethree" data-icon="custom"
                                                          data-transition="none"
                                                          className={this.props.id == "pagethree" ? "ui-btn-active ui-state-persist" : ""}>GPS</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
});
var Page = React.createClass({
    getInitialState: function () {
        return {selected: "button1", isDelete: false};
    },
    handleHeader: function (buttonId) {
        this.setState({selected: buttonId});
    },
    componentDidUpdate: function () {
        if (this.state.isDelete) {
            this.setState({isDelete: false});
        } else {
            $("#content").trigger("create");
        }
    },
    componentDidMount: function () {
        var component = this;
        EventEmitter.subscribe(this.props.id, function () {
            component.setState({isDelete: true});
        });
    },
    render: function () {
        var content = <BlankContent/>;
        if (!this.state.isDelete) {
            if (this.state.selected == "button1") {
                if (this.props.id == "pageone") {
                    content = <Content1/>;
                } else if (this.props.id == "pagetwo") {
                    content = <Content8/>;
                } else if (this.props.id == "pagethree") {
                    content = <Content7/>;
                }
            } else if (this.state.selected == "button2") {
                if (this.props.id == "pageone") {
                    content = <Content2/>;
                } else if (this.props.id == "pagethree") {
                    content = <Content3/>;
                } else if (this.props.id == "pagetwo") {
                    content = <Content4/>;
                }
            } else if (this.state.selected == "button3") {
                content = <Content5/>;
            }
        } else {
            if (this.state.selected == "button2" && this.props.id == "pagethree") {
                content = <Content3/>;
            }
        }
        return (
            <div data-role="page" id={this.props.id}>
                <Header titles={this.props.titles} callback={this.handleHeader}/>
                {content}
                <Footer id={this.props.id}/>
            </div>
        );
    }
});
var App = React.createClass({
    componentDidMount: function () {
        $.mobile.initializePage();
    },
    render: function () {
        return (
            <div>
                <Page id="pageone" titles={["报警通知", "处理完成"]}/>
                {/*<Page id="pagetwo" titles={["各站总览", "各站详情", "视频监控"]}/>*/}
                <Page id="pagethree" titles={["处理完成", "GPS地图"]}/>
            </div>
        );
    }
});
ReactDOM.render(
    <App/>,
    document.getElementById("content")
);