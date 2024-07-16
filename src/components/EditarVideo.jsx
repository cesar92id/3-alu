import { useState, useEffect } from "react"
import ButtonLink from "./ButtonLink"
import ButtonForm from "./ButtonForm"
import CampoTexto from "./CampoTexto"
import ListaOpciones from "./ListaOpciones"
import TextArea from "./TextArea"
import { enviarDatos } from "../api/api"
import { v4 as uuidv4 } from "uuid"
import { obtenerDatosVideo } from "../api/api"

const EditarVideo = (props) =>{

    const[nombre,setNombre] = useState('')
    const[urlVideo,setUrlVideo] = useState('')
    const[urlImagen,setUrlImagen] = useState('')
    const[categoria,setCategoria] = useState('')
    const[descripcion,setDescripcion] = useState('')
    const[video,setVideo] = useState([])
    

    const manejarLimpiar = () => {
        setNombre('')
        setUrlVideo('')
        setUrlImagen('')
        setCategoria('** Escoja una categoria **')
        setDescripcion('')
        setVideo([])
    }

    const manejarEnvio = (e) =>{
        e.preventDefault()
        const id = uuidv4()
        let datosAEnviar = {
            title: nombre,
            url: urlVideo,
            image: urlImagen,
            description: descripcion,
            categorie: categoria,
            id
        }
        enviarDatos('/videos',datosAEnviar)
        manejarLimpiar()
    }

    const EstilosBtnNuevaCategoria = {
        color: '#ffffff',
        background: '#2A7AE4',
        fontSize: '21px',
        fontWeight: '600',
        width: '254px',
        height: '54px',
        borderRadius: '4px',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const EstilosBtnGuardar = {
        display: 'inline-block',
        color: '#ffffff',
        background: '#2A7AE4',
        fontSize: '21px',
        fontWeight: '600',
        width: '180px',
        height: '54px',
        borderRadius: '4px',
        border: 'none'
    }

    const EstilosBtnLimpiar = {
        display: 'inline-block',
        color: '#000000',
        background: '#9E9E9E',
        fontSize: '21px',
        fontWeight: '600',
        width: '180px',
        height: '54px',
        borderRadius: '4px',
        border: 'none'
    }

    const [videos,setVideos] = useState([])

    useEffect(()=>{

       obtenerDatosVideo('/videos?id='+props.id,setVideo)

    },[props])



    return (
        
        <>
            <main className="nuevovideo">
                <div className="container">
               
                    
                    <form className='form' action="" onSubmit={manejarEnvio}>
                        
                        <CampoTexto 
                            titulo='Título'
                            mensaje="" 
                            required={true} 
                            valor={video[0]?.title} 
                            actualizarValor={setNombre} 
                        />
                        
                        <CampoTexto 
                            titulo='Link del video' 
                            mensaje="" 
                            required={true} 
                            valor={video[0]?.url} 
                            actualizarValor={setUrlVideo} 
                        />

                        <CampoTexto 
                            titulo='Link de la imagen del video' 
                            mensaje="" 
                            required={true} 
                            valor={video[0]?.image} 
                            actualizarValor={setUrlImagen} 
                        />

                        <ListaOpciones 
                            titulo='Categoría' 
                            mensaje="" 
                            required={true} 
                            valor={video[0]?.categorie} 
                            actualizarValor={setCategoria} 
                        />

                        <TextArea 
                            titulo='Descripción' 
                            mensaje='' 
                            required={true} 
                            valor={video[0]?.description} 
                            actualizarValor={setDescripcion} 
                        />

                        <div className="barra__botones">
                            <div className="botones">
                                <ButtonForm tipo='submit' titulo='Guardar' styles={EstilosBtnGuardar} />
                                <ButtonForm tipo='reset' titulo='Limpiar' styles={EstilosBtnLimpiar} manejarClic={()=>manejarLimpiar()}/>
                            </div>
                        
                        </div>

                    </form>

                </div>
            </main>
        </>
        
        
        
    )
    
}

export default EditarVideo