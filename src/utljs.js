import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseApp";


export const addMessage=async (message)=>{
    try {
        const docRef=collection(db,"messages")
        await addDoc(docRef,message)
    } catch (error) {
        console.log("Hiba az uzenet kuldesekor!", error);
        
    }
}

