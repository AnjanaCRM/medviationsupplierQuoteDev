import { useEffect, useState } from "react";
import axios from 'axios'
import CreateQuote from './components/CreateQuote';
import './App.css'
function App()
{
  const[requeststate,setRequestState]=useState([])
  const queryParams = new URLSearchParams(window.location.search);
  console.log('request Id:' + queryParams.get("requestId"));
  //console.log('Date Range From:'   + queryParams.get("FromDate"));
  //console.log('Date Range To :'    + queryParams.get("ToDate"));
  //console.log('Patient Name:'      + queryParams.get("PatientName"));
  //console.log('Patient Age:'       + queryParams.get("PatientAge"));
  //console.log('Patient Gender:'    + queryParams.get("PatientGender"));
  //console.log('Patient Weight:'    + queryParams.get("PatientWeight"));
  //console.log('Patient Condition:' + queryParams.get("PatientCondition"));
  let inputRequestId=queryParams.get("requestId");
  let inputSupplierId=queryParams.get("supplierId");
  let inputSupplierContactId=queryParams.get("supplierContactId");
  let supplierStatus=queryParams.get("supplierStatus");
  var params={};
  params.requestId=inputRequestId;  //"0068c00000pyb5iAAA";
  const API_URL="https://crmapay-developer-edition.na213.force.com/InteractPay/services/apexrest/MedviationAuthorization?methodType=GET&inputParams="+JSON.stringify(params);
  console.log(API_URL);
  console.log('Hello');
  //const instance=axios.create({baseUrl:API_URL})
  useEffect( ()=>
  {
    axios.get(API_URL).then((response)=>{
    console.log('Inside use Effect1234:'+ response.data )
    let dataResponse=response.data;
    dataResponse=JSON.parse(dataResponse.slice(1, dataResponse.length - 1))
    var dataReqArray = [];
    dataReqArray.push(dataResponse);
    console.log('DataArray:' + JSON.stringify(dataReqArray[0].oppdetails));
    let finalReq=[];
    finalReq=dataReqArray[0].oppdetails;
    console.log('Data Resp(final):' + JSON.stringify(finalReq));
    setRequestState(finalReq);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } )},[]);
  var divStyle = {
    padding:"5px"
  };
  return (
    <div className="App">
      <div className="App-banner">
        <img className="logo" src="https://raw.githubusercontent.com/ArjuNannSuresh/ACXS/main/image%20(1).png" alt="Logo"></img>
      </div>
      <div className="App-RequestInfo">
        {
          requeststate && requeststate.length>0 && requeststate.map((data, index) =>
          {
              return (
                     <>
                      <div className="requestinfo" key={index}>
                       <p className="AppRequestInfoBanner"> { requeststate ? data.Name : ""}</p>
                       <div className="requestLocation">
                       { requeststate ? data.OriginDesired__c : ""} &nbsp;&nbsp;
                           <span style={divStyle}> <img src="https://medviation-developer-edition.na213.force.com/s/sfsites/c/resource/medIcons/airLight.png" alt="medFlightIcon"
                                        className="med-flight-icon" /></span> &nbsp;&nbsp;
                           { requeststate ? data.DestinationDesired__c : ""}
                       </div>
                       <p>Patient: &nbsp;&nbsp;{ requeststate ? data.PatientName__c : ""} </p>
                       <p>Date Range :&nbsp;&nbsp;{ requeststate ? data.FromDate__c : ""}  &nbsp; &nbsp; <span style={{color:"white"}}>&#x2192;</span> &nbsp; &nbsp;{ requeststate ? data.ToDate__c  : ""} </p>
                       <p>Patient Gender:&nbsp;&nbsp;{ requeststate ? data.PatientGender__c : ""} </p>
                       <p>Patient Age:&nbsp;&nbsp;{requeststate ? data.PatientAge__c : ""}</p>
                       <p>Patient Weight:&nbsp;&nbsp;{requeststate ? data.PatientWeight__c : ""} &nbsp;lbs</p>
                       <p className="PatientCondition">Patient Condition:<br/>{requeststate ? data.PatientCondition__c : ""}</p>
                       </div>
                    </>
                    );
            })
          }
      </div>
      <div className="App-CreateQuote">
          <CreateQuote requestId={inputRequestId} SupplierId={inputSupplierId} SupplierContactId={inputSupplierContactId} supplierStatus={supplierStatus}></CreateQuote>
      </div>
      <div className="App-Footer">
      </div>
    </div>
  );
}
export default App;