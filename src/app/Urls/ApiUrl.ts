// const baseUrl = 'https://alora-yst7j.ondigitalocean.app/api/v1/';
const baseUrl = 'https://alora-four.vercel.app/api/v1/';
const adminId = localStorage.getItem('id')
console.log('url id for all',adminId)


export const superAdminEndPoints = {
    superAdminLogin: `${baseUrl}login`,
    getdoctors: `${baseUrl}doctors`,
    deletedoctor: `${baseUrl}doctor/`,
    doctorsAdd: `${baseUrl}doctor`,
    getnurses: `${baseUrl}nurses`,
    addnurses: `${baseUrl}nurse`,
    addslotpost: `${baseUrl}allot`,
    nursesById: `${baseUrl}nurse/`,
    allotedByIdById:`${baseUrl}allot/`,
    addemail :`${baseUrl}alora`,
    getEmail :`${baseUrl}aloras`,
    allotById: `${baseUrl}allot/`,
    getNursesForAdmin: `${baseUrl}nurse/doctorid/`,
    getallalotssgetNursesForAdmin: `${baseUrl}allots`,
    getallreports: `${baseUrl}report/nurseid/`,
    addreports: `${baseUrl}report`,
    getpatients: `${baseUrl}patients`,
    getPatientsForAdmin: `${baseUrl}patient/doctorid/`,
    getPatientsForNurse: `${baseUrl}patient/nurseId/`,
    clockInNurse: `${baseUrl}clockin`,
    clockOutNurse: `${baseUrl}clockout`,
    clockStatus: `${baseUrl}clockinout`,
    clockStatusForAdmin: `${baseUrl}clockinout/doctor/`,
    addpatients: `${baseUrl}patient`,
    patientById: `${baseUrl}patient/`,
    patientForDtl: `${baseUrl}patient/`,
    addtionalservice: `${baseUrl}servicetitle`,
    addtionalserviceGet: `${baseUrl}servicetitles`,
    approveDoctor: `${baseUrl}doctor/accountStatusUpdate/`,
    getCovidcSreening: `${baseUrl}doctor/accountStatusUpdate`,
    addleads: `${baseUrl}lead`,
    getleads: `${baseUrl}leads`,
    updateleadestatusleads: `${baseUrl}lead/leadstatusupdate/`,
    leadupdate: `${baseUrl}lead/`,
     leadupdatedata: `${baseUrl}lead/`

}
