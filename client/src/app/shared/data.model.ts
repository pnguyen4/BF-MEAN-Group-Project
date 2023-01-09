type WorkAuthorizationType = "green-card" | "citizen" | "h1b-etc" | "f1-etc" | "other" | ""

// to use it: let application = new Application(_id,email,user_id.....)
export class Application {
  constructor(
    public _id:string,
    public email:string,
    public user_id:number,
    public status:string,
    public firstname:string,
    public lastname:string,
    public middlename:string,
    public preferredname:string,
    public currentAddress:Address,
    public cellphone:number|string,
    public workphone:number|string,
    public ssn:number,
    public reference:SimpleUser,
    public emergencyContact:SimpleUser[],
    public isCitizenUSA:boolean,
    public visaStatus:string,
    public driverLicense:{number:string,expiration:string,imgUrl:string}
  ){}
}

export class Address {
  constructor(
    public _id:string,
    public street:string,
    public suiteOrAptNumber:string,
    public city:string,
    public state:string,
    public zipcode:string
  ){}
}

export class SimpleUser {
  constructor(
    public _id:string,
    public firstname:string,
    public lastname:string,
    public phone:number|string,
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
    public facReport_id:string,
    public author_id:string,
    public message:string,
  ){}
}

export class Housing {
  constructor(
    public _id:string,
    public idx:number,
    public landlord:Landlord,
    public address:Address,
    public tenants:string[],
    public facilities:string
  ){}
}

class Landlord {
  constructor(
    public fullname: string,
    public phone: string,
    public email: string
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
    public OPTReceiptUrl:string,
    public OPTEADurl:string,
    public I983:string,
    public I20:string,
    public workAuth:string,
    public startDate:Date,
    public endDate:Date
  ){}
}

