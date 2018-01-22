
export interface ConfigType {
  prefix: string,
  project: string,
  title: string,
  logo: string,
  color: string,
  bdmkey: string,
  usersPrivileges: any,
  gpsError: { lng: number, lat: number },
  addresses: any[],
  alertTypes: any[],
  shipmentTanks: any[],
  camera: any
}

export const config: ConfigType = {
  prefix: 'app/',
  color: '#1288C1',
  logo: 'dist/images/logo.png',
  title: 'Monotor admin',
  project: 'Monotor admin project',
  bdmkey: 'RomHDfoS6RNiOTe4Z7IDynKrM6fLX2Cg',
  usersPrivileges: {
    '1': '管理层',
    '2': '监管员',
    '3': '调度员',
    '4': '客户',
    '6': '司机',
    '8': '押运员'
  },
  addresses: [{ en: 'CNG', cn: 'CNG' }, { en: 'LNG', cn: 'LNG' }, { en: 'Jige', cn: '集格' }, { en: 'Duwaping', cn: '杜瓦瓶' }, { en: 'Guanwang', cn: '管网' }, { en: 'Zhongzhuanzhan', cn: '中转站' }],
  shipmentTanks: ['CNG', 'LNG', '集格', '杜瓦瓶', '进场', '拉回'],
  alertTypes: ['余量报警', '压力报警', '信号中断', '泄漏报警', '拉回报警', '进场报警'],
  gpsError: { lng: 0.011139, lat: 0.004028 },
  camera: [
    {
      id: '001',
      addr: '上海万事红危险货物物流有限公司 春和路588号',
      cameras: [
        { id: '01', name: '宝山万事红调度室', link: 'http://open.ys7.com/openlive/b272845e5b5c434eae96bd68b85d8c39.m3u8' },
        { id: '02', name: '宝山万事红停车场', link: 'http://open.ys7.com/openlive/0fcb89c9170d4b6896fadf88a5b52253.m3u8' }
      ]
    },
    {
      id: '002',
      addr: 'CNG-日建供气站（万事红)',
      cameras: [
        // { id: '01', name: '日建站1号', link: 'http://vshare.ys7.com:80/openlive/566521595_1_2.m3u8?ticket=OE9JNzRyMUptaDJCRmdmcWRmdDI2ODgzaGVaS3hPM2FLOGp5QUhMV3NVaz0kMSQyMDE3MDMyNTE2MjUzNCQxNDU4ODk0MTQ5MDAwJDE0OTA0MzAxNDkwMDAkMCQxNDU4ODk0MTQ5MDAwJDE0OTA0MzAxNDkwMDAkMg==&amp;c=0' },
        { id: '01', name: '日建站1号', link: 'http://open.ys7.com/openlive/d3b7fa59bdda4f55823629b0f0d5ef51.m3u8' },
        { id: '02', name: '日建站2号', link: 'http://open.ys7.com/openlive/d42418818a4f445687f7849f260e32ab.m3u8' },
        { id: '03', name: '日建站控制室', link: 'http://open.ys7.com/openlive/36c4baa31bb549d9a0751e89632b3821.m3u8' },
        { id: '04', name: '日建站大门', link: 'http://open.ys7.com/openlive/e80e35b46d624f92be8061fb3bc8d65b.m3u8' }
      ]
    },
    {
      id: '003',
      addr: 'CNG-上食供气站（顺天)',
      cameras: [
        { id: '01', name: '上食站1号', link: 'http://open.ys7.com/openlive/3f5b206b08694346a765caf88d86ab09.m3u8' },
        { id: '02', name: '上食站2号', link: 'http://open.ys7.com/openlive/ef6503a2096d418f9ecd18edd771e88a.m3u8' },
        { id: '03', name: '上食站控制室', link: 'http://open.ys7.com/openlive/858fea1ce70641ebb4ae02023fa8056b.m3u8' },
        { id: '04', name: '上食站大门', link: 'http://open.ys7.com/openlive/0a7b6f17214d4a20a55a4f2602e1a9bb.m3u8' }
      ]
    },
    {
      id: '004',
      addr: 'CNG-天源供气站（顺天)',
      cameras: [
        { id: '01', name: '天源站1号', link: 'http://open.ys7.com/openlive/e3f2e13b4d834260bd356e7baeb302b1.m3u8' },
        { id: '02', name: '天源站2号', link: 'http://open.ys7.com/openlive/5f16469279294953bc6c3bb4df8b328e.m3u8' },
        { id: '03', name: '天源站控制室', link: 'http://open.ys7.com/openlive/328abe9b21a841c69520471d89d03805.m3u8' },
        { id: '04', name: '天源站大门', link: 'http://open.ys7.com/openlive/c0c479371a32476ca46be02a1bc20898.m3u8' }
      ]
    }
  ]
};
