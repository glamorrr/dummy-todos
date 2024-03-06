import axios from "axios";

const fetcher = axios.create({
	baseURL: "https://dummyjson.com/",
});

export { fetcher };
