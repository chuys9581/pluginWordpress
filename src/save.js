const save = ( { attributes } ) => {
    const images = attributes.images || [];

    return (
        <div className="my-gallery-block">
            { images.slice(0, 3).map((img, index) => (
                <div className={`image-${index === 0 ? 'large' : 'small'}`} key={img.id}>
                    <img src={img.url} alt={img.alt} />
                </div>
            ))}
        </div>
    );
};

export default save;