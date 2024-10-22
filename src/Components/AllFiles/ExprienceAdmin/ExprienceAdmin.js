import React, { useState, useEffect } from "react";
import { multipleImageUrls } from "../../Config/Firebase";
import './Exper.css'


function ExprienceAdmin() {

    const [logoImg, setLogoImg] = useState()
    const [skillImg, setSkillImg] = useState()
    const [companyName, setCompanyName] = useState()
    const [skillName, setSkillName] = useState()
    const [exprience, setExprience] = useState()
    const [cahekke, setcahekke] = useState()

    const [exprienceData, setExperienceData] = useState({ dataFind: [] })

    async function expriencePostWork() {
        if (!logoImg || !skillImg || !companyName || !skillName || !exprience) {
            alert("Please enter all Inputs")
        } else {
            try {
                let images = [logoImg, skillImg]
                let urls = await multipleImageUrls({ images })

                const expriencePostApi = await fetch("https://protfoliosever-fscknvyj.b4a.run/api/Exprience/ExpriencePostWork", {
                    method: "POST",
                    headers: {
                        "content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        logoImg: urls[0],
                        skillImg: urls[1],
                        companyName,
                        skillName,
                        exprience
                    })
                })
                const serverResponse = await expriencePostApi.json()
                console.log(serverResponse)
                alert(serverResponse.message)
            } catch (error) {
                console.error(error)
            }
        }
    }

    async function exprienceDataGet() {
        try {
            const exprienceGetApi = await fetch("https://protfoliosever-fscknvyj.b4a.run/api/Exprience/ExprienceGetWork")
            const serverResponse = await exprienceGetApi.json()
            console.log(serverResponse)
            setExperienceData(serverResponse)


        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        exprienceDataGet()
    }, [])


    async function exprienceDataDel(id) {
        console.log(id)

        const experienceDelApi = await fetch(`https://protfoliosever-fscknvyj.b4a.run/api/Exprience/${id}`, {
            method: "DELETE",
        })
        const serverResponse = await experienceDelApi.json()
        console.log(serverResponse)
        alert(serverResponse.message)
        window.location.reload()
    }




    return <>

        <div className="container mt-5">
            <h1 className="heading-about">Welcome to Experience Admin Side</h1>
            <div className="exper-parent-upload">
                <div>
                    <div className="form0upload-woork">
                        <h1>Upload Form</h1>
                    </div>

                    <div className="cv-about-Img-parent">
                        <label className="cv-about-Img-child" for="exper-logo">Upload Logo Image</label>
                        <input id="exper-logo" className="inpuu" onChange={(e) => setLogoImg(e.target.files[0])} type="file" />
                    </div>
                    <div className="cv-about-Img-parent">
                        <label className="cv-about-Img-child" for="experWorkSkill">Upload Skill logo</label>
                        <input id="experWorkSkill" className="inpuu" onChange={(e) => setSkillImg(e.target.files[0])} type="file" />
                    </div>
                    <div>
                        <label className="Img-child">Company Name</label>
                        <input className="inpu-work" onChange={(e) => setCompanyName(e.target.value)} type="text" />

                    </div>
                    <div>

                        <label className="Img-child">Skill Name</label>
                        <input className="inpu-work" onChange={(e) => setSkillName(e.target.value)} type="text" />

                    </div>

                    <div>
                        <label className="Img-child">exprience</label>
                        <input className="inpu-work" onChange={(e) => setExprience(e.target.value)} type="text" />

                    </div>

                    <div className="btnn-parent-about">
                        <button onClick={expriencePostWork}>Upload Exprience</button>
                    </div>

                </div>

            </div>

            <div className="card-worl-exper mt-5">
                {exprienceData.dataFind.map((item) => <>
                    <div className="headcompany">
                        <div className="company-parent">
                            <img src={item.logoImg} width={"200px"} />
                        </div>
                        <div >
                            <h4 className="comapnyName">{item.companyName}</h4>
                        </div>
                    </div>
                    <div className="headcompany">
                        <div className="company-parent">
                            <img src={item.skillImg} />
                        </div>
                        <div >
                            <h4 className="comapnyName">{item.skillName}</h4>
                        </div>
                    </div>


                    <div className="exoer">
                        <h4>{item.exprience}</h4>
                    </div>


                    <button className="Btnn" onClick={() => exprienceDataDel(item._id)}>Delete</button>

                </>)}
            </div>

        </div>

    </>
}


export default ExprienceAdmin;