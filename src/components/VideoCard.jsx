import '../css/estilos.css'
import { Link } from 'react-router-dom'
import { obtenerDatos, eliminarDatos } from '../api/api'
import { useEffect, useState } from 'react'
import Modal from 'react-modal';
import EditarVideo from './EditarVideo';


const VideoCards = ({ url, color, nombreCategoria }) => {
    const [videos,setVideos] = useState([])
    const [videoAEliminar,setVideoAEliminar] = useState(null)
    const [solicitarDatosVideos,setSolicitarDatosVideos] = useState(false)
    const [video,seVideo] = useState(null)

    useEffect(()=>{
        obtenerDatos('/videos', setVideos)
        setSolicitarDatosVideos(false)
    },[solicitarDatosVideos])

    let colorCard = {
        border: `2px solid ${color}`, 
        backgroundColor: `${color}`   
    }

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = (id) => {
        seVideo(id)
        setModalIsOpen(true);
        
    };
    const closeModal = () => {
        setModalIsOpen(false);
        setVideoAEliminar(null)
    };
    
    const [modalIsOpen2, setModalIsOpen2] = useState(false);
    const openModal2 = (id) => {
        setVideoAEliminar(id)
        manejarEliminar()
        
    };
  
    
    const manejarEliminar = ()=>{
        if(videoAEliminar !== null){
            eliminarDatos(videoAEliminar)
            setSolicitarDatosVideos(true)
        }
        closeModal(); 
    }

    return (
        <>
            {
                videos.map(video => {
                    const { id, url, image, categorie } = video
                    if(categorie === nombreCategoria){
                        return (
                        <div className='videocard_container' key={id}>
                            <button className='videocard_btn' onClick={()=> 
                                { 
                                    let conf = window.confirm('Esta seguro/a que desea eliminar?')
                                    if (conf)  openModal2(`/videos/${id}`)}
                                   
                                }>Borrar</button>
                            <button className='videocard_btn_edit' onClick={() => openModal(id)}>Editar</button>
                            
                        <Link to={`${url}`} target="_blank" rel="noopener noreferrer" >
                            
                            <div className='videocard' style={ colorCard } key={id}>
                                <img src={`${image}`} alt="Imagen video card" key={id}/>
                                
                            </div>
                        </Link>
                        </div>
                        
                        );
                    }   
                })
            }
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className='ModalEdit'
                contentLabel="Ejemplo de Modal"
            >   
                <div className='modal_button'>
                    <button className='btn_cancel' onClick={closeModal}>X</button>                    
                </div>
                <div className='modal_header'>
                   <h1>Editar video </h1> 
                   <EditarVideo id={video}/>     
                </div>
                <div className='modal_content'>
                    <h2>Eliminar Video</h2>
                    <p>Se dispone a eliminar el video, desea continuar?</p>
                </div>
          
            </Modal>


          


        </>
        
    )
}

export default VideoCards