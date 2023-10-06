const save = ( { attributes } ) => {
    const images = attributes.images || [];
    const text = attributes.text || '';
    const categories = attributes.categories || '';

    return (
        <div className='container-all'>
            <p>{ categories }</p>
            <div className="my-gallery-block">
               {images.slice(0, 1).map((img, index) => (
                <div className={`image-large`} key={img.id}>
                   <img src={img.url} alt={img.alt} />
                </div>
               ))}
               <div className='small-images-container'>
               {images.slice(1, 3).map((img, index) => (
                <div className={`image-small`} key={img.id}>
                   <img src={img.url} alt={img.alt} />
                </div>
               ))}
               </div>
            </div>
			<div className="container-text">
            <p>{ text }</p>
			</div>
        </div>
    );
};

export default save;


