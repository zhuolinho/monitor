
export interface ConfigType {
  prefix:string,
  project: string,
  title: string,
  logo:string,
  color:string,
}

export const config:ConfigType = {
  prefix:'app/',
  color:'blue',
  logo:'dist/images/logo.jpg',
  title: 'Monotor admin',
  project: 'Monotor admin project'
};
