interface CarProps{
    model: string


}

const Car = ({model} : CarProps) => {

    return (
        <div>
            <button className={"border-2 p-2"}>
                {model} auswählen
            </button>

        </div>
    );
};

export default Car;