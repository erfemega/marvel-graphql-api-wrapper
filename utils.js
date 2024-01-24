import axios from "axios";
import crypto from "crypto-js";

const getHash = (ts, key) => {
  const pk = process.env.PRIVATE_KEY;
  return crypto.MD5(`${ts}${pk}${key}`);
  
}

const fetchURI = async (uri) => {
  const ts = Math.random(1, 1000);
  const apikey = process.env.API_KEY;
  const hash = getHash(ts, apikey);
  const url = `http://gateway.marvel.com/${uri}?ts=${ts}&apikey=${apikey}&hash=${hash}`;
  const result = await fetch(url)
  const response = result.json();
  return response;
}

export {
  getHash,
  fetchURI
}