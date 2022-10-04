import axios from "axios";
import { useEffect, useState } from "react";

function App() {
    const [photos, setPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState();
    useEffect(() => {
        if (isLoading) {
            axios
                .get(
                    `https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`
                )
                .then((response) => {
                    console.log(response);
                    setTotalCount(response.headers["x-total-count"]);
                    setPhotos((prevstate) => [...prevstate, ...response.data]);
                    setCurrentPage((prevState) => prevState + 1);
                })
                .finally(() => setIsLoading(false));
        }
    }, [isLoading]);

    const scrollHandler = (e) => {
        if (
            e.target.documentElement.scrollHeight -
                (e.target.documentElement.scrollTop + window.innerHeight) <
                300 &&
            photos.length < totalCount
        )
            setIsLoading(true);
    };

    useEffect(() => {
        document.addEventListener("scroll", scrollHandler);

        return () => {
            document.removeEventListener("scroll", scrollHandler);
        };
    }, [totalCount]);

    return (
        <div className="App">
            {photos &&
                photos.map((photo) => (
                    <div className="card" key={Math.random().toString()}>
                        <h2>{photo.title}</h2>
                        <img
                            src={photo.thumbnailUrl}
                            alt="content from jsonplaceholder"
                        />
                    </div>
                ))}
        </div>
    );
}

export default App;
