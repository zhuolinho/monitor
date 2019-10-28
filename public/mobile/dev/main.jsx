function userGet(url, callback) {
    $.ajax(url, {type: "GET", headers: {user: localStorage.user}, success: callback});
}
var App = React.createClass({
    componentDidMount: function () {
        $.mobile.initializePage();
    },
    render: function () {
        return (
            <div data-role="page">
                <Content4/>
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
            var obj = JSON.parse(localStorage.user).name;
            component.getMonthTable(component.state.month, obj);
            component.setState({tank: obj});
            component.getLast(obj);
            tmp[obj] = result.pl.plc[obj];
            component.setState({realTimeData: tmp});
            var temp = {};
            for (var i = 0; i < result.pl.address.length; i++) {
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
ReactDOM.render(
    <App/>,
    document.getElementById("content")
);