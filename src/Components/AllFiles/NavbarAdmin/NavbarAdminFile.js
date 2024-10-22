import React, { useEffect, useState } from "react";
import { imageUrl } from "../../Config/Firebase";
import "./Navbar.css"


function NavbarAdminSide() {

    const [img, setImg] = useState()
    const [NavbarData, setNavbarData] = useState({ dataFind: [] })


    async function NavbarGetData() {
        try {
            const getImgApi = await fetch("https://protfoliosever-fscknvyj.b4a.run/api/Navbar/NavbarGetWork")
            const serverResponse = await getImgApi.json()
            console.log(serverResponse)
            setNavbarData(serverResponse)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        NavbarGetData()
    }, [])

    function uploadNavImage() {

        if (NavbarData.dataFind.length >= 1) {
            alert("You can't sent data because you have already given data so please you can delete data or update data")
        }
        else {

            async function uploadImage() {
                try {
                    const url = await imageUrl({ img })
                    console.log(url)

                    const sentImgApi = await fetch("https://protfoliosever-fscknvyj.b4a.run/api/Navbar/NavbarPostWork", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            img: url
                        })
                    })
                    const serverResponse = await sentImgApi.json()
                    console.log(serverResponse)
                    alert(serverResponse.message)
                    window.location.reload()

                } catch (error) {
                    console.error(error)
                }
            }
            uploadImage()
        }
    }

    async function updateNavImage(id) {
        if (!img) {
            alert("please enter Update Image")
        } else {
            try {
                console.log(id)

                const url = await imageUrl({ img })
                console.log(url)

                const updataImgApi = await fetch(`https://protfoliosever-fscknvyj.b4a.run/api/Navbar/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        img: url,
                    })
                })
                const serverResponse = await updataImgApi.json()
                console.log(serverResponse)
                alert(serverResponse.message)
                window.location.reload()

            } catch (error) {
                console.error(error)
            }
        }
    }




    return <>
        <div className="container mt-5">
            <h1 className="navAdminHead">Welcome To Navbar Admin Side</h1>
            <div className="container uploqadSide">


                <label for="file-upload" class="custom-file-upload">
                    Choose Image
                </label>

                <input id="file-upload" className="inpuu mt-5" onChange={(e) => setImg(e.target.files[0])} type="file" />

                <button className="NAv-btn" onClick={uploadNavImage}>Upload Navbar Image</button>
            </div>

            <div className="gerDataNav-parent">
                <div>

                    {NavbarData.dataFind.map((item) => <>
                        <div className="image-parentNavbar">
                            <img src={item.img} />
                        </div>
                        <div className="label-parent">

                            <label for="file-upload" class="custom-file-upload">
                                Choose Image
                            </label>
                        </div>
                        <div>
                            <button className="getNav-btn" onClick={() => updateNavImage(item._id)}>Update Navbar Image</button>
                        </div>
                    </>)}
                </div>
            </div>
        </div>
    </>
}


export default NavbarAdminSide;