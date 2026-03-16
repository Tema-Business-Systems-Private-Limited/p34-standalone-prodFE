import XMLParser from 'react-xml-parser';


const apiUrl = process.env.REACT_APP_API_URL;

// ✅ Helper to get username from localStorage
export function getUsername() {
  try {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    return authUser?.username || "Unknown";
  } catch {
    return "Unknown";
  }
}

//RP
export async function fetchAPI(param, date) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/transport/vehicle/panel?site=` + param + '&date='+date), fetch(`${apiUrl}/api/v1/transport/drops/panel?site=` + param + '&date='+date), fetch(`${apiUrl}/api/v1/transport/trips?site=` + param + '&date='+date),fetch(`${apiUrl}/api/v1/transport/routecodes`)])
        .then(([res1, res2, res3,res4]) => {
           return Promise.all([
            res1.ok ? res1.json() : [], 
            res2.ok ? res2.json() : [], 
            res3.ok ? res3.json() : [],
            res4.ok ? res4.json() : [], 
            res1.status, res2.status, res3.status,res4.status
           ])
        });
    return completeResult;
}

//Scheduler
export async function fetchSchedulerAPI(param, sdate , edate) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/scheduler/vehicle/panel?site=` + param + '&date='+sdate), fetch(`${apiUrl}/api/v1/scheduler/docs/panelwithRange?site=` + param + '&sdate='+sdate+'&edate='+edate), fetch(`${apiUrl}/api/v1/scheduler/tripsrange?site=` + param + '&sdate='+sdate+'&edate='+edate), fetch(`${apiUrl}/api/v1/scheduler/routecodes`)])
        .then(([res1, res2, res3, res4]) => {
           return Promise.all([
            res1.ok ? res1.json() : [], 
            res2.ok ? res2.json() : [], 
            res3.ok ? res3.json() : [], 
            res4.ok ? res4.json() : []
          ])
        });
    return completeResult;
}

//Scheduler
export async function fetchSchedulerDocsAPI(param, sdate , edate) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/scheduler/docs/panelwithRange?site=` + param + '&sdate='+sdate+'&edate='+edate)])
        .then(([res1]) => {
          return Promise.all([res1.ok ? res1.json() : []])
        });
    return completeResult;
}


//opendocsBySiteAndDateRange
export async function fetchOpenDocumentPanelwithRange(param, sdate , edate) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/transport/opendocsBySiteAndDateRange?site=` + param + '&sdate='+sdate+'&edate='+edate)])
        .then(([res1]) => {
           return Promise.all([res1.json()])
        });
    return completeResult;
}



//open to Add docsBySiteAndDateRange
export async function fetchOpenToAddDocumentPanelwithRange(param, sdate , edate) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/transport/opentoadddocsBySiteAndDateRange?site=` + param + '&sdate='+sdate+'&edate='+edate)])
        .then(([res1]) => {
           return Promise.all([res1.json()])
        });
    return completeResult;
}


//Scheduler
export async function fetchDocumentPanelwithRange(param, sdate , edate) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/scheduler/docs/panelwithRange?site=` + param + '&sdate='+sdate+'&edate='+edate), fetch(`${apiUrl}/api/v1/scheduler/tripsrange?site=` + param + '&sdate='+sdate+'&edate='+edate)])
        .then(([res1, res2]) => {
           return Promise.all([
            res1.ok ? res1.json() : [], 
            res2.ok ? res2.json() : []
          ])
        });
    return completeResult;
}


//Scheduler
export async function fetchDocumentPanelAPI(param, date) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/scheduler/docs/panelwithSelDate?site=` + param + '&seldate='+date),fetch(`${apiUrl}/api/v1/scheduler/trips?site=` + param + '&date='+date)])
        .then(([res1, res2]) => {
           return Promise.all([
            res1.ok ? res1.json() : [],
            res2.ok ? res2.json() : []
          ])
        });
    return completeResult;
}


//Scheduler - Appointments
export async function fetchDocumentPanelAPI_appointments(param, date) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/scheduler/docs/panelwithSelDate?site=` + param + '&seldate='+date),fetch(`${apiUrl}/api/v1/scheduler/trips?site=` + param + '&date='+date)])
        .then(([res1, res2]) => {
           return Promise.all([res1.json(), res2.json()])
        });
    return completeResult;
}


//RP
export async function fetchPanel(site, date) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/transport/drops/panel?site=` + site + '&date='+date), fetch(`${apiUrl}/api/v1/transport/trips?site=` + site + '&date='+date)])
        .then(([res1, res2]) => {
           return Promise.all([
            res1.ok ? res1.json() : [], 
            res2.ok ? res2.json() : [] 
          ])
        });
    return completeResult;
}

//RP
export async function fetchDropsPanel(site, date) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/transport/drops/panel?site=` + site + '&date='+date)])
        .then(([res1]) => {
          return Promise.all([res1.ok ? res1.json() : [] ])
        });
    return completeResult;
}

//RP
export async function fetchTripsPanel(site, date) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/transport/trips?site=` + site + '&date='+date)])
        .then(([res1]) => {
          return Promise.all([res1.ok ? res1.json() : [] ])
        });
    return completeResult;
}

//RP
export async function fetchTripsPanelwithRange(site,  sdate, edate) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/transport/tripswithRange?site=` + site + '&sdate='+sdate+'&edate='+edate)])
        .then(([res1]) => {
          return Promise.all([res1.ok ? res1.json() : [] ])
        });
    return completeResult;
}


//railcar
export async function fetchRailDropsPanel(site, date) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/rail/drops/panel?site=` + site + '&date='+date)])
        .then(([res1]) => {
           return Promise.all([res1.json() ])
        });
    return completeResult;
}

//RP
export async function fetchDropsPanelwithRange(site, sdate, edate) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/transport/drops/panelwithRange?site=` + site + '&sdate='+sdate+'&edate='+edate)])
        .then(([res1]) => {
          return Promise.all([res1.ok ? res1.json() : [] ])
        });
    return completeResult;
}

//railcar
export async function fetchRailTripsPanelwithRange(site, sdate, edate) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/rail/railtripswithRange?site=` + site + '&sdate='+sdate+'&edate='+edate)])
        .then(([res1]) => {
           return Promise.all([res1.json() ])
        });
    return completeResult;
}


//railcar
export async function fetchRailTripsPanel(site, date) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/rail/railtrips?site=` + site + '&date='+date)])
        .then(([res1]) => {
           return Promise.all([res1.json() ])
        });
    return completeResult;
}


