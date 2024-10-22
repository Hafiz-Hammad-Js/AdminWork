import React, { useEffect, useState } from "react";
import './Header.css'
import { imageUrl } from "../../Config/Firebase";
import { Await, json } from "react-router-dom";

function Header() {

    const [img, setImg] = useState()
    const [headerData, setHeaderData] = useState({ dataFind: [] })

    async function getHerderData() {
        try {

            const data = await fetch("https://protfoliosever-fscknvyj.b4a.run/api/Header/HeaderGetWork")
            const response = await data.json()
            setHeaderData(response)
            console.log(response)

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getHerderData()
    }, [])

    function postData() {

        if (headerData && headerData.dataFind) {
            let checkLength = headerData.dataFind.length
            console.log(checkLength)

            if (checkLength >= 1) {
                alert("You can't sent data, because you have already given 01 Image")
            } else {

                async function upload() {
                    try {
                        const imgUrl = await imageUrl({ img })
                        console.log(imgUrl)

                        const sendImgData = await fetch("https://protfoliosever-fscknvyj.b4a.run/api/Header/HeaderPostWork", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                img: imgUrl,
                            })
                        })
                        const response = await sendImgData.json()
                        console.log(response)

                        alert("your data save In DB")
                        window.location.reload()

                    } catch (error) {
                        console.error(error)
                    }
                }
                upload()
            }
        }
        else {
            alert("Length 1 nahi mil raha hi hai")
        }
    }

    async function updateData(id) {
        console.log("me id hn ", id)

        if (!img) {
            alert("Please choose img")
        } else {
            const imgUrl = await imageUrl({ img })
            console.log(imgUrl)

            const updateApi = await fetch(`https://protfoliosever-fscknvyj.b4a.run/api/Header/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    img: imgUrl,
                })
            })
            const resResult = await updateApi.json()
            console.log("me admin side hon", resResult)
            window.location.reload()
        }


    }




    return <>
        <div className="container mt-5">
            <h1 className="headerHeading">Welcome header Admin Side</h1>

            <div className="container uoload-btnn-parent">
                <button onClick={postData}>Upload</button>

                <label className="fileWorl-header" for="file-handel">Change Header main Image</label>

                <input className="inpuu" id="file-handel" onChange={(e) => setImg(e.target.files[0])} type="file" />
            </div>

            <div className="getData-parentHeader">
                {headerData.dataFind.map((item) => <>
                    <div>
                        <div className="img-parent-flexWork">
                            <div className="img-parentHeader">
                                <img src={item.img} />
                            </div>
                        </div>


                        <label className="fileWorl-header" for="file-handel">Change Header main Image</label>

                        <input className="inpuu" id="file-handel" onChange={(e) => setImg(e.target.files[0])} type="file" />
                        <div className="btnn-parent-getData">
                            <button onClick={() => updateData(item._id)}>Update</button>
                        </div>

                    </div>
                </>)}
            </div>

        </div>
    </>
}


export default Header