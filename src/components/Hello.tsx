

const Hello = () => {
    const number = 2

    const newNumber = number + 3

    return (
        <div className="border-2 border-blue-500">
            <h1 className="text-2xl text-blue-600">
                Hello World
            </h1>
            <p>
                {number} + 3 = {newNumber}
            </p>
        </div>
    );
};

export default Hello;