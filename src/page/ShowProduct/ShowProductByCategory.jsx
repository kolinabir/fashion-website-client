import { useLoaderData } from "react-router-dom";

const ShowProductByCategory = () => {
    const data = useLoaderData();
    console.log(data);


    return (
        <div>
            {data.data.map((product) => (
                <div key={product._id}>
                    <h3>{product.title}</h3>
                    {/* Add other product details as needed */}
                </div>
            ))}
        </div>
    );
};

export default ShowProductByCategory;
