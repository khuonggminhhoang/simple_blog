import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PostLists() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/posts');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();

                console.log(result);

                setData(result);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("An error occurred while fetching the data.");
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // useEffect(() => {
    //     fetch('http://localhost:3000/api/posts')
    //     .then(response => response.json())
    //     .then(data => setData(data))
    //     .catch(error => console.error('Error fetching data:', error));
    // }, []);

    return (
        <ul>
            {data.map((d) => (
                <li key={d.slug}>
                    <Link to={`/posts/${d.slug}`}>
                        <h3>{d.title}</h3>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default PostLists;