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
                    <td><select>
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
                {bodyNodes}
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
var Content2 = React.createClass({
    getInitialState: function () {
        return {alerts: []};
    },
    componentDidMount: function () {
        var component = this;
        $.get("/plc/alertsg/processed.json", function (result) {
            component.setState({alerts: result.pl.alerts});
        });
    },
    render: function () {
        var {id, ...other} = this.props;
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
        var {id, ...other} = this.props;
        return (
            <div data-role="main" className="ui-content">
                Page3
            </div>
        );
    }
});
var Footer = React.createClass({
    render: function () {
        return (
            <div data-role="footer" data-position="fixed" data-tap-toggle="false">
                <div data-role="navbar">
                    <ul>
                        <li><a href="#pageone" data-icon="home" data-transition="none"
                               className={this.props.id == "pageone" ? "ui-btn-active ui-state-persist" : ""}>首页</a>
                        </li>
                        <li><a href="#pagetwo" data-icon="arrow-r" data-transition="none"
                               className={this.props.id == "pagetwo" ? "ui-btn-active ui-state-persist" : ""}>实时监控</a>
                        </li>
                        <li><a href="#pagethree" data-icon="clock" data-transition="none"
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
        return {selected: "button1"};
    },
    handleHeader: function (buttonId) {
        this.setState({selected: buttonId});
    },
    componentDidUpdate: function () {
        $("#content").trigger("create");
    },
    render: function () {
        var content = <Content3/>;
        if (this.state.selected == "button1") {
            if (this.props.id == "pageone") {
                content = <Content1/>;
            }
        } else if (this.state.selected == "button2") {
            content = <Content2/>;
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