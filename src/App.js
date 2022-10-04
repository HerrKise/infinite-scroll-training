import axios from "axios";
import { useEffect, useState } from "react";

function App() {
    const [photos, setPhotos] = useState([]);
    useEffect(() => {
        axios
            .get(
                "https://jsonplaceholder.typicode.com/photos?_limit=10&_page=1"
            )
            .then((response) => {
                console.log(response);
                setPhotos((prevstate) => [...prevstate, ...response.data]);
            });
    }, []);
    return (
        <div className="App">
            {photos &&
                photos.map((photo) => (
                    <div className="card" key={photo.id}>
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
