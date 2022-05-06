import React, { useEffect, useState } from "react";
import axios from 'axios'
import CreateQuote from './components/CreateQuote';
import './App.css'
import Popup from './components/Popup';



function App() {
  const [content, setcontent] = React.useState(false);
  const [expiredLink, setexpiredLink] = React.useState(false);
  const [requeststate, setRequestState] = useState([])
  const [paymentstate, setPaymentState] = useState([])
  const [linkStatus, setlinkStatus] = React.useState(false);

  const queryParams = new URLSearchParams(window.location.search);
  console.log('request Id:' + queryParams.get("requestId"));
  let inputRequestId = queryParams.get("requestId");
  let inputSupplierId = queryParams.get("supplierId");
  let inputSupplierContactId = queryParams.get("supplierContactId");
  let supplierStatus = queryParams.get("supplierStatus");
  let linkId = queryParams.get("linkId");

  var params = {};
  params.requestId = inputRequestId;
  params.linkId = linkId;  

  const API_URL = "https://crmapay-developer-edition.na213.force.com/InteractPay/services/apexrest/MedviationAuthorization?methodType=GET&inputParams=" + JSON.stringify(params);
  console.log(API_URL);
  
  useEffect(() => {
    axios.get(API_URL).then((response) => {
      console.log('Inside use Effect1234:' + response.data)
      let dataResponse = response.data;
      console.log('DataArray:1' + JSON.stringify(dataResponse));

      dataResponse = JSON.parse(dataResponse.slice(1, dataResponse.length - 1))
      var dataReqArray = [];
      dataReqArray.push(dataResponse);
      console.log('DataArray:1' + JSON.stringify(dataReqArray[0]));
      console.log('DataArray:' + JSON.stringify(dataReqArray[0].oppdetails));
      let finalReq = [];
      finalReq = dataReqArray[0].oppdetails;
      let paymentLink = [];
      paymentLink = dataReqArray[0].paymentdetails[0].Id;
      let createdDate = [];
      createdDate = dataReqArray[0].paymentdetails[0].CreatedDate;
      let linkStatusNew1 = [];
      linkStatusNew1 = dataReqArray[0].paymentdetails[0].Active__c;
      console.log('Data linkStatus(final):' + linkStatusNew1);

      setPaymentState(paymentLink);
      setRequestState(finalReq);

      let date = new Date(Date.parse(createdDate));
      var addedDate = date.setHours(date.getHours() + 36);
      const current = new Date();
      var d1 = new Date(addedDate);
      var d2 = new Date(current);
      var timeleft = d1.getTime() - d2.getTime();
      console.log("timeleft---->" + timeleft);

      var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
      var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
      console.log(days + ' Day' + hours + ' Hr' + minutes + ' Min' + seconds + ' Sec');
      if (days <= 0 && hours <= 0) {
        console.log('days');
        console.log('hours');
        if (expiredLink == false) {
          setexpiredLink(true)
          setcontent(true)
        }
      }
      else if (linkStatusNew1 == false) {
        console.log('entered');
        setlinkStatus(true);
        setcontent(true);
      }
      console.log('linkStatusNew1' + linkStatusNew1);
      console.log('setexpiredLink' + expiredLink);
      console.log('setlinkStatus' + linkStatus);
      console.log('content' + content);
    }
    )
  }, []);
  return (
    <div className="App">
      <nav class="navbar navbar-light bg-light fixed-top">
        <div class="container">
          <a class="navbar-brand" href="https://medviation.com"><img src="https://medviation.com/img/LT-navy-blue.svg" /></a>
        </div>
      </nav>
      {content ? (
        <div class="message">
          <Popup trigger={expiredLink}>
            <i class="fa fa-exclamation-triangle" style={{ color: 'orange', display: 'flex', justifyContent: 'center', marginBottom: '10px', fontSize: 'x-large' }} aria-hidden="true"></i>
            <h4>Oops, this link is expired.</h4>
            <p>This URL is not valid anymore.</p>
          </Popup>
          <Popup trigger={linkStatus}>
            <i class="fa fa-exclamation-triangle" style={{ color: 'orange', display: 'flex', justifyContent: 'center', marginBottom: '10px', fontSize: 'x-large' }} aria-hidden="true"></i>
            <p>This Link is already used for Quote Submission.</p>
            <p>You cannot submit another Quote.</p>
          </Popup>
        </div>

      ) : (
        <><div class="container">
          <div className="App-RequestInfo">
            {
              requeststate && requeststate.length > 0 && requeststate.map((data, index) => {
                return (
                  <>
                    <div key={index}>
                      <p className="AppRequestInfoBanner bg-light p-2 text-center " style={{ color: '#0077B6', fontWeight: 'bold' }}> {requeststate ? data.Name : ""}</p>
                      <div className="requestinfo py-2">
                        <div class="row  text-light pb-3  px-5">
                          <div class="col-5" style={{ color: '#485a6f', fontWeight: 'bold' }}>
                            <i class="fa fa-map-marker me-lg-3" aria-hidden="true"></i>{requeststate ? data.OriginDesired__c : ""}
                          </div>
                          <div class="col-2">
                            &#8594;
                          </div>
                          <div class="col-5 text-end" style={{ color: '#485a6f', fontWeight: 'bold' }}>
                            {requeststate ? data.DestinationDesired__c : ""}
                          </div>
                        </div>
                        <div class="row  text-light pb-3  px-5">
                          <div class="col-6" style={{ color: '#485a6f' }}>
                            <i class="fa fa-calendar-o me-lg-3" aria-hidden="true"></i>{requeststate ? data.FromDate__c : ""}
                          </div>
                          <div class="col-6 text-end" style={{ color: '#485a6f' }}>
                            <i class="fa fa-calendar-o me-lg-3" aria-hidden="true"></i>{requeststate ? data.ToDate__c : ""}
                          </div>
                        </div>
                        <p class=' alt-bg  px-5' style={{ color: '#485a6f' }}><i class="fa fa-transgender me-lg-3" aria-hidden="true"></i>Patient Gender:&nbsp;&nbsp;{requeststate ? data.PatientGender__c : ""} </p>
                        <p class=' px-5' style={{ color: '#485a6f' }}><i class="fa fa-calendar me-lg-3" aria-hidden="true"></i>Patient Age:&nbsp;&nbsp;{requeststate ? data.PatientAge__c : ""}</p>
                        <p class=' alt-bg  px-5' style={{ color: '#485a6f' }}><i class="fa fa-cube me-lg-3" aria-hidden="true"></i>Patient Weight:&nbsp;&nbsp;{requeststate ? data.PatientWeight__c : ""} &nbsp;lbs</p>
                        <p className="PatientCondition   px-5" style={{ color: '#485a6f' }}><i class="fa fa-wheelchair-alt me-lg-3" aria-hidden="true"></i>Patient Condition:{requeststate ? data.PatientCondition__c : ""}</p>
                      </div>
                    </div>
                  </>
                );
              })
            }
          </div>
          <div className="App-CreateQuote">
            <CreateQuote requestId={inputRequestId} SupplierId={inputSupplierId} SupplierContactId={inputSupplierContactId} supplierStatus={supplierStatus} paymentLinkId={paymentstate} linkStatus={linkStatus}></CreateQuote>
          </div>
          <div className="App-Footer">
          </div>
        </div></>
      )
      }
    </div>
  );
}

export default App;