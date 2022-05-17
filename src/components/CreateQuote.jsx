// import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./CreateQuote.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Popup from "./Popup";

toast.configure();

function CreateQuote(props) {
  const [disable, setDisable] = React.useState(false);
  const [supplierStatus, setsupplierStatus] = React.useState(false);
  const [content, setcontent] = React.useState(false);

  useEffect(() => {
    console.log("props.linkStatus" + props.linkStatus);

    if (props.linkStatus == "true") {
      setDisable(true);
      console.log("setdisable");
    }
  }, []);
  const [form, setForm] = useState({
    AircraftType: "Jet",
    Price: 0.0,
    ProviderNotes: "",
    NoStops: 0,
    AddPassenger: 0,
    traveldate: "",
    DurationHour: "",
    DurationMin: "",
    MedicalCrew: "",
    GroundTransport: false,
    RequestId: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let inputParams = [];
    form.RequestId = props.requestId;
    form.SupplierId = props.SupplierId;
    form.SupplierContactId = props.SupplierContactId;
    form.paymentLinkId = props.paymentLinkId;
    if(!form.ExpirationHour){
      form.ExpirationHour='36';
    }
    console.log("Form Submit" + JSON.stringify(form));
    inputParams.push(form);
    console.log("Final Data:" + JSON.stringify(inputParams));
    const POST_URL =
      "http://developer-crmapay.cs214.force.com/InteractPay/services/apexrest/MedviationAuthorization?methodType=POST&inputParams=" +
      JSON.stringify(inputParams);
      console.log("URL:" + POST_URL);
    fetch(POST_URL, {
      method: "GET",
      headers: {
        mode: "cors",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        let status = JSON.stringify(response);
        console.log(" status-->" + status);

        if (status) {
          setDisable(true);
          if (props.supplierStatus == "Approved") {
            setsupplierStatus(true);
            setcontent(true);
            // toast.success('Your Quote is submitted succesfully and will be present to the Client', { position: toast.POSITION.TOP_CENTER });
          } else {
            setsupplierStatus(false);
            setcontent(true);

            // toast.success('Your Quote is submitted successfully. But, it can not be presented to the Client. Please sign-up to Medviation Platform to present your Quotes to the Client', { position: toast.POSITION.TOP_CENTER });
          }
        } else {
          toast.success("Please enter all fields", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((err) => {
        // toast.success(
        //   "Your Quote is submitted successfully. But, it can not be presented to the Client. Please sign-up to Medviation Platform to present your Quotes to the Client",
        //   { position: toast.POSITION.TOP_CENTER }
        // );
        console.log("err" + err);
      });
  };

  const onChange = (e) => {
    const { value, name, type, checked } = e.target;
    setForm((state) => ({
      ...state,
      [name]: type === "checkbox" ? checked : value,
    }));
    //form.ExpirationHour = "36";
  };

  return (
    <div>
      {content ? (
        <div class="message">
          <Popup trigger={supplierStatus}>
            <i
              class="fa fa-check-circle"
              style={{
                color: "#04AA6D",
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
                fontSize: "xx-large",
              }}
              aria-hidden="true"
            ></i>
            <p>Your Quote is submitted succesfully</p>
            <p>and will be presented to the Client.</p>
          </Popup>
          <Popup trigger={!supplierStatus}>
            <i
              class="fa fa-exclamation-triangle"
              style={{
                color: "orange",
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
                fontSize: "x-large",
              }}
              aria-hidden="true"
            ></i>
            <p>
              Your Quote is submitted successfully.But, it{" "}
              <bold style={{ fontWeight: "bold" }}>cannot</bold> be presented to
              the Client.{" "}
            </p>
            <p>
              <bold style={{ fontWeight: "bold" }}>
                Please sign-up to Medviation Platform
              </bold>{" "}
              to present your Quotes to the Client.
            </p>
          </Popup>
        </div>
      ) : (
        <>
          <div className="CreateQuote py-3 container">
            <form onSubmit={handleFormSubmit}>
              <div class="row mb-3 px-5">
                <div class="col-4 p-0">
                  <label>Price <span class="required">*</span></label>
                  {/* <abbr title="required" class="slds-required">*</abbr> */}
                </div>
                <div class="col-8 p-0">
                  <input
                    disabled={disable}
                    type="number"
                    class="form-control"
                    name="Price"
                    onChange={onChange}
                    value={form.Price}
                    min="0"
                  />
                </div>
              </div>
              <div class="row mb-3 alt-content px-5">
                <div class="col-4 p-0">
                  <label>Travel Date <span class="required">*</span></label>
                </div>
                <div class="col-8 p-0">
                  <input
                    disabled={disable}
                    type="datetime-local"
                    class="form-control"
                    name="traveldate"
                    onChange={onChange}
                    value={form.traveldate}
                  />
                </div>
              </div>
              <div class="row mb-3 px-5">
                <div class="col-4 p-0">
                  <label> Duration (hours) <span class="required">*</span></label>
                </div>
                <div class="col-8 p-0">
                  <select
                    disabled={disable}
                    name="DurationHour"
                    class="form-control"
                    onChange={onChange}
                    value={form.DurationHour}
                  >
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                    <option>21</option>
                    <option>22</option>
                    <option>23</option>
                  </select>
                </div>
              </div>
              <div class="row mb-3 alt-content px-5">
                <div class="col-4 p-0">
                  <label> Duration (minutes) <span class="required">*</span></label>
                </div>
                <div class="col-8 p-0">
                  <input
                    disabled={disable}
                    type="text"
                    name="durationmin"
                    class="form-control"
                    onChange={onChange}
                    value={form.durationmin}
                    min="0"
                  ></input>
                </div>
              </div>
              <div class="row mb-4  px-5">
                <div class="col-4 p-0">
                  <label> No of Legs <span class="required">*</span></label>
                </div>
                <div class="col-8 p-0">
                  <input
                    disabled={disable}
                    type="radio"
                    name="NoStops"
                    value="0"
                    onChange={onChange}
                  />
                  &nbsp;1 Legs &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    disabled={disable}
                    type="radio"
                    name="NoStops"
                    value="1"
                    onChange={onChange}
                  />
                  &nbsp;2 Legs&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    disabled={disable}
                    type="radio"
                    name="NoStops"
                    value="2"
                    onChange={onChange}
                  />
                  &nbsp;3 Legs&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    disabled={disable}
                    type="radio"
                    name="NoStops"
                    value="3"
                    onChange={onChange}
                  />
                  &nbsp;3+ Legs&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
              </div>

              <div class="row mb-4 alt-content px-5">
                <div class="col-4 p-0">
                  <label> Aircraft Type <span class="required">*</span></label>
                </div>
                <div class="col-8 p-0">
                  <div>
                    <input
                      disabled={disable}
                      type="radio"
                      name="AircraftType"
                      value="Jet"
                      onChange={onChange}
                    />&nbsp;
                    Jet &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                      disabled={disable}
                      type="radio"
                      name="AircraftType"
                      value="Turbo Prop"
                      onChange={onChange}
                    />&nbsp;
                    Turbo&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                      disabled={disable}
                      type="radio"
                      name="AircraftType"
                      value="Rotor"
                      onChange={onChange}
                    />&nbsp;
                    Prop
                  </div>
                </div>
              </div>
              <div class="row mb-4 px-5">
                <div class="col-4 p-0">
                  <label> Quote Expiration (hours) <span class="required">*</span></label>
                </div>
                <div class="col-8 p-0">
                  <input
                    disabled={disable}
                    type="radio"
                    class="form-check-input"
                    name="ExpirationHour"
                    value="12"
                    onChange={onChange}
                  />
                  &nbsp;12&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    disabled={disable}
                    type="radio"
                    class="form-check-input"
                    name="ExpirationHour"
                    value="24"
                    onChange={onChange}
                  />
                  &nbsp;24&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    disabled={disable}
                    type="radio"
                    class="form-check-input"
                    defaultChecked
                    name="ExpirationHour"
                    value="36"
                    onChange={onChange}
                  />
                  &nbsp;36&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    disabled={disable}
                    type="radio"
                    class="form-check-input"
                    name="ExpirationHour"
                    value="48"
                    onChange={onChange}
                  />
                  &nbsp;48&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    disabled={disable}
                    type="radio"
                    class="form-check-input"
                    name="ExpirationHour"
                    value="60"
                    onChange={onChange}
                  />
                  &nbsp;60&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    disabled={disable}
                    type="radio"
                    class="form-check-input"
                    name="ExpirationHour"
                    value="72"
                    onChange={onChange}
                  />
                  &nbsp;72&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    disabled={disable}
                    type="radio"
                    class="form-check-input"
                    name="ExpirationHour"
                    value="84"
                    onChange={onChange}
                  />
                  &nbsp;84&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    disabled={disable}
                    type="radio"
                    class="form-check-input"
                    name="ExpirationHour"
                    value="96"
                    onChange={onChange}
                  />
                  &nbsp;96&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <br />
                </div>
              </div>
              <div class="row mb-4 alt-content px-5">
                <div class="col-4 p-0">
                  <label> Additional Passenger <span class="required">*</span></label>
                </div>
                <div class="col-8 p-0">
                  <input
                    disabled={disable}
                    type="radio"
                    name="AddPassenger"
                    value="0"
                    class="form-check-input"
                    onChange={onChange}
                  />
                  &nbsp;No Additional Passengers &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    disabled={disable}
                    type="radio"
                    name="AddPassenger"
                    value="1"
                    class="form-check-input"
                    onChange={onChange}
                  />
                  &nbsp;1 Additional Passenger&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
              </div>
              <div class="row mb-4 px-5">
                <div class="col-4 p-0">
                  <label> Ground Transport <span class="required">*</span></label>
                </div>
                <div class="col-8 p-0">
                  {/* <input
                    disabled={disable}
                    type="checkbox"
                    class="form-check-input"
                    name="GroundTransport"
                    onChange={onChange}
                    value={form.GroundTransport}
                  ></input> */}
                  <input
                    disabled={disable}
                    type="radio"
                    name="GroundTransport"
                    value="false"
                    defaultChecked
                    class="form-check-input"
                    onChange={onChange}    
                  />
                  &nbsp;Not included&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    disabled={disable}
                    type="radio"
                    name="GroundTransport"
                    value="true"
                    class="form-check-input"
                    onChange={onChange}    
                  />
                  &nbsp;Included&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                </div>
              </div>
              <div class="row mb-4 alt-content px-5">
                <div class="col-4 p-0">
                  <label> Medical Staff <span class="required">*</span></label>
                </div>
                <div class="col-8 p-0">
                  <div>
                    <input
                      disabled={disable}
                      type="radio"
                      name="MedicalCrew"
                      class="form-check-input"
                      value="RN_RN"
                      onChange={onChange}
                    />
                    &nbsp;RN & RN &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                      disabled={disable}
                      type="radio"
                      name="MedicalCrew"
                      class="form-check-input"
                      value="RN_RT"
                      onChange={onChange}
                    />
                    &nbsp;RN & RT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                      disabled={disable}
                      type="radio"
                      name="MedicalCrew"
                      class="form-check-input"
                      value="RN_Physician"
                      onChange={onChange}
                    />
                    &nbsp;RN & Physician&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                      disabled={disable}
                      type="radio"
                      name="MedicalCrew"
                      class="form-check-input"
                      value="RN_Paramedic"
                      onChange={onChange}
                    />
                    &nbsp;RN & Paramedic&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </div>
                </div>
              </div>
              <div class="row mb-4 px-5">
                <div class="col-4 p-0">
                  <label> Provider Notes</label>
                </div>
                <div class="col-8 p-0">
                  <textarea
                    name="ProviderNotes"
                    onChange={onChange}
                    class="form-control"
                    disabled={disable}
                    value={form.ProviderNotes}
                  ></textarea>
                </div>
              </div>

              <div>
                <button className="CreateQuoteButton" disabled={disable}>
                  Create Quote
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
export default CreateQuote;
