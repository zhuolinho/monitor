
export interface ConfigType {
  prefix:string,
  project: string,
  title: string,
  logo:string,
  color:string,
  bdmkey:string,
  usersPrivileges:any,
  gpsError:{lng:number, lat: number},
  tanks:any[],
  alertTypes:any[],
  shipmentTanks:any[]
}

export const config:ConfigType = {
  prefix:'app/',
  color:'#1288C1',
  logo:'dist/images/logo.png',
  title: 'Monotor admin',
  project: 'Monotor admin project',
  bdmkey:'RomHDfoS6RNiOTe4Z7IDynKrM6fLX2Cg',
  usersPrivileges:{
    '1':'管理层',
    '2':'监管员',
    '3':'调度员',
    '4':'客户',
    '6':'司机',
    '8':'押运员'
  },
  tanks:['CNG','LNG','集格','杜瓦瓶','官网','中转站'],
  shipmentTanks:['CNG','LNG','集格','杜瓦瓶','进场','拉回'],
  alertTypes:['余量报警','压力报警','信号中断','泄漏报警','拉回报警','进场报警'],
  gpsError:{lng:0.011139, lat: 0.004028},
};
