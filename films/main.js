const {useState, useEffect} = React;

function MovieApp() {
    const API_URL_SEARCH = 'https://api.themoviedb.org/3/search/movie';
    const API_KEY ='1fbce9937aadd6f812f0c9a2e153f4ad';
    const API_POPULAR_URL = 'https://api.themoviedb.org/3/movie/popular';
    const API_IMG_URL = 'https://image.tmdb.org/t/p/w200';

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        Search_pop();
    }, []);

    function Search(query) {
        setLoading(true);
        const myURI = API_URL_SEARCH + `?api_key=${API_KEY}&language=fr-FR&query=${query}`;

        fetch(myURI)
            .then(res => res.json())
            .then(data => {
                setMovies(data.results || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }

    function Search_pop() {
        setLoading(true);
        const myURI = API_POPULAR_URL + `?api_key=${API_KEY}&language=fr-FR&page=1`;

        fetch(myURI)
            .then(res => res.json())
            .then(data => {
                setMovies(data.results || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }

    function truc(e) {
        const val = e.target.value;
        setSearchTerm(val);
        if (val.length > 2) {
            Search(val);
        } else {
            Search_pop();
        }
    }

    function aaa(vote_average) {
        const note = Math.round(vote_average / 2);
        const etoils = '☆'.repeat(5 - note);
        const etoile = '★'.repeat(note);
        const text = ["nul", "pas ouf", "ça va", "bien", "banger"];
        const titre = text[note - 1] || "non noté";
        return <div title={`${titre} note`}>{etoile + etoils + " : " + `${titre}`}</div>;
    }

    return (
        <div id="movie_app_container">
            <h2>C'est la liste des films</h2>
            <input
                type="text"
                placeholder="Search"
                id="search"
                value={searchTerm}
                onChange={truc}
            />

            <ul>
                {movies.map((movie) => (
                    <li>
                        <img
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <div>
                            <h3>{movie.title}</h3>
                            {aaa(movie.vote_average)}
                        </div>
                    </li>
                ))}
            </ul>
            {loading && <p>Chargement ...</p>}
        </div>
    );
}

const domContainer = document.querySelector('#movie_app_container');
ReactDOM.createRoot(domContainer).render(<MovieApp />);
