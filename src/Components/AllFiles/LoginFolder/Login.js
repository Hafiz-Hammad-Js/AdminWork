import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



function Login() {

    const [email, setEmail] = useState()
    const [password, setpassword] = useState()

    const navigation = useNavigate()

    async function postLogin() {

        if (!email) {
            alert("please enter your email ")
        }
        else if (!password) {
            alert("enter your password")
        }
        else {

            try {
                const response = await fetch("https://protfoliosever-fscknvyj.b4a.run/api/Auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                });

                const data = await response.json();
                console.log(data)
                const token = data.token;

                if (!token) {
                    alert("Invalid credentials!");
                    return; // Agar token nahi mila, to further execution ko ruk jana chahiye
                }

                // Token ko localStorage mein save karna
                localStorage.setItem('token', token);

                alert("You're Logged in, Brother!");
                navigation("/")

            } catch (error) {
                console.log(error);
            }
        }
    }



    return <>
        <div className="container my-5">
         
          

            <section class="vh-100 gradient-custom">
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div class="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                                <div class="card-body p-5 text-center">

                                    <div class="mb-md-5 mt-md-4 pb-5">

                                        <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                                        <p class="text-white-50 mb-5">Please enter your login and password!</p>

                                        <div data-mdb-input-init class="form-outline form-white mb-4">
                                            <input type="email" id="typeEmailX" class="form-control form-control-lg" onChange={(e) => setEmail(e.target.value)} />
                                            <label class="form-label" for="typeEmailX">Email</label>
                                        </div>

                                        <div data-mdb-input-init class="form-outline form-white mb-4">
                                            <input type="password" id="typePasswordX" class="form-control form-control-lg" onChange={(e) => setpassword(e.target.value)} />
                                            <label class="form-label" for="typePasswordX">Password</label>
                                        </div>

                                        <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>

                                        <button onClick={postLogin} data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-light btn-lg px-5" type="submit">Login</button>

                                        <div class="d-flex justify-content-center text-center mt-4 pt-1">
                                            <a href="#!" class="text-white"><i class="fab fa-facebook-f fa-lg"></i></a>
                                            <a href="#!" class="text-white"><i class="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                                            <a href="#!" class="text-white"><i class="fab fa-google fa-lg"></i></a>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>



    </>
}

export default Login;