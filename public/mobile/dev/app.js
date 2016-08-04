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
                var pointArr = [];
                pointArr.push(ggPoint);
                convertor.translate(pointArr, 1, 5, function (data) {
                    if(data.status === 0) {
                        var marker = new BMap.Marker(data.points[0]);
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
        return (
            <div data-role="main" className="ui-content">
                Content4
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
            content = <Content4/>;
            if (this.state.selected == "button1") {
                if (this.props.id == "pageone") {
                    content = <Content1/>;
                }
            } else if (this.state.selected == "button2") {
                if (this.props.id == "pageone") {
                    content = <Content2/>;
                } else if (this.props.id == "pagethree") {
                    content = <Content3/>;
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