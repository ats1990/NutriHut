import React, { useContext, useEffect } from "react"
import { AuthGoogleContext, AuthGoogleProvider } from "../../../contexts/authGoogle"
import { SiGoogle } from "react-icons/si";
import Footer from "../../../components/Footer";
import { useState } from "react";
import {Link, Navigate, useNavigate} from 'react-router-dom'
import Input from "../../../components/Input";
import { db, auth } from "../../../services/firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,  } from "firebase/auth";
import {doc, setDoc} from 'firebase/firestore'
import {toast} from "react-hot-toast";
import VerifyErrorCode from "../../../errors/firebaseErrors"
import userRegistration from '../../../assets/logo.jpg'
import professionalRegistration from '../../../assets/logo.jpg'


export default function Registration() {

        const navigate = useNavigate()
        const {signInGoogle} = useContext(AuthGoogleContext)
        const [error, setError] = useState(false)
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const [repeatPassword, setRepeatPassword] = useState("")
        const [title, setTitle] = useState('Usuário')
        const [professional, setProfessional ] = useState(sessionStorage.getItem("@Land:status")==='true')
        const [condition, setCondition] = useState()




        async function sendToLogin(){
            navigate ('/login')
        }

        async function registerRole(uid) {
            const status = sessionStorage.getItem("@Land:status")
            console.log(email, status)
            const info = await setDoc(doc(db, "Users", uid),{
                email: email,
                professional: status,
                formCompleted:false,
                
            })
        }

        function setSession(){
          if(professional===null){
            return (setProfessional(false))
          }
          if(professional){
            setTitle('Usuário')
            setProfessional(false)
            sessionStorage.setItem("@Land:status", 'false')
          }else{
            setTitle('Nutricionista')
            setProfessional(true)
            sessionStorage.setItem("@Land:status", 'true')
          }
      }
      

      useEffect(() => {
        if(professional){
          setTitle('Nutricionista')
        }
        
        
        
    }, [professional, title])
    
        async function handleRegistration(e){
            e.preventDefault()
            if(password != repeatPassword){
                setError('As senhas não estão iguais')
                toast.error('As senhas não estão iguais')
            }else{
                createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    registerRole(user.uid)
                    toast.success('Usuário registrado com sucesso')
                    navigate ('/login')
                })
                .catch((error) => {
                    const errorCode = error.code;
                let errorMessage = VerifyErrorCode(errorCode);
                    if (errorMessage == null) {
                        errorMessage = error.message;
                        toast.error(errorCode,':',errorMessage)
                    }
                    toast.error(errorMessage)
            });

            }            
        }  

        return (
          <>
            <section className="">
              <div className="py-5 my-5 container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-md-9 col-lg-6 col-xl-5">
                    
                    <img 
                    
                      src= {`${professional ?  professionalRegistration  : userRegistration }`}
                      className="img-fluid w-75"
                      alt="Sample image"
                    />
                  </div>
                  <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <form onSubmit={handleRegistration}>
                    <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                            {/* <p className="lead fw-normal mb-0 me-3">Registro de paciente</p> */}
                            <h2>OLÁ {title.toUpperCase()}</h2>
                            
                             
                        </div>
                        <div className="divider d-flex align-items-center my-4" >

                        <div className="d-flex justify-content-end align-items-center">
                        <a onClick={() => {setSession()}} className="link-access text-body">
                        {professional  ? 'Registrar como Usuário ': 'Registrar como Nutricionista' } 
                        </a>
                      </div>
                        </div>
                      

                      {/* <!-- Email input --> */}
                      <div className="row">
                        <Input
                          type={"text"}
                          typeForm={"form-control"}
                          setClassCol={"col-sm"}
                          value={email}
                          setValue={setEmail}
                          label={"Email"}
                        />
                      </div>

                      <div className="row">
                        <Input
                          type={"password"}
                          typeForm={"form-control"}
                          setClassCol={"col-sm"}
                          value={password}
                          setValue={setPassword}
                          label={"Senha"}
                        />
                      </div>
                      <div className="row">
                        <Input
                          type={"password"}
                          typeForm={"form-control"}
                          setClassCol={"col-sm"}
                          value={repeatPassword}
                          setValue={setRepeatPassword}
                          label={"Repetir Senha"}
                        />
                      </div>

                      <div className="d-flex justify-content-end align-items-center">
                        <a onClick={() => {sendToLogin()}} className="link-access text-body">
                          Já sou cadastrado
                        </a>
                      </div>

                      <div className="text-center text-lg-start mt-4 pt-2">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                          style={{
                            paddingLeft: "2.5rem",
                            paddingRight: "2.5rem",
                          }}
                        >
                          Cadastrar
                        </button>
                        {error && (
                          <p className="small fw-bold mt-2 pt-1 mb-0">
                            {error}{" "}
                          </p>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              
            <Footer />
             
            </section>
          </>
        );
}
