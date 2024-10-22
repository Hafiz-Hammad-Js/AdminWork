import React, { useState, useEffect } from "react";
import { multipleImageUrls } from "../../Config/Firebase";
import './Certificate.css'


function CertificateAdmin() {

    const [coachingName, setCoachingName] = useState()
    const [coachingLogo, setCoachingLogo] = useState()
    const [courseName, setCourseName] = useState()
    const [pdfFile, setPdfFile] = useState()



    const [certificateData, setCertificateData] = useState({ dataFind: [] })


    async function uploadCertificateData() {
        if (!coachingLogo || !courseName || !coachingName) {
            alert("please enter all inputs")
        }
        else {
            let images = []
            if (coachingLogo) {
                images.push(coachingLogo)
            }
            if (pdfFile) {
                images.push(pdfFile)
            }
            const urls = await multipleImageUrls({ images })
            console.log(urls)

            const logo = urls[0] || ""
            const pdf = urls[1] || ""

            const certificatePostApi = await fetch("https://protfoliosever-fscknvyj.b4a.run/api/Certificate/CertificatePostWork", {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify({
                    coachingName,
                    courseName,
                    coachingLogo: logo,
                    pdfFile: pdf,
                })
            })
            const serverResponse = await certificatePostApi.json()
            console.log(serverResponse)
            alert(serverResponse.message)
        }

    }

    async function certificateGetData() {
        const certificateGetApi = await fetch("https://protfoliosever-fscknvyj.b4a.run/api/Certificate/CertificateGetWork")
        const serverResponse = await certificateGetApi.json()
        console.log(serverResponse)
        setCertificateData(serverResponse)
    }

    useEffect(() => {
        certificateGetData()
    }, [])

    async function certificateDataDEL(id) {

        const DelApi = await fetch(`https://protfoliosever-fscknvyj.b4a.run/api/Certificate/${id}`, {
            method: "DELETE",
        })
        const serverResponse = await DelApi.json()
        console.log(serverResponse)
        alert(serverResponse.message)
        window.location.reload()
    }

    async function certificateUpdate(id) {
        let images = []
        if (coachingLogo) {
            images.push(coachingLogo)
        }
        if (pdfFile) {
            images.push(pdfFile)
        }
        const urls = await multipleImageUrls({ images })
        console.log(urls)

        const logo = urls[0] || ""
        const pdf = urls[1] || ""

        const certifiacteUpdateApi = await fetch(`https://protfoliosever-fscknvyj.b4a.run/api/Certificate/${id}`, {
            method: "PUT",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify({
                coachingName,
                courseName,
                coachingLogo: logo,
                pdfFile: pdf
            })
        })
        const serverResponse = await certifiacteUpdateApi.json()
        console.log(serverResponse)
        alert(serverResponse.message)
    }

    ; // Initialize with one input



    return <>

        <div className="container certificate-parent">


            <div className="exper-parent-upload">
                <div>
                    <div className="form0upload-woork">
                        <h1>Upload Form</h1>
                    </div>

                    <div className="cv-about-Img-parent">
                        <label className="cv-about-Img-child" for="exper-logo">Upload PDF FILE</label>
                        <input id="exper-logo" className="inpuu" onChange={(e) => setPdfFile(e.target.files[0])} type="file" />
                    </div>

                    <div className="cv-about-Img-parent">
                        <label className="cv-about-Img-child" for="experWorkSkill">Upload Coaching logo</label>
                        <input id="experWorkSkill" className="inpuu" onChange={(e) => setCoachingLogo(e.target.files[0])} type="file" />
                    </div>

                    <div>
                        <label className="Img-child">Coaching Name</label>
                        <input className="inpu-work" onChange={(e) => setCoachingName(e.target.value)} type="text" />

                    </div>
                    <div>

                        <label className="Img-child">Course Name</label>
                        <input className="inpu-work" onChange={(e) => setCourseName(e.target.value)} type="text" />

                    </div>

                    <div className="btnn-parent-about">
                        <button onClick={uploadCertificateData}>Upload Certificate</button>
                    </div>

                </div>

            </div>

            {/* kjkj */}



        </div>


        {certificateData.dataFind.map((item) => <>
            <div className='container certparent'>
                <div className="img-parent-hon">
                    <img src={item.coachingLogo} />
                </div>
                <h2>{item.coachingName}</h2>
                <h1>{item.courseName}</h1>
                <button onClick={() => certificateDataDEL(item._id)}>DELETE</button>
            </div>
        </>)}




        <div>

        </div>

    </>
}

export default CertificateAdmin;