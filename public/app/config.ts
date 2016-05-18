
export interface ConfigType {
  prefix:string,
  project: string,
  title: string,
  logo:string,
  color:string,
  bdmkey:string,
  usersPrivileges:any,
  tanks:any[]
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
  tanks:['CNG','LNG','集格','杜瓦瓶','官网','中转站']
};
