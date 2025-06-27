import { useEffect, useState } from "react"
import { db, auth } from "../config/firebase"
import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore/lite";
import { nanoid } from 'nanoid'

export const useFirestore = () => {
  
    const [data, setData] = useState([]);
    const [error, setError] = useState();
    //loading ahora recibe un objeto
    const [loading, setLoading] = useState({});

    

    const getData = async() => {
      console.log(auth);
      try {
        //Prev es una copia del estado anterior
        setLoading(prev => ({...prev, getData: true}));
        /* Filtro de la Base de datos */
        const dataRef = collection(db, "urls");
        const q = query(dataRef, where("uid", "==", auth.currentUser.uid))
        const querySnapshot = await getDocs(q);
        //se cambio el forEach por el map
        const dataDB = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        setData(dataDB);
      } catch (error) {
        console.log("Error in firestore: "+error);
        setError(error.message)
      }finally
      {
        setLoading(prev => ({...prev, getData: false}));
      }
    }
    
    const addData = async(url) => {
      try {
        setLoading(prev => ({...prev, addData: true}));
        const nanoidentify = nanoid(6);
        const newDoc = 
        {
          id: nanoidentify,
          enable: true,
          nanoid: nanoidentify,
          origin: url,
          uid: auth.currentUser.uid
        }
        const docRef = doc(db, "urls", newDoc.nanoid)
        await setDoc(docRef, newDoc);
        // hace una copia de la data anterior y le agregamos la nueva informacion para que datase muestre actualizado en el sitio
        setData([...data, newDoc]);
      } catch (error) {
        console.log("error agregando: "+error.message);
         setError(error.message)
      } finally
      {
        setLoading(prev => ({...prev, addData: false}));
      }
    }

    const deleteData = async(nanoid) => 
    {
      try {
        setLoading(prev => ({...prev, [nanoid]: true}));
        const docRef = doc(db, "urls", nanoid);
        await deleteDoc(docRef);
        setData(data.filter(item => item.nanoid !== nanoid));
      } catch (error) {
         console.log("error agregando: "+error.message);
         setError(error.message)
      }
      finally
      {
        setLoading(prev => ({...prev, [nanoid]: false}));
      } 
    }

    const updateData = async (nanoid, neworigin) => {
      try {
        setLoading(prev => ({...prev, updateData: true}));
        const docRef = doc(db, "urls", nanoid);
        await updateDoc(docRef, {origin: neworigin});
        setData(data.map(item => item.nanoid === nanoid ? ({...item, origin: neworigin}): (item)));

      } catch (error) {
          console.log("error agregando: "+error.message);
         setError(error.message)
      } finally
      {
        setLoading(prev => ({...prev, updateData: false}));
      }
    }
    

    return {
      data, error, loading, getData, addData, deleteData, updateData
    }
}
