// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyBvdC-A8jHnQOczR_7ihcg_l9mKiL4_E7g",
  authDomain: "my-protfolio-img-data.firebaseapp.com",
  projectId: "my-protfolio-img-data",
  storageBucket: "my-protfolio-img-data.appspot.com",
  messagingSenderId: "34573552205",
  appId: "1:34573552205:web:bf6900f5f82916a4202a04",
  measurementId: "G-S0DHZLXZYQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)


export async function imageUrl(get) {
  try {
    const { img } = get

    // step 1 //

    const storageRef = ref(storage, `Myimage - ${img.name}`)
    await uploadBytes(storageRef, img)

    //step 2 //

    const url = await getDownloadURL(storageRef)

    alert("finished")

    return url
  } catch (error) {
    console.log(error)
  }

}


export async function multipleImageUrls(get) {
  try {

    const { images } = get // yeh array hoga jisme multiple images hain
    const urlPromises = images.map(async (img) => {
      const storageRef = ref(storage, `Myimage - ${img.name}`)
      await uploadBytes(storageRef, img)
      const url = await getDownloadURL(storageRef)
      return url
      
    })

    const urls = await Promise.all(urlPromises)

    alert("Finished all uploads")

    return urls
  } catch (error) {
    console.log(error)
  }
}