//railcar
export async function fetchRailDropsPanelwithRange(site, sdate, edate) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/rail/drops/panelwithRange?site=` + site + '&sdate='+sdate+'&edate='+edate)])
        .then(([res1]) => {
           return Promise.all([res1.json() ])
        });
    return completeResult;
}

//Scheduler
export async function fetchSchedulerDropsPanelwithRange(site, sdate, edate) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/scheduler/docs/panelwithRange?site=` + site + '&sdate='+sdate+'&edate='+edate)])
        .then(([res1]) => {
          return Promise.all([res1.ok ? res1.json() : [] ])
        });
    return completeResult;
}


//Appointments-Scheduler
export async function fetchAppSchedulerDropsPanelwithRange(site, sdate, edate) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/appoint/docs/panelwithRange?site=` + site + '&sdate='+sdate+'&edate='+edate)])
        .then(([res1]) => {
           return Promise.all([res1.json() ])
        });
    return completeResult;
}



//RP
export async function fetchTrips(site, date) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/transport/trips?site=` + site + '&date='+date)])
        .then(([res1]) => {
          return Promise.all([res1.ok ? res1.json() : []])
        });
    return completeResult;
}


//RP
export async function fetchTripDetails(vrcode) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/transport/tripDetails/vr?vrcode=` + vrcode)])
        .then(([res1]) => {
           return Promise.all([res1.json() ])
        });
    return completeResult;
}

  export async function  fetchGetDriversBySite(site) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/hos/driversbySite?site=`+site)])
          .then(([res1]) => {
            return Promise.all([
              res1.json()
            ])
          });
    return completeResult;
  }

  export async function  fetchGetDriversBySiteAndDate(site, formatEndDate) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/hos/driversbySiteandDate?site=`+site+`&date=`+formatEndDate)])
          .then(([res1]) => {
            return Promise.all([
              res1.json()
            ])
          });
    return completeResult;
  }



  export async function  fetchGetDrivers(formatStartDate, formatEndDate) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/hos/drivers?startDate=`+formatStartDate+`&endDate=`+formatEndDate)])
          .then(([res1]) => {
            return Promise.all([
              res1.json()
            ])
          });
    return completeResult;
  }

  export async function  fetchVehicleDetails(formatStartDate, formatEndDate) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/hos/vehicles?startDate=`+formatStartDate+`&endDate=`+formatEndDate)])
          .then(([res1]) => {
            return Promise.all([
              res1.json()
            ])
          });
    return completeResult;
  }

  export async function  fetchGetDriverDetails(driverId) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/hos/driver?driverId=`+ driverId)])
          .then(([res1]) => {
            return Promise.all([
              res1.json()
            ])
          });
    return completeResult;
  }








// ADDED for VR screen --- by Ashok
export async function fetchVR(vrcode) {

        const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/transport/vr?vrcode=` + vrcode), fetch(`${apiUrl}/api/v1/transport/vrdetails?vrcode=` + vrcode),fetch(`${apiUrl}/api/v1/transport/loadvehstk?vrcode=` + vrcode)])
           .then(([res1, res2, res3]) => {
                      return Promise.all([
                        res1.ok ? res1.json() : {}, 
                        res2.ok ? res2.json() : [], 
                        res3.ok ? res3.json() : {}
                      ])
                   });
               return completeResult;
    }




    //end of VR screen



// ADDED for VR screen --- by Ashok
export async function fetchLVSHeaderAndDetails(vrcode) {

        const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/transport/lvsheader?vrcode=` + vrcode), fetch(`${apiUrl}/api/v1/transport/lvsdetails?vrcode=` + vrcode)])
           .then(([res1, res2]) => {
                      return Promise.all([res1.json() , res2.json()])
                   });
               return completeResult;
    }



export async function fetchLVS(vrcode) {

        const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/transport/loadvehstk?vrcode=` + vrcode)])
           .then(([res1]) => {
            return Promise.all([res1.ok ? res1.json() : {}])
                   });
               return completeResult;
    }

  //RAILCAR APIS

 export async function fetchRailAPI(param, date) {
     const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/rail/railcar?site=` + param)])
         .then(([res1]) => {
            return Promise.all([res1.json(), res1.status ])
         });
     return completeResult;
 }



///RAILCAR CHECKIN SCREEN API'S --- by Ashok
export async function fetchRailCarAPI(param) {

        const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/rail/railchkIn?site=` + param), fetch(`${apiUrl}/api/v1/rail/railchkOut?site=` + param),fetch(`${apiUrl}/api/v1/rail/railchkAvail?site=` + param)])
           .then(([res1, res2, res3]) => {
                      return Promise.all([res1.json() , res2.json(), res3.json()])
                   });
               return completeResult;
    }


// list of LVS
export async function fetchLvsList() {

        const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/transport/lvslist`)])
           .then(([res1]) => {
                      return Promise.all([res1.json(), res1.status])
                   });
               return completeResult;
    }


// list of LVS
export async function fetchLvsBySiteAndDate(param, date) {

        const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/transport/lvsbysiteAndDate?site=`+ param+ '&seldate='+date)])
           .then(([res1]) => {
                      return Promise.all([res1.json(), res1.status])
                   });
               return completeResult;
    }

// list of LVS
export async function fetchLvsBySite(param) {

        const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/transport/lvsbysite?site=`+ param)])
           .then(([res1]) => {
                      return Promise.all([res1.json(), res1.status])
                   });
               return completeResult;
    }

export async function fetchLvsByDate(param) {

        const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/transport/lvsbyDate?seldate=`+ param)])
           .then(([res1]) => {
                      return Promise.all([res1.json(), res1.status])
                   });
               return completeResult;
    }

export async function fetchInventoryList(param) {

        const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/transport/stocklocbysite?site=` + param), fetch(`${apiUrl}/api/v1/transport/loctypbysite?site=` + param)])
           .then(([res1, res2]) => {
                      return Promise.all([res1.json() , res2.json()])
                   });
               return completeResult;
    }


