
import {Component, provide,Input} from 'angular2/core';
import {config} from '../../../../config';
import {AlertModel} from '../../../../models/alert-model';
declare var jQuery:any;

@Component({
  selector:'home-alerts-detail',
  templateUrl:config.prefix + '/components/home/alerts/details/home.alerts.detail.component.html'
})

export class HomeAlertsDetail{
     paramTable:AlertModel;
    @Input('data')
    set table(data){
      this.paramTable = data;
    }

    get table(){return this.paramTable;}

    tableByday:any[] = [{code:'C002',date:'1月1号', if:0.0000, af:0.0000, mf:0.0000},  // Instantaneous flow,average flow,max flow
                        {code:'C002',date:'1月2号', if:0.0000, af:0.0000, mf:0.0000},
                        {code:'C002',date:'1月3号', if:0.0000, af:0.0000, mf:0.0000},
                        {code:'C002',date:'1月4号', if:0.0000, af:0.0000, mf:0.0000},
                        {code:'C002',date:'1月5号', if:0.0000, af:0.0000, mf:0.0000},
                        {code:'C002',date:'1月6号', if:0.0000, af:0.0000, mf:0.0000},
                        {code:'C002',date:'1月7号', if:0.0000, af:0.0000, mf:0.0000},
                        {code:'C002',date:'1月8号', if:0.0000, af:0.0000, mf:0.0000},
                        {code:'C002',date:'1月9号', if:0.0000, af:0.0000, mf:0.0000},
                        {code:'C002',date:'1月10号', if:0.0000, af:0.0000, mf:0.0000},
                        {code:'C002',date:'1月11号', if:0.0000, af:0.0000, mf:0.0000},
                        {code:'C002',date:'1月12号', if:0.0000, af:0.0000, mf:0.0000},
                        {code:'C002',date:'1月13号', if:0.0000, af:0.0000, mf:0.0000},
                        {code:'C002',date:'1月14号', if:0.0000, af:0.0000, mf:0.0000},
                        {code:'C002',date:'1月15号', if:0.0000, af:0.0000, mf:0.0000},
                        {code:'C002',date:'1月16号', if:0.0000, af:0.0000, mf:0.0000},
                        {code:'C002',date:'1月17号', if:0.0000, af:0.0000, mf:0.0000},
                        {code:'C002',date:'1月18号', if:0.0000, af:0.0000, mf:0.0000},
                        {code:'C002',date:'1月19号', if:0.0000, af:0.0000, mf:0.0000},
                        {code:'C002',date:'1月20号', if:0.0000, af:0.0000, mf:0.0000}
      ];



      tableByMonth:any[] = [
                          {code:'C002',date:'1月份', if:0.0000, af:0.0000, mf:0.0000},  // Instantaneous flow,average flow,max flow
                          {code:'C002',date:'2月份', if:0.0000, af:0.0000, mf:0.0000},
                          {code:'C002',date:'3月份', if:0.0000, af:0.0000, mf:0.0000},
                          {code:'C002',date:'4月份', if:0.0000, af:0.0000, mf:0.0000},
                          {code:'C002',date:'5月份', if:0.0000, af:0.0000, mf:0.0000},
                          {code:'C002',date:'6月份', if:0.0000, af:0.0000, mf:0.0000},
                          {code:'C002',date:'7月份', if:0.0000, af:0.0000, mf:0.0000},
                          {code:'C002',date:'8月份', if:0.0000, af:0.0000, mf:0.0000},
                          {code:'C002',date:'9月份', if:0.0000, af:0.0000, mf:0.0000},
                          {code:'C002',date:'10月份', if:0.0000, af:0.0000, mf:0.0000},
                          {code:'C002',date:'11月份', if:0.0000, af:0.0000, mf:0.0000},
                          {code:'C002',date:'12月份', if:0.0000, af:0.0000, mf:0.0000}
        ];

    months:string[] = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
    years:string[] = ['2016年','2015年','2014年','2013年','2012年','2011年','2010年','2009年','2008年','2007年']
    days:string[] = ['1日','2日','3日','4日','5日','6日','7日','8日','9日','10日','11日','12日',
                      '13日','14日','15日','16日','17日','18日','19日','20日','21日','22日','23日','24日',
                      '25日','26日','27日','28日','29日','30日','31日'
                    ];

    selectedtab:number=1;  //to switch tabs, the rest is controlled on the page
    currentTable:any;
    currentSelect:string[];
    constructor(){
    console.log("Home alerts detail is up and running---");
        this.showByDay();
    }


    showByDay(){
        // alert('by day');
        this.currentTable = this.tableByday;
        this.currentSelect = this.months;
        this.initSelect();

    }

    showByMonth(){
      //  alert('by month');
        this.currentTable = this.tableByMonth;
        this.currentSelect = this.years;
        this.initSelect();
    }

    initSelect(){
      setTimeout(_=>{
           jQuery('select').material_select();
      });
    }
 }
