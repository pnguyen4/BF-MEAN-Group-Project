
// to use it: let application = new Application(_id,email,user_id.....)
export class Application {
  constructor(
    public _id:string,
    public email:string,
    public user_id:number,
    public status:string,
    public first:string,
    public last:string,
    public middle:string,
    public prefer:string,
    public address:Address,
    public phone:number,
    public workphone:number,
    public ssn:number,
    public reference:SimpleUser,
    public contactor:SimpleUser[],
    public citizen:boolean,
    public workAuth:string,
    public visaStatus:string,
    public driverlicense:{number:string,expiration:string,imgUrl:string}
  ){}
}

export class Address {
  constructor(
    public _id:string,
    public stress:string,
    public apt:string,
    public city:string,
    public state:string,
    public zip:string
  ){}
}

export class SimpleUser {
  constructor(
    public _id:string,
    public first:string,
    public last:string,
    public phone:number,
    public email:string
  ){}
}

export class Report {
  constructor(
    public _id:string,
    public housing_id:string,
    public author_id:string,
    public status:string,
    public title:string,
    public description:string,
    public message:string[]
  ){}
}

export class ReportMessage {
  constructor(
    public _id:string,
    public housing_id:string,
    public author_id:string,
    public message:string,
  ){}
}

export class Housing {
  constructor(
    public _id:string,
    public idx:number,
    public address:Address,
    public tenants:string
  ){}
}

export class RegisterToken {
  constructor(
    public _id:string,
    public email:string,
    public name:string,
    public link:string,
    public registered:boolean
  ){}
}

export class User {
  constructor(
    public _id:string,
    public username:string,
    public email:string,
    public password:string,
    public admin:boolean,
    public application_id:string,
    public housing_id:string
  ){}
}

export class VisaStatus {
  constructor(
    public _id:string,
    public user_id:string,
    public application_id:string,
    public status:string,
    public img:string,
    public driverLicense:string,
    public workAuthImg:string
  ){}
}

