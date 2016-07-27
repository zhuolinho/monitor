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
        $.getJSON("/plc/alerts/unprocessed.json", function (result) {
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
                    <td>A</td>
                    <td>{alert.am||""}</td>
                    <td>{alert.rt||""}</td>
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
var Content2 = React.createClass({
    render: function () {
        var {id, ...other} = this.props;
        return (
            <div data-role="main" className="ui-content">
                <a href="#pagetwo">外部页面</a>
                <br/>
                <a href="externalnotexist.html">外部页面不存在。</a>
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