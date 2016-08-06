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
                <div data-role="controlgroup" data-type="horizontal">
                    {buttonNodes}
                </div>
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
        $.get("/plc/alerts/unprocessed.json", function (result) {
            component.setState({alerts: result.pl.alerts});
        });
    },
    componentDidUpdate: function () {
        $("table").table("refresh");
    },
    render: function () {
        var i = 0;
        var bodyNodes = this.state.alerts.map(function (alert) {
            i++;
            return (
                <tr key={i}>
                    <th>{alert.tank}</th>
                    <td><select data-role="none">
                        <option value="6348">J6348</option>
                        <option value="6548">C6548</option>
                        <option value="6898">D6898</option>
                    </select></td>
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
                        return <tr key={j}>
                            <td>{alert.code}</td>
                            <td>{alert.atime}</td>
                            <td>{alert.pt}</td>
                            <td>{alert.pa}</td>
                            <td>{alert.atype}</td>
                        </tr>;
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
        })
    },
    render: function () {
        var mapHeight = $.mobile.getScreenHeight() - 111;
        return (
            <div id="gpsMap" style={{height: mapHeight}}></div>
        );
    }
});
var Content2 = React.createClass({
    getInitialState: function () {
        return {alerts: []};
    },
    componentDidMount: function () {
        var component = this;
        $.get("/plc/alerts/processed.json", function (result) {
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
var Content3 = React.createClass({
    render: function () {
        return (
            <div data-role="main" className="ui-content" style={{padding: 0}}>
                <GpsMap/>
            </div>
        );
    }
});
var Content4 = React.createClass({
    render: function () {
        var {id, ...other} = this.props;
        var months = ["2016年8月", "2016年7月", "2016年6月", "2016年5月", "2016年4月", "2016年3月", "2016年2月", "2016年1月"];
        var i = 0;
        var j = 0;
        var tableByday = [{code: "C002", date: "1月1号", if: 0.0000, af: 0.0000, mf: 0.0000},
            {code: "C002", date: "1月2号", if: 0.0000, af: 0.0000, mf: 0.0000},
            {code: "C002", date: "1月3号", if: 0.0000, af: 0.0000, mf: 0.0000},
            {code: "C002", date: "1月4号", if: 0.0000, af: 0.0000, mf: 0.0000},
            {code: "C002", date: "1月5号", if: 0.0000, af: 0.0000, mf: 0.0000},
            {code: "C002", date: "1月6号", if: 0.0000, af: 0.0000, mf: 0.0000},
            {code: "C002", date: "1月7号", if: 0.0000, af: 0.0000, mf: 0.0000},
            {code: "C002", date: "1月8号", if: 0.0000, af: 0.0000, mf: 0.0000},
            {code: "C002", date: "1月9号", if: 0.0000, af: 0.0000, mf: 0.0000},
            {code: "C002", date: "1月10号", if: 0.0000, af: 0.0000, mf: 0.0000},
            {code: "C002", date: "1月11号", if: 0.0000, af: 0.0000, mf: 0.0000},
            {code: "C002", date: "1月12号", if: 0.0000, af: 0.0000, mf: 0.0000},
            {code: "C002", date: "1月13号", if: 0.0000, af: 0.0000, mf: 0.0000},
            {code: "C002", date: "1月14号", if: 0.0000, af: 0.0000, mf: 0.0000},
            {code: "C002", date: "1月15号", if: 0.0000, af: 0.0000, mf: 0.0000},
            {code: "C002", date: "1月16号", if: 0.0000, af: 0.0000, mf: 0.0000},
            {code: "C002", date: "1月17号", if: 0.0000, af: 0.0000, mf: 0.0000},
            {code: "C002", date: "1月18号", if: 0.0000, af: 0.0000, mf: 0.0000},
            {code: "C002", date: "1月19号", if: 0.0000, af: 0.0000, mf: 0.0000},
            {code: "C002", date: "1月20号", if: 0.0000, af: 0.0000, mf: 0.0000}
        ];
        return (
            <div data-role="main" className="ui-content ui-grid-a">
                <div className="ui-block-a">
                    <select>
                        <option value="0"> 母站</option>
                        <option value="中转站1号">中转站1号</option>
                        <option value="中转站2号">中转站2号</option>
                        <option value="中转站3号">中转站3号</option>
                        <option value="">C001-闸北区天目中路111号XXX站</option>
                        <option value="">C002-闸北区大宁路355号XXXXX站</option>
                        <option value=""> C003-闸北区万荣路23号XXX站</option>
                        <option value=""> L001-闸北区沪太路1500号XX基地</option>
                        <option value=""> L002-闸北区共和新路555号XXX基地</option>
                        <option value=""> L003-闸北区红星公路220号XXX基地</option>
                        <option value="">X001-黄浦区新闸路333号XXXXXX站</option>
                        <option value="">X002-静安区海防路111号XX站</option>
                        <option value="">X003-虹口区四川北路222号XX站</option>
                    </select>
                </div>
                <div className="ui-block-b">
                    <select>
                        {months.map(function (ele) {
                            i++;
                            return (<option key={i}>{ele}</option>);
                        })}
                    </select>
                </div>
                <img src="/dist/images/chart.jpg" style={{width: "100%"}}/>
                <table data-role="table" data-mode="columntoggle" className="ui-responsive">
                    <thead>
                    <tr>
                        <th>CNG罐号</th>
                        <th>日期</th>
                        <th data-priority="1">累积流量</th>
                        <th>平均流量</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableByday.map(function (alert) {
                        j++;
                        return <tr key={j}>
                            <td>{alert.code}</td>
                            <td>{alert.date}</td>
                            <td>{alert.af}</td>
                            <td>{alert.mf}</td>
                        </tr>;
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
});
var Content5 = React.createClass({
    render: function () {
        return (
            <div data-role="main" className="ui-content ui-grid-a">
                <div className="ui-block-a"><select>
                    <option>C002-闸北区大宁路355号XX站</option>
                </select></div>
                <div className="ui-block-b">
                    <select>
                        <option value="0" disabled>后门2号摄像头</option>
                        <option value="1">后门3号摄像头</option>
                        <option value="2">后门4号摄像头</option>
                    </select>
                </div>
                <video
                    src="http://vshare.ys7.com:80/openlive/566521595_1_2.m3u8?ticket=OE9JNzRyMUptaDJCRmdmcWRmdDI2ODgzaGVaS3hPM2FLOGp5QUhMV3NVaz0kMSQyMDE3MDMyNTE2MjUzNCQxNDU4ODk0MTQ5MDAwJDE0OTA0MzAxNDkwMDAkMCQxNDU4ODk0MTQ5MDAwJDE0OTA0MzAxNDkwMDAkMg=="  /*此处填写购买获取到的m3u8地址 必填*/
                    poster="/dist/images/logo1.jpg"    /*此处填写封面图片地址 可选*/
                    controls="controls" width="100%" height="100%">
                </video>
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
                <div data-role="navbar">
                    <ul>
                        <li onClick={this.handleClick}><a id="pageone" href="#pageone" data-icon="home"
                                                          data-transition="none"
                                                          className={this.props.id == "pageone" ? "ui-btn-active ui-state-persist" : ""}>首页</a>
                        </li>
                        <li onClick={this.handleClick}><a id="pagetwo" href="#pagetwo" data-icon="arrow-r"
                                                          data-transition="none"
                                                          className={this.props.id == "pagetwo" ? "ui-btn-active ui-state-persist" : ""}>实时监控</a>
                        </li>
                        <li onClick={this.handleClick}><a id="pagethree" href="#pagethree" data-icon="clock"
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
                    content = <Content4/>;
                }
            } else if (this.state.selected == "button2") {
                if (this.props.id == "pageone") {
                    content = <Content2/>;
                } else if (this.props.id == "pagethree") {
                    content = <Content3/>;
                } else if (this.props.id == "pagetwo") {
                    content = <Content5/>;
                }
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
                <Page id="pageone" titles={["报警通知", "处理与完成"]}/>
                <Page id="pagetwo" titles={["气种设备", "视频监控"]}/>
                <Page id="pagethree" titles={["配送列表", "GPS地图", "处理与完成"]}/>
            </div>
        );
    }
});
ReactDOM.render(
    <App/>,
    document.getElementById("content")
);