//rail car outbound screen
export async function fetchRailCarOutBoundAPI(site, date) {

        const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/rail/railchkIn?site=` + site), fetch(`${apiUrl}/api/v1/rail/drops/panel?site=` + site + '&date='+date),fetch(`${apiUrl}/api/v1/rail/railtrips?site=` + site + '&date='+date)])
           .then(([res1, res2, res3]) => {
                      return Promise.all([res1.json() , res2.json(), res3.json(), res1.status, res2.status, res3.status])
                   });
               return completeResult;
    }

//Railcar PDF
export async function fetchRailVR(vrcode) {
       let docnum = 'ASMI12203SDH00000272';
       //ASMI12203SDH00000293 , ASMI12203SDH00000355 , GDKS12205SDH00000049, ASMI12203SDH00000272,STCA12205SDH00000106

        const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/rail/vr?vrcode=` + vrcode), fetch(`${apiUrl}/api/v1/rail/vrdetails?vrcode=` + vrcode) ,fetch(`${apiUrl}/api/v1/rail/prdcombo?docnum=` + docnum),fetch(`${apiUrl}/api/v1/rail/bol?docnum=` + docnum) ])
           .then(([res1, res2, res3, res4]) => {
                      return Promise.all([res1.json() , res2.json(), res3.json(), res4.json()])
                   });

  return completeResult;
}


//Appointment API
export async function fetchAppointmentAPI(param, date) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/appoint/right/panel?site=` + param + '&date='+date), fetch(`${apiUrl}/api/v1/appoint/trips?site=` + param + '&date='+date)])
        .then(([res1, res2]) => {
           return Promise.all([res1.json(), res2.json(), res1.status, res2.status ])
        });
    return completeResult;
}

//vehicle live tracking
export async function fetchVehicleTrackingbySite(site) {

    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/track/livevehbysite?site=` + site)])
      .then(([res1]) => {
        return Promise.all([res1.json()])
      });
    return completeResult;
  }


export async function  fetchgetUserDetailsByID(userid) {

const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/user/`+ userid)])
      .then(([res1]) => {
        return Promise.all([res1.json()])
      });
    return completeResult;

}


export async function  fetchgetDataUserManagement() {

const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/user/getusers`), fetch(`${apiUrl}/api/v1/transport/sites`)])
      .then(([res1, res2]) => {
        return Promise.all([
          res1.json(),
          res2.json()
        ])
      });
    return completeResult;

}


//Appintment - Scheduler
export async function fetchAppointmentSchedulerAPI(param, sdate , edate) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/appoint/vehicle/panel?site=` + param + '&date='+sdate), fetch(`${apiUrl}/api/v1/appoint/docs/panelwithRange?site=` + param + '&sdate='+sdate+'&edate='+edate), fetch(`${apiUrl}/api/v1/appoint/tripsrange?site=` + param + '&sdate='+sdate+'&edate='+edate)])
        .then(([res1, res2, res3]) => {
           return Promise.all([res1.json(), res2.json(), res3.json()])
        });
    return completeResult;
}

//Apointment-Scheduler
export async function fetchAppointmentSchedulerDocsAPI(param, sdate , edate) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/appoint/docs/panelwithRange?site=` + param + '&sdate='+sdate+'&edate='+edate)])
        .then(([res1]) => {
           return Promise.all([res1.json()])
        });
    return completeResult;
}


//Appointment -Scheduler
export async function fetchAppointmentDocumentPanelwithRange(param, sdate , edate) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/appoint/docs/panelwithRange?site=` + param + '&sdate='+sdate+'&edate='+edate), fetch(`${apiUrl}/api/v1/appoint/tripsrange?site=` + param + '&sdate='+sdate+'&edate='+edate)])
        .then(([res1, res2]) => {
           return Promise.all([res1.json(), res2.json()])
        });
    return completeResult;
}

//Appointment - Scheduler
export async function fetchAppointmentDocumentPanelAPI(param, date) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/appoint/docs/panelwithSelDate?site=` + param + '&seldate='+date),fetch(`${apiUrl}/api/v1/appoint/trips?site=` + param + '&date='+date)])
        .then(([res1, res2]) => {
           return Promise.all([res1.json(), res2.json()])
        });
    return completeResult;
    
}


//Scheduler
export async function fetchSchedulerPanelList(param, sdate) {
    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/scheduler/vehicle/panel?site=` + param + '&date='+sdate)])
        .then(([res1]) => {
           return Promise.all([res1.json()])
        });
    return completeResult;
}


  //documents live tracking
  export async function fetchDocumentsTrackingbySite(site) {

    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/track/livedocsbysite?site=` + site)])
      .then(([res1]) => {
        return Promise.all([res1.json()])
      });
    return completeResult;
  }


// Comman data for fleet management
  export async function fetchCommonDataFleet() {

    const completeResult = Promise.all([fetch(`${apiUrl}/api/v1/fleet/getVehicleCommonData`)])
      .then(([res1]) => {
        return Promise.all([res1.json()])
      });
    return completeResult;
  }

// Sync data module

// Sync All Data
export async function fetchSyncAllData() {
  const res = await fetch(`${apiUrl}/api/v1/sync/getAllSyncData`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch sync data");
  }
  return res.json(); // parsed JSON directly
}

// Sync Site Data
export async function fetchSyncSiteData() {
  const res = await fetch(`${apiUrl}/api/v1/sync/site`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: getUsername() }),
  });
  if (!res.ok) {
    throw new Error("Failed to sync site data");
  }
  return res.json();
}
// fetch all sites sync module
export async function fetchAllSites() {
  const res = await fetch(`${apiUrl}/api/v1/sync/allsites`);
  if (!res.ok) {
    throw new Error("Failed to fetch sites");
  }
  return res.json(); // parsed JSON
}

// Sync Product Data
export async function fetchSyncProductData() {
  const res = await fetch(`${apiUrl}/api/v1/sync/product`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: getUsername() }),
  });
  if (!res.ok) {
    throw new Error("Failed to sync product data");
  }
  return res.json();
}

// Sync Category Data
export async function fetchSyncCategoryData() {
  const res = await fetch(`${apiUrl}/api/v1/sync/category`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: getUsername() }),
  });
  if (!res.ok) {
    throw new Error("Failed to sync category data");
  }
  return res.json();
}

