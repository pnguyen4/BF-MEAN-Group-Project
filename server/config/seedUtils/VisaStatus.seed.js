module.exports.generateVisaStatus = ( 
    status="pending", 
    profileImgUrl=null, 
    driverLicenseImgUrl=null,
    workAuthorizationImgUrl=null 
) => {
    return { status, profileImgUrl, driverLicenseImgUrl, workAuthorizationImgUrl };
}