"use client";
import PageUI from "@/components/PageUI";
import { useState } from "react";

export default function Home() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY; //joTsS29PsAhmLhUyAOBO89ld0VGVbkIkv3Jst0bm
  
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [opcion, setOpcion] = useState("today")
  const [inputValue, setInputValue] = useState("")

  async function consumirAPI(){
      setLoading(true)

      let urlAPI = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}` 
      if(opcion==="date")urlAPI+=`&date=${inputValue}`
      else if(opcion==="count"){
        if(inputValue<1 || inputValue>10){
            setError("Usa el rango valido")
            setLoading(false)
            return
        }
        urlAPI+=`&count=${inputValue}`
      }
      
      try{
          let response = await fetch(urlAPI)
          let data = await response.json()
          if(data.msg)setError(data.msg)
          else setError(null)
          setResponse(data)
      }
      catch(err){
          setError("Error de Conexion")
      }
      finally{
          setLoading(false)
      }
  }

  const limpiarResultado = () => {
      setResponse(null)
      setLoading(false)
  }
  
  return (
    <PageUI
      response={response}
      error={error}
      loading={loading}
      opcion={opcion}
      setOpcion={setOpcion}
      setInputValue={setInputValue}
      consumirAPI={consumirAPI}
      limpiarResultado={limpiarResultado}
    ></PageUI>
  );
}
