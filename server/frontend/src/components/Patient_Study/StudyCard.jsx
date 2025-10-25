import './StudyCard.css'
import { useState, useRef } from 'react'

function StudyCard({ file, onFileAttach, onFileRemove, hasFile, onFileReplace, selectedStudyType }){
    const [showItems, setShowItems] = useState(false)
    const fileInputRef = useRef(null)
    const replaceInputRef = useRef(null)

    const studyCardBackground = '/assets/studies.jpg'

    const handleFileSelect = (event) => {
        const selectedFile = event.target.files[0]
        if (selectedFile) {
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
            if (validTypes.includes(selectedFile.type)) {
                onFileAttach(selectedFile)
            } else {
                alert('Only JPG, PNG, and PDF files are allowed')
            }
        }
    }

    const handleReplaceSelect = (event) => {
        const selectedFile = event.target.files[0]
        if (selectedFile) {
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
            if (validTypes.includes(selectedFile.type)) {
                if (onFileReplace) {
                    onFileReplace(selectedFile)
                }
            } else {
                alert('Only JPG, PNG, and PDF files are allowed')
            }
        }
    }

    const handleAttachClick = () => {
        fileInputRef.current?.click()
    }

    const handleReplaceClick = () => {
        replaceInputRef.current?.click()
    }

    const handleRemove = () => {
        onFileRemove()
    }

    const handleView = () => {
        if (file) {
            const fileUrl = URL.createObjectURL(file)
            window.open(fileUrl, '_blank')
        }
    }

    const getFileIcon = () => {
        if (!file) return null
        
        if (file.type.startsWith('image/')) {
            return '🖼️'
        } else if (file.type === 'application/pdf') {
            return '📄'
        }
        return '📎'
    }

    const getPreviewUrl = () => {
        if (!file) return studyCardBackground
        
        if (file.type.startsWith('image/')) {
            return URL.createObjectURL(file)
        }
        return studyCardBackground
    }

    return(
        <>
            <div 
                className='study-card-container' 
                onMouseOver={() => setShowItems(true)} 
                onMouseLeave={() => setShowItems(false)}
            >
                {!hasFile ? (
                    // Card vacía - con imagen de fondo original
                    <>
                        <div 
                            className='study-card-background' 
                            style={{ backgroundImage: `url(${studyCardBackground})`}} 
                        />
                        {showItems && (
                            <img 
                                src='/assets/paperclip.svg' 
                                className='study-card-option'
                                onClick={selectedStudyType ? handleAttachClick : undefined}
                                style={{ 
                                    cursor: selectedStudyType ? 'pointer' : 'not-allowed',
                                    opacity: selectedStudyType ? 1 : 0.4                         
                                }}
                                title={selectedStudyType ? 'Attach file' : 'Select a study first'}
                            />
                        )}
                        <input 
                            ref={fileInputRef}
                            type="file" 
                            accept="image/jpeg,image/jpg,image/png,application/pdf"
                            onChange={handleFileSelect}
                            style={{ display: 'none' }}
                        />
                    </>
                ) : (
                    // Card con archivo - mostrar preview o ícono + nombre
                    <>
                        {file.type.startsWith('image/') ? (
                            // Si es imagen, mostrar preview
                            <div 
                                className='study-card-background' 
                                style={{ backgroundImage: `url(${getPreviewUrl()})`}} 
                            />
                        ) : (
                            // Si es PDF, mostrar ícono y nombre
                            <div className='study-card-file-display'>
                                <div className='file-icon-large'>{getFileIcon()}</div>
                                <p className='file-name-display'>{file.name}</p>
                                <p className='file-size-display'>{(file.size / 1024).toFixed(2)} KB</p>
                            </div>
                        )}

                        {/* Mostrar nombre en overlay para imágenes */}
                        {file.type.startsWith('image/') && (
                            <div className='study-card-overlay'>
                                <div className='file-info-overlay'>
                                    <span className='file-icon-small'>{getFileIcon()}</span>
                                    <span className='file-name-overlay'>{file.name}</span>
                                </div>
                            </div>
                        )}

                        {/* Botones de acción */}
                        {showItems && (
                            <>
                                <img 
                                    src='/assets/glasses.svg' 
                                    className='study-card-option'
                                    onClick={handleView}
                                    title="View file"
                                    style={{ cursor: 'pointer' }}
                                />
                                <img 
                                    src='/assets/pen.svg'
                                    className='study-card-button study-card-edit-button'
                                    onClick={handleReplaceClick}
                                    title="Replace file"
                                    style={{ cursor: 'pointer' }}
                                />
                                <img 
                                    src="/assets/cross.svg" 
                                    className='study-card-button study-card-exit-button'
                                    onClick={handleRemove}
                                    title="Remove file"
                                    style={{ cursor: 'pointer' }}
                                />
                            </>
                        )}

                        {/* Input para reemplazar archivo */}
                        <input 
                            ref={replaceInputRef}
                            type="file" 
                            accept="image/jpeg,image/jpg,image/png,application/pdf"
                            onChange={handleReplaceSelect}
                            style={{ display: 'none' }}
                        />
                    </>
                )}
            </div>
        </>
    )
}

export default StudyCard