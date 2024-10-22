import React, { useState, useEffect } from "react";
import './contact.css'


function ContactUS() {

    const [contactData, setContact] = useState([])

    async function graphicDataGet() {
        try {
            const GetApi = await fetch("https://protfoliosever-fscknvyj.b4a.run/api/Contact/ContactGetWork")
            const serverResponse = await GetApi.json()
            console.log(serverResponse)
            setContact(serverResponse.dataFind)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        graphicDataGet();  // Component mount hone par API call

    }, []);

    async function response(id) {
        const DelApi = await fetch(`https://protfoliosever-fscknvyj.b4a.run/api/Contact/${id}`, {
            method: "DELETE",
        })
        const serverResponse = await DelApi.json()
        console.log(serverResponse)
        alert(serverResponse.message)
        window.location.reload()
    }


    return <>
        <div className="contact container">

            <div className="lenghtWork mt-5">
                <h1>(message here.. {contactData.length} )</h1>
            </div>


            {contactData.map((item) => <>
                <div className="parentTable">
                    <table>
                        <tr>
                            <th className="sender">Sender Name :</th>
                            <td className="rcver">: {item.Name}</td>
                        </tr>
                        <tr>
                            <th className="sender">Sender Email :</th>
                            <td className="rcver">: {item.Email}</td>
                        </tr>
                        <tr>
                            <th className="sender" >Sender Number :</th>
                            <td className="rcver">: {item.Mobile}</td>
                        </tr>
                        <tr>
                            <th className="sender">Sender Subject :</th>
                            <td className="rcver">: {item.Subject}</td>
                        </tr>
                        <tr>
                            <th className="sender">Sender Message :</th>
                            <td className="rcver">: {item.Message}</td>
                        </tr>
                    </table>

                    <button className="bbtn-web" onClick={() => response(item._id)}>OK...</button>
                </div>
            </>)}


        </div>
    </>
}

export default ContactUS; 