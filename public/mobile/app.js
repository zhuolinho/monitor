var Header = React.createClass({
    render: function () {
        return (
            <div data-role="header" data-theme="f">
                <h1>{this.props.id}</h1>
            </div>
        );
    }
});
var ControlGroup = React.createClass({
    render: function () {
        return (
            <div data-role="controlgroup" data-type={this.props.dataType}>
                <a href="#" data-role="button">按钮 1</a>
                <a href="#" data-role="button">按钮 2</a>
                <a href="#" data-role="button">按钮 3</a>
            </div>
        );
    }
});
var Collapsible = React.createClass({
    render: function () {
        return (
            <div data-role="collapsible" data-collapsed="false">
                <h3>点击我 - 我可以折叠！</h3>
                <p>{this.props.count}</p>
                 {this.props.count > 1 ? <Collapsible count={this.props.count - 1}/> : ""}
            </div>
        );
    }
});
var Content = React.createClass({
    render: function () {
        var {id, ...other} = this.props;
        return (
            <div data-role="content" data-theme="f">
                <a href="#pagetwo">外部页面</a>
                <br/>
                <a href="externalnotexist.html">外部页面不存在。</a>
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
                        <li><a href="#pageone" data-icon="home" data-transition="none" data-theme="f"
                               className={this.props.isFirst ? "ui-btn-active ui-state-persist" : ""}>首页</a></li>
                        <li><a href="#pagetwo" data-icon="arrow-r" data-transition="none" data-theme="e"
                               className={this.props.isFirst ? "" : "ui-btn-active ui-state-persist"}>页面二</a></li>
                    </ul>
                </div>
            </div>
        );
    }
});
var Page = React.createClass({
    render: function () {
        return (
            <div data-role="page" id={this.props.id} data-overlay-theme="b">
                <Header {...this.props}/>
                <Content/>
                <Footer {...this.props}/>
            </div>
        );
    }
});
var App = React.createClass({
    componentDidMount: function () {
        $.mobile.initializePage();
        // debugger;
    },
    render: function () {
        return (
            <div>
                <Page id="pageone" isFirst={true}/>
                <Page id="pagetwo" isFirst={false}/>
            </div>
        );
    }
});
ReactDOM.render(
    <App/>,
    $("#content")[0]
);