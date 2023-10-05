import { Button, Modal, Placeholder } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';

const Edit = ( { attributes, setAttributes } ) => {
    const [ isOpen, setOpen ] = useState( false );
    const images = attributes.images || [];

    const openModal = () => setOpen( true );
    const closeModal = () => setOpen( false );

    const onSelectImages = ( newImages ) => {
        setAttributes( { images: [...images, ...newImages.slice( 0, 20 - images.length )] } );
    };

    return (
		<>
			<Placeholder
				icon="format-gallery"
				label="Galería personalizada"
				instructions="Agrega hasta 20 imágenes"
			>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={ onSelectImages }
						allowedTypes={ [ 'image' ] }
						multiple
						gallery
						value={ images.map( img => img.id ) }
						render={ ( { open } ) => (
							<Button onClick={ open }>
								Agregar imágenes
							</Button>
						) }
					/>
				</MediaUploadCheck>
			<div className="my-gallery-block">
			   {images.slice(0, 3).map((img, index) => (
                <div className={`image-${index === 0 ? 'large' : 'small'}`} key={img.id}>
               <img src={img.url} alt={img.alt} onClick={openModal} />
            </div>
            ))}
			</div>
			</Placeholder>
			{ isOpen && (
				<Modal title="Galería personalizada" onRequestClose={ closeModal }>
					<div className="my-gallery-modal">
						{ images.map( img => (
							<img key={ img.id } src={ img.url } alt={ img.alt } />
						) ) }
					</div>
				</Modal>
			) }
		</>
	);
};

export default Edit;