// Sync Customer Data
export async function fetchSyncCustomerData() {
  const res = await fetch(`${apiUrl}/api/v1/sync/customer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: getUsername() }),
  });
  if (!res.ok) {
    throw new Error("Failed to sync customer data");
  }
  return res.json();
}

// Sync Customer Address Data
export async function fetchSyncCustomerAddressData() {
  const res = await fetch(`${apiUrl}/api/v1/sync/customerAdd`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: getUsername() }),
  });
  if (!res.ok) {
    throw new Error("Failed to sync customer address data");
  }
  return res.json();
}

// update site data
export async function updateSite(siteData) {
  const res = await fetch(`${apiUrl}/api/v1/sync/updateSite`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(siteData),
  });
  if (!res.ok) {
    throw new Error("Failed to update site data");
  }
  return res.json();
}






//soap for X3

export async function getsampleexample () {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST','https://x3tms.tema-systems.com/soap-generic/syracuse/collaboration/syracuse/CAdxWebServiceXmlCC',true);

var src = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
'<soapenv:Header/>' +
'<soapenv:Body>' +
   '<wss:read soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<callContext xsi:type="wss:CAdxCallContext">' +
        ' <codeLang xsi:type="xsd:string">ENG</codeLang>'+
        '<poolAlias xsi:type="xsd:string">TMSNEW</poolAlias>'+
         '<poolId xsi:type="xsd:string"></poolId>'+
        ' <requestConfig xsi:type="xsd:string"></requestConfig>'+
     ' </callContext>'+
      '<publicName xsi:type="xsd:string">XX10CSDH</publicName>'+

    '   <objectKeys xsi:type="wss:ArrayOfCAdxParamKeyValue" soapenc:arrayType="wss:CAdxParamKeyValue[]">'+
               ' <key>SDHNUM</key><value>BDL2208CFGHQ000020</value>'+
               ' </objectKeys>'+
   '</wss:read>'+
'</soapenv:Body>'+
'</soapenv:Envelope>';

xmlhttp.onreadystatechange=function(){
    if(xmlhttp.readyState == 4){
        if(xmlhttp.status== 200){

            // console.log("soap xample =",xmlhttp.responseXML.getElementsByTagName('resultXml')[0].innerHTML);

        }

    }
}


xmlhttp.setRequestHeader('Content-Type','text/html');

xmlhttp.setRequestHeader('SOAPAction','CAdxWebServiceXmlCC');

xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa("TMSWE" + ':' + "*Tbs@12345123"));

try
{
xmlhttp.send(src);
}catch(error){
    // console.log(error);
}

}


export async function callWebservice(){

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST','https://x3tms.tema-systems.com/soap-generic/syracuse/collaboration/syracuse/CAdxWebServiceXmlCC',true);

var src = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
'<soapenv:Header/>' +
'<soapenv:Body>' +
   '<wss:run soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<callContext xsi:type="wss:CAdxCallContext">' +
        ' <codeLang xsi:type="xsd:string">ENG</codeLang>'+
        '<poolAlias xsi:type="xsd:string">TMSNEW</poolAlias>'+
         '<poolId xsi:type="xsd:string"></poolId>'+
        ' <requestConfig xsi:type="xsd:string"></requestConfig>'+
     ' </callContext>'+
      '<publicName xsi:type="xsd:string">XX10CCONF</publicName>'+

    '  <inputXml xsi:type="xsd:string">'+
  '<![CDATA[<PARAM>'+
'<FLD NAME="I_XCPY" TYPE="Char">CCBTL</FLD>'+
'<FLD NAME="I_XIP" TYPE="Char">tms.tema-systems.com</FLD>'+
'<FLD NAME="I_XPORT" TYPE="Char">8124</FLD>'+
'<FLD NAME="I_XFOLDER" TYPE="Char">TMSNEW</FLD>'+
'<FLD NAME="I_XUSR" TYPE="Char">TMSWE</FLD>'+
'<FLD NAME="I_PWD" TYPE="Char">*Tbs@123451</FLD>'+
'</PARAM>]]>'+
'</inputXml>'+
   '</wss:run>'+
'</soapenv:Body>'+
'</soapenv:Envelope>';

xmlhttp.onreadystatechange=function(){
    if(xmlhttp.readyState == 4){
        if(xmlhttp.status== 200){

            // console.log(xmlhttp.responseXML.getElementsByTagName('resultXml')[0].innerHTML);

        }

    }
}

xmlhttp.setRequestHeader('Content-Type','text/html');

xmlhttp.setRequestHeader('SOAPAction','CAdxWebServiceXmlCC');

xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa("TMSWE" + ':' + "*Tbs@12345123"));

try
{
xmlhttp.send(src);
}catch(error){
    // console.log(error);
}

}


//PO , PreReceipt generation from Freqeuncy

export async function CreatePOfromFrequency(num, site, date, supplier, reference, qty) {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST','https://x3tms.tema-systems.com/soap-generic/syracuse/collaboration/syracuse/CAdxWebServiceXmlCC',true);

var src = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
'<soapenv:Header/>' +
'<soapenv:Body>' +
   '<wss:run soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<callContext xsi:type="wss:CAdxCallContext">' +
        ' <codeLang xsi:type="xsd:string">ENG</codeLang>'+
        '<poolAlias xsi:type="xsd:string">TMSNEW</poolAlias>'+
         '<poolId xsi:type="xsd:string"></poolId>'+
        ' <requestConfig xsi:type="xsd:string"></requestConfig>'+
     ' </callContext>'+
      '<publicName xsi:type="xsd:string">X1CPOHPTHW</publicName>'+

      '  <inputXml xsi:type="xsd:string">'+
     '<![CDATA[<PARAM>'+
   '<FLD NAME="I_XNUM" TYPE="Char">'+num+'</FLD>'+
   '<FLD NAME="I_XPOHFCY" TYPE="Char">'+site+'</FLD>'+
   '<FLD NAME="I_XORDDAT" TYPE="Date">'+date+'</FLD>'+
   '<FLD NAME="I_XBPSNUM" TYPE="Char">'+supplier+'</FLD>'+
   '<FLD NAME="I_XORDREF" TYPE="Char">'+reference+'</FLD>'+
   '<FLD NAME="I_XQTY" TYPE="Decimal">'+qty+'</FLD>'+
   '</PARAM>]]>'+
   '</inputXml>'+
   '</wss:run>'+
'</soapenv:Body>'+
'</soapenv:Envelope>';

xmlhttp.onreadystatechange=function(){
    if(xmlhttp.readyState == 4){
        if(xmlhttp.status== 200){
          // let object =  JSON.parse(xmlhttp.response);
          // console.log("response =",object);
          // return object;

            let responeData = xmlhttp.responseXML.getElementsByTagName('resultXml')[0].innerHTML;
            console.log("soap xample =",responeData);
            let extractxmldata = responeData.slice(9, responeData.length-3)
            console.log("soap xample extractxmldata=",extractxmldata);
          var xml = new XMLParser().parseFromString(extractxmldata);
       //  const completeResult = return xml;

          console.log("soap xample inside service",xml);
          var PO =  xml.children[1].children[1].value;
          var PreReceipt = xml.children[1].children[2].value;
          console.log("soap PO",PO);
          console.log("soap PreReceipt =",PreReceipt);
          return extractxmldata;
        }

    }
}


xmlhttp.setRequestHeader('Content-Type','text/html');

xmlhttp.setRequestHeader('SOAPAction','CAdxWebServiceXmlCC');

xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa("TMSWE" + ':' + "*Tbs@12345123"));

try
{
xmlhttp.send(src);
}catch(error){
    console.log(error);
}

}


export async function CreatePOfromFrequency2(num, site, date, supplier, reference, qty) {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST','https://x3tms.tema-systems.com/soap-generic/syracuse/collaboration/syracuse/CAdxWebServiceXmlCC',true);

var src = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
'<soapenv:Header/>' +
'<soapenv:Body>' +
   '<wss:run soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<callContext xsi:type="wss:CAdxCallContext">' +
        ' <codeLang xsi:type="xsd:string">ENG</codeLang>'+
        '<poolAlias xsi:type="xsd:string">TMSNEW</poolAlias>'+
         '<poolId xsi:type="xsd:string"></poolId>'+
        ' <requestConfig xsi:type="xsd:string"></requestConfig>'+
     ' </callContext>'+
      '<publicName xsi:type="xsd:string">X1CPOHPTHW</publicName>'+

      '  <inputXml xsi:type="xsd:string">'+
     '<![CDATA[<PARAM>'+
   '<FLD NAME="I_XNUM" TYPE="Char">'+num+'</FLD>'+
   '<FLD NAME="I_XPOHFCY" TYPE="Char">'+site+'</FLD>'+
   '<FLD NAME="I_XORDDAT" TYPE="Date">'+date+'</FLD>'+
   '<FLD NAME="I_XBPSNUM" TYPE="Char">'+supplier+'</FLD>'+
   '<FLD NAME="I_XORDREF" TYPE="Char">'+reference+'</FLD>'+
   '<FLD NAME="I_XQTY" TYPE="Decimal">'+qty+'</FLD>'+
   '</PARAM>]]>'+
   '</inputXml>'+
   '</wss:run>'+
'</soapenv:Body>'+
'</soapenv:Envelope>';



return new Promise((resolve, reject) => {

xmlhttp.onreadystatechange = (e) => {
      if (xmlhttp.readyState !== 4) {
        return;
      }
    if(xmlhttp.readyState == 4){
        if(xmlhttp.status== 200){
          // let object =  JSON.parse(xmlhttp.response);
          // console.log("response =",object);
          // return object;

            let responeData = xmlhttp.responseXML.getElementsByTagName('resultXml')[0].innerHTML;
            console.log("soap xample =",responeData);
            let extractxmldata = responeData.slice(9, responeData.length-3)
            console.log("soap xample extractxmldata=",extractxmldata);
          var xml = new XMLParser().parseFromString(extractxmldata);
       //  const completeResult = return xml;

          console.log("soap xample inside service",xml);
          var PO =  xml.children[1].children[1].value;
          var PreReceipt = xml.children[1].children[2].value;
          console.log("soap PO",PO);
          console.log("soap PreReceipt =",PreReceipt);
          resolve (xml);

        }

    }
}


xmlhttp.setRequestHeader('Content-Type','text/html');

xmlhttp.setRequestHeader('SOAPAction','CAdxWebServiceXmlCC');

xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa("TMSWE" + ':' + "*Tbs@12345123"));

try
{
xmlhttp.send(src);
}catch(error){
    console.log(error);
}
  });
}


export async function ConfirmLVS(num) {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST','https://x3tms.tema-systems.com/soap-generic/syracuse/collaboration/syracuse/CAdxWebServiceXmlCC',true);

var src = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
'<soapenv:Header/>' +
'<soapenv:Body>' +
   '<wss:run soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<callContext xsi:type="wss:CAdxCallContext">' +
        ' <codeLang xsi:type="xsd:string">ENG</codeLang>'+
        '<poolAlias xsi:type="xsd:string">TMSNEW</poolAlias>'+
         '<poolId xsi:type="xsd:string"></poolId>'+
        ' <requestConfig xsi:type="xsd:string"></requestConfig>'+
     ' </callContext>'+
      '<publicName xsi:type="xsd:string">X10CCONBUT</publicName>'+

      '  <inputXml xsi:type="xsd:string">'+
     '<![CDATA[<PARAM>'+
   '<FLD NAME="I_XLVSNUM" TYPE="Char">'+num+'</FLD>'+
   '</PARAM>]]>'+
   '</inputXml>'+
   '</wss:run>'+
'</soapenv:Body>'+
'</soapenv:Envelope>';



return new Promise((resolve, reject) => {

xmlhttp.onreadystatechange = (e) => {
      if (xmlhttp.readyState !== 4) {
        return;
      }
    if(xmlhttp.readyState == 4){
        if(xmlhttp.status== 200){
          // let object =  JSON.parse(xmlhttp.response);
          // console.log("response =",object);
          // return object;

            let responeData = xmlhttp.responseXML.getElementsByTagName('resultXml')[0].innerHTML;
            console.log("soap xample =",responeData);
            let extractxmldata = responeData.slice(9, responeData.length-3)
            console.log("soap xample extractxmldata=",extractxmldata);
          var xml = new XMLParser().parseFromString(extractxmldata);
       //  const completeResult = return xml;

          resolve (xml);

        }

    }
}


xmlhttp.setRequestHeader('Content-Type','text/html');

xmlhttp.setRequestHeader('SOAPAction','CAdxWebServiceXmlCC');

xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa("TMSWE" + ':' + "*Tbs@12345123"));

try
{
xmlhttp.send(src);
}catch(error){
    console.log(error);
}
  });
}



export async function ToPickData(vrnum) {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST','https://x3tms.tema-systems.com/soap-generic/syracuse/collaboration/syracuse/CAdxWebServiceXmlCC',true);

var src = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
'<soapenv:Header/>' +
'<soapenv:Body>' +
   '<wss:run soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<callContext xsi:type="wss:CAdxCallContext">' +
        ' <codeLang xsi:type="xsd:string">ENG</codeLang>'+
        '<poolAlias xsi:type="xsd:string">TMSNEW</poolAlias>'+
         '<poolId xsi:type="xsd:string"></poolId>'+
        ' <requestConfig xsi:type="xsd:string"></requestConfig>'+
     ' </callContext>'+
      '<publicName xsi:type="xsd:string">X1CROUTDET</publicName>'+

      '  <inputXml xsi:type="xsd:string">'+
     '<![CDATA[<PARAM>'+
   '<FLD NAME="I_XROUTE" TYPE="Char">'+vrnum+'</FLD>'+
   '</PARAM>]]>'+
   '</inputXml>'+
   '</wss:run>'+
'</soapenv:Body>'+
'</soapenv:Envelope>';



return new Promise((resolve, reject) => {

xmlhttp.onreadystatechange = (e) => {
      if (xmlhttp.readyState !== 4) {
        return;
      }
    if(xmlhttp.readyState == 4){
        if(xmlhttp.status== 200){
          // let object =  JSON.parse(xmlhttp.response);
          // console.log("response =",object);
          // return object;

            let responeData = xmlhttp.responseXML.getElementsByTagName('resultXml')[0].innerHTML;
            console.log("soap xample =",responeData);
            let extractxmldata = responeData.slice(9, responeData.length-3)
            console.log("soap xample extractxmldata=",extractxmldata);
          var xml = new XMLParser().parseFromString(extractxmldata);
       //  const completeResult = return xml;

          resolve (xml);

        }

    }
}


xmlhttp.setRequestHeader('Content-Type','text/html');

xmlhttp.setRequestHeader('SOAPAction','CAdxWebServiceXmlCC');

xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa("TMSWE" + ':' + "*Tbs@12345123"));

try
{
xmlhttp.send(src);
}catch(error){
    console.log(error);
}
  });
}


export async function ToLocationsFetchData(site, floctyp , tloctyp) {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST','https://x3tms.tema-systems.com/soap-generic/syracuse/collaboration/syracuse/CAdxWebServiceXmlCC',true);

var src = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
'<soapenv:Header/>' +
'<soapenv:Body>' +
   '<wss:run soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<callContext xsi:type="wss:CAdxCallContext">' +
        ' <codeLang xsi:type="xsd:string">ENG</codeLang>'+
        '<poolAlias xsi:type="xsd:string">TMSNEW</poolAlias>'+
         '<poolId xsi:type="xsd:string"></poolId>'+
        ' <requestConfig xsi:type="xsd:string"></requestConfig>'+
     ' </callContext>'+
      '<publicName xsi:type="xsd:string">X1CLOCSEL</publicName>'+

      '  <inputXml xsi:type="xsd:string">'+
     '<![CDATA[<PARAM>'+
   '<FLD NAME="I_XFCY" TYPE="Char">'+site+'</FLD>'+
    '<FLD NAME="I_XLOCTYPF" TYPE="Char">'+floctyp+'</FLD>'+
    '<FLD NAME="I_XLOCTYPT" TYPE="Char">'+tloctyp+'</FLD>'+
   '</PARAM>]]>'+
   '</inputXml>'+
   '</wss:run>'+
'</soapenv:Body>'+
'</soapenv:Envelope>';



return new Promise((resolve, reject) => {

xmlhttp.onreadystatechange = (e) => {
      if (xmlhttp.readyState !== 4) {
        return;
      }
    if(xmlhttp.readyState == 4){
        if(xmlhttp.status== 200){
          // let object =  JSON.parse(xmlhttp.response);
          // console.log("response =",object);
          // return object;

            let responeData = xmlhttp.responseXML.getElementsByTagName('resultXml')[0].innerHTML;
            console.log("soap xample =",responeData);
            let extractxmldata = responeData.slice(9, responeData.length-3)
            console.log("soap xample extractxmldata=",extractxmldata);
          var xml = new XMLParser().parseFromString(extractxmldata);
       //  const completeResult = return xml;

          resolve (xml);

        }

    }
}


xmlhttp.setRequestHeader('Content-Type','text/html');

xmlhttp.setRequestHeader('SOAPAction','CAdxWebServiceXmlCC');

xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa("TMSWE" + ':' + "*Tbs@12345123"));

try
{
xmlhttp.send(src);
}catch(error){
    console.log(error);
}
  });
}


export async function ToAllocationFetchData(vrnum, floctyp , tloctyp, floc , tloc) {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST','https://x3tms.tema-systems.com/soap-generic/syracuse/collaboration/syracuse/CAdxWebServiceXmlCC',true);

var src = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
'<soapenv:Header/>' +
'<soapenv:Body>' +
   '<wss:run soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<callContext xsi:type="wss:CAdxCallContext">' +
        ' <codeLang xsi:type="xsd:string">ENG</codeLang>'+
        '<poolAlias xsi:type="xsd:string">TMSNEW</poolAlias>'+
         '<poolId xsi:type="xsd:string"></poolId>'+
        ' <requestConfig xsi:type="xsd:string"></requestConfig>'+
     ' </callContext>'+
      '<publicName xsi:type="xsd:string">X1CALLDET</publicName>'+

      '  <inputXml xsi:type="xsd:string">'+
     '<![CDATA[<PARAM>'+
   '<FLD NAME="I_XROUTE" TYPE="Char">'+vrnum+'</FLD>'+
    '<FLD NAME="I_XFROMLOC" TYPE="Char">'+floctyp+'</FLD>'+
    '<FLD NAME="I_XTOLOC" TYPE="Char">'+tloctyp+'</FLD>'+
    '<FLD NAME="I_XLOCF" TYPE="Char">'+floc+'</FLD>'+
    '<FLD NAME="I_XLOCT" TYPE="Char">'+tloc+'</FLD>'+
   '</PARAM>]]>'+
   '</inputXml>'+
   '</wss:run>'+
'</soapenv:Body>'+
'</soapenv:Envelope>';



return new Promise((resolve, reject) => {

xmlhttp.onreadystatechange = (e) => {
      if (xmlhttp.readyState !== 4) {
        return;
      }
    if(xmlhttp.readyState == 4){
        if(xmlhttp.status== 200){
          // let object =  JSON.parse(xmlhttp.response);
          // console.log("response =",object);
          // return object;

            let responeData = xmlhttp.responseXML.getElementsByTagName('resultXml')[0].innerHTML;
            console.log("soap xample =",responeData);
            let extractxmldata = responeData.slice(9, responeData.length-3)
            console.log("soap xample extractxmldata=",extractxmldata);
          var xml = new XMLParser().parseFromString(extractxmldata);
       //  const completeResult = return xml;

          resolve (xml);

        }

    }
}


xmlhttp.setRequestHeader('Content-Type','text/html');

xmlhttp.setRequestHeader('SOAPAction','CAdxWebServiceXmlCC');

xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa("TMSWE" + ':' + "*Tbs@12345123"));

try
{
xmlhttp.send(src);
}catch(error){
    console.log(error);
}
  });
}

export async function ToAllocationSubmitData(vrnum) {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST','https://x3tms.tema-systems.com/soap-generic/syracuse/collaboration/syracuse/CAdxWebServiceXmlCC',true);

var src = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
'<soapenv:Header/>' +
'<soapenv:Body>' +
   '<wss:run soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<callContext xsi:type="wss:CAdxCallContext">' +
        ' <codeLang xsi:type="xsd:string">ENG</codeLang>'+
        '<poolAlias xsi:type="xsd:string">TMSNEW</poolAlias>'+
         '<poolId xsi:type="xsd:string"></poolId>'+
        ' <requestConfig xsi:type="xsd:string"></requestConfig>'+
     ' </callContext>'+
      '<publicName xsi:type="xsd:string">X1CPICALL</publicName>'+

      '  <inputXml xsi:type="xsd:string">'+
     '<![CDATA[<PARAM>'+
   '<FLD NAME="I_XPICKNUM" TYPE="Char">'+vrnum+'</FLD>'+
   '</PARAM>]]>'+
   '</inputXml>'+
   '</wss:run>'+
'</soapenv:Body>'+
'</soapenv:Envelope>';



return new Promise((resolve, reject) => {

xmlhttp.onreadystatechange = (e) => {
      if (xmlhttp.readyState !== 4) {
        return;
      }
    if(xmlhttp.readyState == 4){
        if(xmlhttp.status== 200){
          // let object =  JSON.parse(xmlhttp.response);
          // console.log("response =",object);
          // return object;

            let responeData = xmlhttp.responseXML.getElementsByTagName('resultXml')[0].innerHTML;
            console.log("soap xample =",responeData);
            let extractxmldata = responeData.slice(9, responeData.length-3)
            console.log("soap xample extractxmldata=",extractxmldata);
          var xml = new XMLParser().parseFromString(extractxmldata);
       //  const completeResult = return xml;

          resolve (xml);

        }

    }
}


xmlhttp.setRequestHeader('Content-Type','text/html');

xmlhttp.setRequestHeader('SOAPAction','CAdxWebServiceXmlCC');

xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa("TMSWE" + ':' + "*Tbs@12345123"));

try
{
xmlhttp.send(src);
}catch(error){
    console.log(error);
}
  });
}


export async function ToLotDetailsFetchData(prodnum, site , vrnum) {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST','https://x3tms.tema-systems.com/soap-generic/syracuse/collaboration/syracuse/CAdxWebServiceXmlCC',true);

var src = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
'<soapenv:Header/>' +
'<soapenv:Body>' +
   '<wss:run soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<callContext xsi:type="wss:CAdxCallContext">' +
        ' <codeLang xsi:type="xsd:string">ENG</codeLang>'+
        '<poolAlias xsi:type="xsd:string">TMSNEW</poolAlias>'+
         '<poolId xsi:type="xsd:string"></poolId>'+
        ' <requestConfig xsi:type="xsd:string"></requestConfig>'+
     ' </callContext>'+
      '<publicName xsi:type="xsd:string">X1CLOTDET</publicName>'+

      '  <inputXml xsi:type="xsd:string">'+
     '<![CDATA[<PARAM>'+
   '<FLD NAME="I_XFCY" TYPE="Char">'+site+'</FLD>'+
   '<FLD NAME="I_XITMREF" TYPE="Char">'+prodnum+'</FLD>'+
     '<FLD NAME="I_XROUTE" TYPE="Char">'+vrnum+'</FLD>'+
   '</PARAM>]]>'+
   '</inputXml>'+
   '</wss:run>'+
'</soapenv:Body>'+
'</soapenv:Envelope>';



return new Promise((resolve, reject) => {

xmlhttp.onreadystatechange = (e) => {
      if (xmlhttp.readyState !== 4) {
        return;
      }
    if(xmlhttp.readyState == 4){
        if(xmlhttp.status== 200){
          // let object =  JSON.parse(xmlhttp.response);
          // console.log("response =",object);
          // return object;

            let responeData = xmlhttp.responseXML.getElementsByTagName('resultXml')[0].innerHTML;
            console.log("soap xample =",responeData);
            let extractxmldata = responeData.slice(9, responeData.length-3)
            console.log("soap xample extractxmldata=",extractxmldata);
          var xml = new XMLParser().parseFromString(extractxmldata);
       //  const completeResult = return xml;

          resolve (xml);

        }

    }
}


xmlhttp.setRequestHeader('Content-Type','text/html');

xmlhttp.setRequestHeader('SOAPAction','CAdxWebServiceXmlCC');

xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa("TMSWE" + ':' + "*Tbs@12345123"));

try
{
xmlhttp.send(src);
}catch(error){
    console.log(error);
}
  });
}

export async function AllocatedDataByStaggingLocations(vrnum, fromloc, toloc, floc , tloc) {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST','https://x3tms.tema-systems.com/soap-generic/syracuse/collaboration/syracuse/CAdxWebServiceXmlCC',true);

var src = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
'<soapenv:Header/>' +
'<soapenv:Body>' +
   '<wss:run soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<callContext xsi:type="wss:CAdxCallContext">' +
        ' <codeLang xsi:type="xsd:string">ENG</codeLang>'+
        '<poolAlias xsi:type="xsd:string">TMSNEW</poolAlias>'+
         '<poolId xsi:type="xsd:string"></poolId>'+
        ' <requestConfig xsi:type="xsd:string"></requestConfig>'+
     ' </callContext>'+
      '<publicName xsi:type="xsd:string">X1CSTASTO</publicName>'+

      '  <inputXml xsi:type="xsd:string">'+
     '<![CDATA[<PARAM>'+
   '<FLD NAME="I_XROUTE" TYPE="Char">'+vrnum+'</FLD>'+
   '<FLD NAME="I_XFROMLOC" TYPE="Char">'+fromloc+'</FLD>'+
   '<FLD NAME="I_XTOLOC" TYPE="Char">'+toloc+'</FLD>'+
    '<FLD NAME="I_XLOCF" TYPE="Char">'+floc+'</FLD>'+
      '<FLD NAME="I_XLOCT" TYPE="Char">'+tloc+'</FLD>'+
   '</PARAM>]]>'+
   '</inputXml>'+
   '</wss:run>'+
'</soapenv:Body>'+
'</soapenv:Envelope>';



return new Promise((resolve, reject) => {

xmlhttp.onreadystatechange = (e) => {
      if (xmlhttp.readyState !== 4) {
        return;
      }
    if(xmlhttp.readyState == 4){
        if(xmlhttp.status== 200){
          // let object =  JSON.parse(xmlhttp.response);
          // console.log("response =",object);
          // return object;

            let responeData = xmlhttp.responseXML.getElementsByTagName('resultXml')[0].innerHTML;
            console.log("soap xample =",responeData);
            let extractxmldata = responeData.slice(9, responeData.length-3)
            console.log("soap xample extractxmldata=",extractxmldata);
          var xml = new XMLParser().parseFromString(extractxmldata);
       //  const completeResult = return xml;

          resolve (xml);

        }

    }
}


xmlhttp.setRequestHeader('Content-Type','text/html');

xmlhttp.setRequestHeader('SOAPAction','CAdxWebServiceXmlCC');

xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa("TMSWE" + ':' + "*Tbs@12345123"));

try
{
xmlhttp.send(src);
}catch(error){
    console.log(error);
}
  });
}

export async function ToStaggingLocationFetchData(site) {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST','https://x3tms.tema-systems.com/soap-generic/syracuse/collaboration/syracuse/CAdxWebServiceXmlCC',true);

var src = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
'<soapenv:Header/>' +
'<soapenv:Body>' +
   '<wss:run soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<callContext xsi:type="wss:CAdxCallContext">' +
        ' <codeLang xsi:type="xsd:string">ENG</codeLang>'+
        '<poolAlias xsi:type="xsd:string">TMSNEW</poolAlias>'+
         '<poolId xsi:type="xsd:string"></poolId>'+
        ' <requestConfig xsi:type="xsd:string"></requestConfig>'+
     ' </callContext>'+
      '<publicName xsi:type="xsd:string">X1CSTALOC</publicName>'+

      '  <inputXml xsi:type="xsd:string">'+
     '<![CDATA[<PARAM>'+
   '<FLD NAME="I_XFCY" TYPE="Char">'+site+'</FLD>'+


   '</PARAM>]]>'+
   '</inputXml>'+
   '</wss:run>'+
'</soapenv:Body>'+
'</soapenv:Envelope>';



return new Promise((resolve, reject) => {

xmlhttp.onreadystatechange = (e) => {
      if (xmlhttp.readyState !== 4) {
        return;
      }
    if(xmlhttp.readyState == 4){
        if(xmlhttp.status== 200){
          // let object =  JSON.parse(xmlhttp.response);
          // console.log("response =",object);
          // return object;

            let responeData = xmlhttp.responseXML.getElementsByTagName('resultXml')[0].innerHTML;
            console.log("soap xample =",responeData);
            let extractxmldata = responeData.slice(9, responeData.length-3)
            console.log("soap xample extractxmldata=",extractxmldata);
          var xml = new XMLParser().parseFromString(extractxmldata);
       //  const completeResult = return xml;

          resolve (xml);

        }

    }
}


xmlhttp.setRequestHeader('Content-Type','text/html');

xmlhttp.setRequestHeader('SOAPAction','CAdxWebServiceXmlCC');

xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa("TMSWE" + ':' + "*Tbs@12345123"));

try
{
xmlhttp.send(src);
}catch(error){
    console.log(error);
}
  });
}


export async function DeleteDocument(num, count) {

   console.log("at service num", num)
    console.log("at service count", count)
    let passeddata = '' ;
     for(let ii = 0; ii < count ; ii++ ) {
          let doc = num[ii].docnum
          let index1 = ii+1
          passeddata =   passeddata + '<LIN NUM="'+index1+'"> <FLD NAME="I_XPCKNUM" TYPE="Char">'+doc+'</FLD> </LIN>'
     }

console.log("at service - final passedData =", passeddata)


    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST','https://x3tms.tema-systems.com/soap-generic/syracuse/collaboration/syracuse/CAdxWebServiceXmlCC',true);

var src = '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://www.adonix.com/WSS" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">' +
'<soapenv:Header/>' +
'<soapenv:Body>' +
   '<wss:run soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<callContext xsi:type="wss:CAdxCallContext">' +
        ' <codeLang xsi:type="xsd:string">ENG</codeLang>'+
        '<poolAlias xsi:type="xsd:string">TMSNEW</poolAlias>'+
         '<poolId xsi:type="xsd:string"></poolId>'+
        ' <requestConfig xsi:type="xsd:string"></requestConfig>'+
     ' </callContext>'+
      '<publicName xsi:type="xsd:string">XPCKTCKDL</publicName>'+
      '  <inputXml xsi:type="xsd:string">'+
     '<![CDATA[<PARAM>'+
      '<TAB DIM="99" ID="GRP1" SIZE="1">'+ passeddata  +'</TAB>'+
   '</PARAM>]]>'+
   '</inputXml>'+
   '</wss:run>'+
'</soapenv:Body>'+
'</soapenv:Envelope>';



return new Promise((resolve, reject) => {

xmlhttp.onreadystatechange = (e) => {
      if (xmlhttp.readyState !== 4) {
        return;
      }
    if(xmlhttp.readyState == 4){
        if(xmlhttp.status== 200){
          // let object =  JSON.parse(xmlhttp.response);
          // console.log("response =",object);
          // return object;

            let responeData = xmlhttp.responseXML.getElementsByTagName('resultXml')[0].innerHTML;
            console.log("soap xample =",responeData);
            let extractxmldata = responeData.slice(9, responeData.length-3)
            console.log("soap xample extractxmldata=",extractxmldata);
          var xml = new XMLParser().parseFromString(extractxmldata);
       //  const completeResult = return xml;

          resolve (xml);

        }

    }

}


xmlhttp.setRequestHeader('Content-Type','text/html');

xmlhttp.setRequestHeader('SOAPAction','CAdxWebServiceXmlCC');

xmlhttp.setRequestHeader('Authorization', 'Basic ' + btoa("TMSWE" + ':' + "*Tbs@12345123"));

try
{
xmlhttp.send(src);
}catch(error){
    console.log(error);
}
  });

}


export async function fetchSitesByUser() {
  const user = JSON.parse(localStorage.getItem("authUser"));

  try {
    const response = await fetch(`${apiUrl}/api/v1/transport/usrsites?user=${user.username}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch user sites");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.log(error);
    return null; // optional, to indicate failure gracefully
  }
}


