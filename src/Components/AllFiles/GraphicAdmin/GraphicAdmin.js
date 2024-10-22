import React, { useState, useEffect } from "react";
import { imageUrl } from "../../Config/Firebase";
import "./GraphicAdmin.css"

function Graphic() {

    const [img, setimg] = useState()
    const [imgName, setimgName] = useState()
    const [imgAbout, setimgAbout] = useState()
    const [category, setcategory] = useState()

    async function UploadData() {
        if (!img || !imgName || !imgAbout || !category) {
            alert("please enter all inputs")
        }
        else {
            let url = await imageUrl({ img })
            console.log(url)

            const PostApi = await fetch("https://protfoliosever-fscknvyj.b4a.run/api/Graphic/GraphicProtfolioPostWork", {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify({
                    img: url,
                    imgName,
                    imgAbout,
                    category,
                })
            })
            const serverResponse = await PostApi.json()
            console.log(serverResponse)
            alert(serverResponse.message)
        }

    }

    const [filterData, setFilterData] = useState([])


    async function graphicDataGet() {
        try {
            const GetApi = await fetch("https://protfoliosever-fscknvyj.b4a.run/api/Graphic/graphicGetWork")
            const serverResponse = await GetApi.json()
            console.log(serverResponse)
            setFilterData(serverResponse.dataFind)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        graphicDataGet()
    }, [])

    async function GraphicDel(id) {

        const DelApi = await fetch(`https://protfoliosever-fscknvyj.b4a.run/api/Graphic/${id}`, {
            method: "DELETE",
        })
        const serverResponse = await DelApi.json()
        console.log(serverResponse)
        alert(serverResponse.message)
        window.location.reload()


    }


    return <>
        <div className="container mt-5">
            <div className="web-parentwork">
                <div>
                    <label>Your Design Img</label>
                    <input onChange={(e) => setimg(e.target.files[0])} type="file" />
                </div>
                <div>
                    <label>Your Design Name</label>
                    <input onChange={(e) => setimgName(e.target.value)} type="text" />
                </div>
                <div>
                    <label>Your Design About</label>
                    <textarea onChange={(e) => setimgAbout(e.target.value)}></textarea>

                </div>
                <div>
                    <label>Your Design category</label>
                    <input onChange={(e) => setcategory(e.target.value)} type="text" />
                </div>
                <button className="bbtn-web" onClick={UploadData}>UploadData</button>
            </div>
        </div>


        {filterData.map((item) => <>
            <div className="container graph">
                <div className="parent-hon">
                    <img src={item.img} />
                </div>

                <h5>{item.imgName}</h5>

                <button className="bbtn-web" onClick={() => GraphicDel(item._id)}>Delete</button>
            </div>
        </>)}
    </>
}


export default Graphic;