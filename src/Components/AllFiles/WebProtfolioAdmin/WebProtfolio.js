
import React, { useState, useEffect } from "react";
import { multipleImageUrls } from "../../Config/Firebase";
import "./WebProtfolio.css"


function WebProtfolio() {


    const [thumImg, setThumImg] = useState()
    const [yourProjectName, setYourProjectName] = useState()
    const [workedOn, setworkedOn] = useState()
    const [link, setLink] = useState()

    const [webData, setWebData] = useState({ dataFind: [] })

    const [technologies, setTechnologies] = useState([])
    // Technology ka name ya logo change karne ka function


    function addTechnology() {
        setTechnologies([...technologies, { name: "", logo: "" }])
    }

    const handleTechChange = (index, event) => {
        const newTechnologies = [...technologies]; // Copy existing technologies
        newTechnologies[index][event.target.name] = event.target.name === 'logo'
            ? event.target.files[0] // If logo, use the file
            : event.target.value; // Otherwise, use the value for name
        console.log(newTechnologies)
        setTechnologies(newTechnologies); // Update the state

    };


    async function WebProtfolioPost() {
        if (!thumImg || !yourProjectName || !workedOn || !link) {
            alert("please enter all inputs")
        }
        else {

            let images = [thumImg]

            let check = technologies.map(item => item.logo)
            images.push(...check)




            const urlsCheck = await multipleImageUrls({ images }); // Assuming this function uploads the images
            console.log(urlsCheck)

            const techWithUrls = technologies.map((tech, index) => ({
                name: tech.name,
                logo: urlsCheck[index + 1] // Logo URL jo return hua hai
            }));

            const WebPostApi = await fetch("https://protfoliosever-fscknvyj.b4a.run/api/Web/WebProtfolioPostWork", {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify({
                    thumImg: urlsCheck[0],
                    yourProjectName,
                    workedOn,
                    link,
                    technologies: techWithUrls
                })
            })
            const serverResponse = await WebPostApi.json()
            console.log(serverResponse)
            alert(serverResponse.message)
        }

    }



    async function WebProtfolioDataGet() {
        try {
            const WebGetApi = await fetch("https://protfoliosever-fscknvyj.b4a.run/api/Web/WebProtfolioGetWork")
            const serverResponse = await WebGetApi.json()
            console.log(serverResponse)
            setWebData(serverResponse)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        WebProtfolioDataGet()
    }, [])

    async function webDataDEl(id) {
        const DelApi = await fetch(`https://protfoliosever-fscknvyj.b4a.run/api/Web/${id}`, {
            method: "DELETE",
        })
        const serverResponse = await DelApi.json()
        console.log(serverResponse)
        alert(serverResponse.message)
        window.location.reload()
    }

    async function webDataUpdated(id) {

        let images = [thumImg]

        images = technologies.map((item) => {
            return images.push(item.logo)
        })

        const urlsCheck = await multipleImageUrls({ images }); // Assuming this function uploads the images


        const techWithUrls = technologies.map((tech, index) => ({
            name: tech.name,
            logo: urlsCheck[index] // Logo URL jo return hua hai
        }));

        const WebPostApi = await fetch(`https://protfoliosever-fscknvyj.b4a.run/api/Web/${id}`, {
            method: "PUT",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify({
                thumImg: urlsCheck[0],
                yourProjectName,
                workedOn,
                link,
                technologies: techWithUrls
            })
        })
        const serverResponse = await WebPostApi.json()
        console.log(serverResponse)
        alert(serverResponse.message)
    }



    return <>
        <div className="container mt-5">
            <div className="web-parentwork">

                <div>
                    <label>ThumImg</label>
                    <input onChange={(e) => setThumImg(e.target.files[0])} type="file" />

                </div>
                <div>
                    <label>Project Name</label>
                    <input onChange={(e) => setYourProjectName(e.target.value)} type="text" />

                </div>
                <div>
                    <label>Worked On</label>
                    <input onChange={(e) => setworkedOn(e.target.value)} type="text" />

                </div>
                <div>
                    <label>LInk </label>
                    <input onChange={(e) => setLink(e.target.value)} type="text" />
                </div>



                <div>
                    {technologies.map((tech, index) => <>
                        <div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Technology Name"
                                value={tech.name}
                                onChange={(e) => handleTechChange(index, e)}
                                className="inpuworl"
                            />
                            <input
                                type="file"
                                name="logo"
                                onChange={(e) => handleTechChange(index, e)}
                            />

                        </div>

                    </>)}

                    <button className="bbtn-web" onClick={addTechnology}>Add More Technologies</button>
                    <button className='bbtn-web1' onClick={WebProtfolioPost}>Submit</button>
                </div>

            </div>


            {webData.dataFind.map((item) => <>
                <div className="web-parentworl">

                    <div className="thum">
                        <img src={item.thumImg} />
                    </div>
                    <h4>{item.yourProjectName}</h4>

                    {item.technologies.map((data) => <>

                        <ul>
                            <li>{data.name}</li>
                            <div className="thum1">
                                <img src={data.logo} />
                            </div>
                        </ul>

                    </>)}
                    
                    <button className='bbtn-web1' onClick={() => webDataDEl(item._id)}>Delete</button>
                </div>
            </>)}
        </div>
    </>
}

export default WebProtfolio;