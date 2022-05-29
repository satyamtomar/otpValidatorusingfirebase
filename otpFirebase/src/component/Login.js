import React, { useState,useRef } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import {  RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";
import {auth } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  let ref=useRef(null);
  let recaptchaWrapperRef ;

    const [openmodal, setopenmodal] = useState(false);
    const [modalStateNo, setModalStateNo] = useState(1);
    const [otp ,setOtp]=useState("");
    const [mobileNo,setMobileNo]=useState("");
    const [otpModal,setOtpModal]=useState(false);
    const toggle = () => {
        setopenmodal(false);
        setModalStateNo(1);
      };
      
      const ConfigureRecaptcha=async()=>{
          console.log("mdadf",mobileNo)
        window.recaptchaVerifier =await new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              
            }
          }, auth);
          
      }
      // const generateOtp=async(e)=>{
      //     e.preventDefault();
      //     await ConfigureRecaptcha();
      //     let appVerifier=window.recaptchaVerifier;
        
      //     let number="+91"+mobileNo;
      //     console.log("mobile is ",number)
      //     signInWithPhoneNumber(authentication, number, appVerifier)
      //     .then((confirmationResult) => {
      //       // SMS sent. Prompt user to type the code from the message, then sign the
      //       // user in with confirmationResult.confirm(code).
      //       window.confirmationResult = confirmationResult;
            
      //       // ...
      //     }).catch((error) => {
      //       // Error; SMS not sent
      //       console.log(error)
      //       // alert("Otp you have entered is  wrong kindly re-enter the correct otp");
      //       // ...
      //     });   
      // }
      const generateOtpUsingFirebase = async (e) => {

        e.preventDefault();
       
        if (recaptchaWrapperRef) {
          recaptchaWrapperRef.innerHTML = `<div id="sign-in-button"></div>`
        }
       if(mobileNo.length<10||mobileNo.length>10){
          toast('Phone Number Invalid')
          return;
       }
          await ConfigureRecaptcha();
        let appVerifier = window.recaptchaVerifier;
        console.log(appVerifier, "appverifier")
        let number = "+91" + mobileNo;
        console.log("mobile is ", number)
        signInWithPhoneNumber(auth, number, appVerifier)
          .then((confirmationResult) => {
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            recaptchaWrapperRef.innerHTML = `<div id="sign-in-button"></div>`
            appVerifier.clear();
            // window.recaptchaVerifier=null;
            if(modalStateNo===1)
            setModalStateNo(2);
            setOtpModal(true);
            setopenmodal(false);
            toast("OTP sent successfully");
            // ...
          }).catch((error) => {
            // Error; SMS not sent
            // window.recaptchaVerifier=null;
            console.log(error, 'firebasegenerateotperror')
            recaptchaWrapperRef.innerHTML = `<div id="sign-in-button"></div>`
            appVerifier.clear();
            toast("INVALID Mobile Number")
            // alert("Otp you have entered is  wrong kindly re-enter the correct otp");
            // ...
          });
      }
      const verifyOtp=async ()=>{
        let confirmationResult=window.confirmationResult  ;

        confirmationResult.confirm(otp).then((result) => {
            // User signed in successfully.
            const user = result.user;
            console.log(user)
            setOtpModal(false);
            setModalStateNo(1);
            toast('Your OTP verification was successful');
           
            // ...
          }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            console.log(error)
            toast("Otp you have entered is  wrong kindly re-enter the correct otp");
        
          });
      }
  return (
      <>
      <ToastContainer/>
    <div>
    <div className="row mt-4">
    <div className="d-flex justify-content-center">    <h2 className="">   Login Form
  </h2>
    </div>
</div>

   <div className="d-flex justify-content-center "><button onClick={()=>{setopenmodal(true)}} className=" bg-dark text-light mt-4">Click on me to Login</button></div>
    
    {/* <label>Mobile</label>
       <input value={mobileNo} onChange={(e)=>{setMobileNo(e.target.value)}} required maxLength="10" minLength="10"
                                    onKeyPress={(event) => {
                                      if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                      }
                                    }} />
    <button onClick={(e)=>{generateOtp(e);}}>Generate Otp</button>
       <label>Otp</label>
       <input value={otp} onChange={(e)=>{setOtp(e.target.value)}} maxLength="6" minLength="6"
                                    onKeyPress={(event) => {
                                      if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                      }
                                    }}/>
                                    <button onClick={(e)=>{e.preventDefault();verifyOtp()}}>Verify Otp</button> */}
    </div>
    <div id="recaptcha-container" ref={ref => recaptchaWrapperRef = ref}>
                <div id="sign-in-button"></div>
             </div>
    {/* {modalStateNo==1?  <Modal isOpen={openmodal} toggle={toggle} className="container">
 
 <ModalHeader toggle={()=>toggle()}>Login Using Otp</ModalHeader>
      <ModalBody>
       <label>Enter Mobile No</label>
       <input value={mobileNo} onChange={(e)=>{setMobileNo(e.target.value)}} required maxLength="10" minLength="10"
                                 onKeyPress={(event) => {
                                   if (!/[0-9]/.test(event.key)) {
                                     event.preventDefault();
                                   }
                                 }} />
       </ModalBody>
       <ModalFooter>
         <Button color="primary" onClick={(e)=>{generateOtp(e);setModalStateNo(2);setOtpModal(true)}}>Generate Otp</Button>{' '}
         <Button color="secondary" onClick={toggle}>Cancel</Button>
       </ModalFooter>

 </Modal> :""}   
   */}
    {/* {modalStateNo==2?  <Modal isOpen={otpModal} toggle={()=>{setOtpModal(false);setModalStateNo(1);}} className="container">
 
 <ModalHeader toggle={()=>{setOtpModal(false);setModalStateNo(1);}}>Login Using Otp</ModalHeader>
       <ModalBody>
       <label>Enter OTP</label>
       <input value={otp} onChange={(e)=>{setOtp(e.target.value)}} required maxLength="6" minLength="6"
                                 onKeyPress={(event) => {
                                   if (!/[0-9]/.test(event.key)) {
                                     event.preventDefault();
                                   }
                                 }} />
       </ModalBody>
       <ModalFooter>
         <Button color="primary" onClick={(e)=>{e.preventDefault();verifyOtp();}}>Generate Otp</Button>{' '}
         <Button color="secondary" onClick={()=>{setOtpModal(false);setModalStateNo(1);}}>Cancel</Button>
       </ModalFooter>

 </Modal> :""} */}
 {modalStateNo==1?
 <Modal isOpen={openmodal} toggle={toggle} className="modal-dialog-centered">
 <div class='card'>
  <div class='header'>
    Login Using Otp
  </div>
   <div class='content'>
   <label>Enter Mobile No</label>
       <input value={mobileNo} onChange={(e)=>{setMobileNo(e.target.value)}} required maxLength="10" minLength="10"
                                 onKeyPress={(event) => {
                                   if (!/[0-9]/.test(event.key)) {
                                     event.preventDefault();
                                   }
                                 }} />
  </div>
  <div class='actions'>
    <a class='nah' onClick={(e)=>{generateOtpUsingFirebase(e);}}>Get Otp</a>
    <a onClick={toggle}>Cancel</a>
  </div>
</div>
 
 
 </Modal>
 :""}
 {modalStateNo==2?
 <Modal isOpen={otpModal} toggle={()=>{setOtpModal(false);setModalStateNo(1);}} className="container">
 
 <ModalHeader toggle={()=>{setOtpModal(false);setModalStateNo(1);}}>Login Using Otp</ModalHeader>
       <ModalBody>
       <label>Enter OTP</label>
       <input value={otp} onChange={(e)=>{setOtp(e.target.value)}} required maxLength="6" minLength="6"
                                 onKeyPress={(event) => {
                                   if (!/[0-9]/.test(event.key)) {
                                     event.preventDefault();
                                   }
                                 }} />
       </ModalBody>
       <ModalFooter>
         <Button color="primary" onClick={(e)=>{e.preventDefault();verifyOtp();}}>Confirm Otp</Button>{' '}
         <Button color="secondary" onClick={(e)=>{generateOtpUsingFirebase(e)}}>Resend Otp</Button>
       </ModalFooter>

 </Modal>

 :""}
    </>
  )
}

export default Login