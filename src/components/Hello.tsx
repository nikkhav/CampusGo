// rsc

interface HelloProps {
    message: string
}

const Hello = ({message}: HelloProps) => {
    const number = 2

    return (
        <div className="border-2 border-blue-500">
            <h1 className="text-2xl text-blue-600">
                {message}
            </h1>
            <p>
                {number}
            </p>
        </div>
    );
};

export default Hello;