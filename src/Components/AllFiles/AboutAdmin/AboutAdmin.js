import React, { useEffect, useState } from "react";
import { multipleImageUrls } from "../../Config/Firebase";
import './About.css'



function AboutAdmin() {

    const [cvImg, setCvImg] = useState();
    const [aboutImg, setAboutImg] = useState();
    const [degree, setDegree] = useState()
    const [email, setEmail] = useState()
    const [lastestKey, setLastestKey] = useState()
    const [LastestValue, setLastestValue] = useState()

    const [aboutDatAdmin, setAboutDataAdmin] = useState({ dataFind: [0] })

    async function AboutGetDATA() {
        try {
            const aboutDataApi = await fetch("https://protfoliosever-fscknvyj.b4a.run/api/About/get")
            const serverResponse = await aboutDataApi.json()
            console.log(serverResponse)
            setAboutDataAdmin(serverResponse)

            if (serverResponse.dataFind && serverResponse.dataFind.length > 0) {
                const data = serverResponse.dataFind[0]
                setDegree(data.degree)
                setEmail(data.email)
                setLastestKey(data.lastestKey)
                setLastestValue(data.LastestValue)
            }
        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        AboutGetDATA()
    }, [])

    function postAboutData() {

        if (aboutDatAdmin.dataFind.length >= 1) {
            alert("you can't sent data because you have already given 01 data you can update data only!")
        }
        else {

            try {
                const AboutData = async () => {
                    try {
                        let images = [cvImg, aboutImg]
                        let urls = await multipleImageUrls({ images })
                        console.log(urls)

                        const postAboutDataApi = await fetch("https://protfoliosever-fscknvyj.b4a.run/api/About/AboutPostWork", {
                            method: "POST",
                            headers: {
                                "content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                cvImg: urls[0],
                                aboutImg: urls[1],
                                degree,
                                email,
                                lastestKey,
                                LastestValue
                            })
                        })
                        const serverResponse = await postAboutDataApi.json()
                        console.log(serverResponse)
                        alert(serverResponse.message)

                    } catch (error) {
                        console.error(error)
                    }

                }
                AboutData()
            } catch (error) {
                console.error(error)
            }

        }
    }
    let dataId;

    if (aboutDatAdmin.dataFind[0]) {
        dataId = aboutDatAdmin.dataFind[0]._id
    }





    async function updateAboutData() {
        if (!cvImg || !aboutImg) {
            alert("Enter About Image And Cv Image")
        }
        else {

            let images = [cvImg, aboutImg];

            let urls = await multipleImageUrls({ images })
            console.log("me url hpn", urls)




            const updateAboutData = await fetch(`https://protfoliosever-fscknvyj.b4a.run/api/About/${dataId}`, {
                method: "PUT",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify({
                    cvImg: urls[0],
                    aboutImg: urls[1],
                    degree,
                    email,
                    lastestKey,
                    LastestValue
                })
            })
            const serverResponse = await updateAboutData.json()
            console.log(serverResponse)
            alert(serverResponse.message)
        }

    }


    return <>
        <div className="container mt-5">

            <h1 className="heading-about">Welcome to About Admin Side</h1>

            <div className="form-parentHeader mt-5">

                <div>
                    <h1>upload data</h1>
                    <div className="cv-about-Img-parent">
                        <label className="cv-about-Img-child" for="Cv-workFile">Update Cv Image</label>
                        <input className="inpuu" id="Cv-workFile" onChange={(e) => setCvImg(e.target.files[0])} type="file" />
                    </div>
                    <div className="cv-about-Img-parent">
                        <label className="cv-about-Img-child" for="About-imgWork">Update About Image</label>
                        <input className="inpuu" id="About-imgWork" onChange={(e) => setAboutImg(e.target.files[0])} type="file" />
                    </div>
                    <div>
                        <label className="Img-child">Degree Value</label>
                        <input className="inpu-work" onChange={(e) => setDegree(e.target.value)} type="text" value={degree} />
                    </div>
                    <div>
                        <label className="Img-child">Email Value</label>
                        <input className="inpu-work" onChange={(e) => setEmail(e.target.value)} type="text" value={email} />
                    </div>
                    <div>
                        <label className="Img-child">lastest Key</label>
                        <input className="inpu-work" onChange={(e) => setLastestKey(e.target.value)} type="text" value={lastestKey} />
                    </div>
                    <div>
                        <label className="Img-child">lastest Value</label>
                        <input className="inpu-work" onChange={(e) => setLastestValue(e.target.value)} type="text" value={LastestValue} />
                    </div>
                    <div className="btnn-parent-about">
                        <button onClick={postAboutData}>UPLOAD About Data</button>
                    </div>
                </div>
            </div>

            <div className="form-parentHeader mt-5">
                <div>
                    <div className="cv-about-Img-parent">
                        <label className="cv-about-Img-child" for="Cv-workFile">Update Cv Image</label>
                        <input className="inpuu" id="Cv-workFile" onChange={(e) => setCvImg(e.target.files[0])} type="file" />
                    </div>
                    <div className="cv-about-Img-parent">
                        <label className="cv-about-Img-child" for="About-imgWork">Update About Image</label>
                        <input className="inpuu" id="About-imgWork" onChange={(e) => setAboutImg(e.target.files[0])} type="file" />
                    </div>
                    <div>
                        <label className="Img-child">Degree Value</label>
                        <input className="inpu-work" onChange={(e) => setDegree(e.target.value)} type="text" value={degree} />
                    </div>
                    <div>
                        <label className="Img-child">Email Value</label>
                        <input className="inpu-work" onChange={(e) => setEmail(e.target.value)} type="text" value={email} />
                    </div>
                    <div>
                        <label className="Img-child">lastest Key</label>
                        <input className="inpu-work" onChange={(e) => setLastestKey(e.target.value)} type="text" value={lastestKey} />
                    </div>
                    <div>
                        <label className="Img-child">lastest Value</label>
                        <input className="inpu-work" onChange={(e) => setLastestValue(e.target.value)} type="text" value={LastestValue} />
                    </div>
                    <div className="btnn-parent-about">
                        <button onClick={updateAboutData}>Update About Data</button>
                    </div>
                </div>
            </div>



            <hr className="hr-color" />

            <div className="parent-data-about">
                <div>
                    <h1 className="heading-about1">Current About Data</h1>
                    {aboutDatAdmin.dataFind.map((item) => <>
                        <div className="img-flex-work">
                            <div className="about-parent-img">
                                <img src={item.cvImg} />
                            </div>
                        </div>
                        <div className="img-flex-work">
                            <div className="about-parent-img-aboutSide">
                                <img src={item.aboutImg} />
                            </div>
                        </div>


                        <h4 className="h4-work">{item.degree}</h4>
                        <h4 className="h4-work">{item.email}</h4>
                        <table>
                            <tr>
                                <th className="h4-work">{item.lastestKey} :</th>
                                <th className="h4-work"> {item.LastestValue}</th>
                            </tr>
                        </table>

                    </>)}
                </div>
            </div>

        </div>
    </>
}

export default AboutAdmin;