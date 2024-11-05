interface BildProps {
    image: string
}


const Bild = ({image}:BildProps) => {
    return (
        <div>
            <img className={'rounded-full w-24 h-24'} src={image} />

        </div>
    );
};

export default Bild;