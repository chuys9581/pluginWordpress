import { Button, Modal, Placeholder } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import { withSelect } from '@wordpress/data';

const Edit = ( { attributes, setAttributes, categories } ) => {
    const [ isOpen, setOpen ] = useState( false );
    const images = attributes.images || [];
	const text = attributes.text || '';

    const openModal = () => setOpen( true );
    const closeModal = () => setOpen( false );

    const onSelectImages = ( newImages ) => {
        setAttributes( { images: [...images, ...newImages.slice( 0, 20 - images.length )] } );
    };

	const onChangeText = ( newText ) => {
        setAttributes( { text: newText } );
    };

    // Actualiza el atributo 'categories' cuando cambia la prop 'categories'
    useEffect(() => {
        setAttributes({ categories });
    }, [categories]);

    return (
		<>
			<Placeholder
				icon="format-gallery"
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
				<div className='container-all'>
				<p>{ categories }</p>
					<div className='container-text'>
				<RichText
                    tagName="p"
                    value={ text }
                    onChange={ onChangeText }
                    placeholder="Añade tu texto aquí..."
                />
					</div>
				<div className="my-gallery-block">
               {images.slice(0, 1).map((img, index) => (
                <div className={`image-large`} key={img.id}>
                   <img src={img.url} alt={img.alt} onClick={openModal} />
                </div>
               ))}
               <div className='small-images-container'>
               {images.slice(1, 3).map((img, index) => (
                <div className={`image-small`} key={img.id}>
                   <img src={img.url} alt={img.alt} onClick={openModal} />
                </div>
               ))}
               </div>
			   </div>
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

export default withSelect( ( select ) => {
    const { getEntityRecord } = select( 'core' );
    const postType = select( 'core/editor' ).getCurrentPostType();
    const postId = select( 'core/editor' ).getCurrentPostId();
    const post = getEntityRecord( 'postType', postType, postId );

    if ( ! post || ! post.categories ) {
        return {
            categories: '',
        };
    }

    const categoryIds = post.categories;
    const categoryEntities = categoryIds.map( id => getEntityRecord( 'taxonomy', 'category', id ) );

    // Filtramos las categorías que aún no se han cargado.
    const loadedCategories = categoryEntities.filter(Boolean);

    return {
        categories: loadedCategories.map((cat) => cat.slug).join(', '),
    };
} )( Edit );

