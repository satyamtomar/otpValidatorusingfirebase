import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import {  RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";
import {authentication } from '../firebase'
const Login = () => {
    
    const [openmodal, setopenmodal] = useState(false);
    const [modalstateno, setmodalstateno] = useState(1);
    const [otp ,setOtp]=useState("");
    const [mobileNo,setMobileNo]=useState("");
    const toggle = () => {
        setopenmodal(false);
        setmodalstateno(1);
      };
      const ConfigureRecaptcha=async()=>{
          console.log("mdadf",mobileNo)
        window.recaptchaVerifier =await new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              
            }
          }, authentication);
          
      }
      const generateOtp=async(e)=>{
          e.preventDefault();
          await ConfigureRecaptcha();
          let appVerifier=window.recaptchaVerifier;
        
          let number="+91"+mobileNo;
          console.log("mobile is ",number)
          signInWithPhoneNumber(authentication, number, appVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            // ...
          }).catch((error) => {
            // Error; SMS not sent
            console.log(error)
            // ...
          });   
      }
      const verifyOtp=async ()=>{
        let confirmationResult=window.confirmationResult  ;

        confirmationResult.confirm(otp).then((result) => {
            // User signed in successfully.
            const user = result.user;
            console.log(user)
            // ...
          }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            console.log(error)
          });
      }
  return (
      <>
    <div>
    <h2>Login Form</h2>
    <label>Mobile</label>
       <input value={mobileNo} onChange={(e)=>{setMobileNo(e.target.value)}} required maxLength="10"
                                    onKeyPress={(event) => {
                                      if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                      }
                                    }} />
    <button onClick={(e)=>{generateOtp(e);}}>Generate Otp</button>
       <label>Otp</label>
       <input value={otp} onChange={(e)=>{setOtp(e.target.value)}} maxLength="6"
                                    onKeyPress={(event) => {
                                      if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                      }
                                    }}/>
                                    <button onClick={(e)=>{e.preventDefault();verifyOtp()}}>Verify Otp</button>
    </div>
    <div id="sign-in-button"></div>
    
    {/* <Modal isOpen={openmodal} toggle={toggle}>
 
    <ModalHeader toggle={toggle}>Login Using Otp</ModalHeader>
          <ModalBody>
          <label>Enter Mobile No</label>
          <input value={mobileNo} />
          
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>

    </Modal> */}
    </>
  )
}

export default Login