export interface AlertModel{
  name:string;
  id:string;
  type:string;
  remainingTime:string;   //todo add pipes
  alertTime:string;
  processed:boolean;
  alertValue:string;
  upTime:string;
}
