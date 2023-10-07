const save = ({ attributes }) => {
    const images = attributes.images || [];
    const text = attributes.text || '';
    const categories = attributes.categories || '';
    const stars = attributes.stars || 0;

    return (
        <div className="container-all">
            {categories && <p>{categories}</p>}
            {stars > 0 && <p>{'⭐'.repeat(stars)}</p>}
            <div className="my-gallery-block">
                {images.slice(0, 1).map((img, index) => (
                    <div className={`image-large`} key={img.id}>
                        <img src={img.url} alt={img.alt} />
                    </div>
                ))}
                <div className="small-images-container">
                    {images.slice(1, 3).map((img, index) => (
                        <div className={`image-small`} key={img.id}>
                            <img src={img.url} alt={img.alt} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="container-text">
                <p>{text}</p>
            </div>
        </div>
    );
};

export default save;



