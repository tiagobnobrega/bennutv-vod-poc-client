import axios from 'axios';

const videosApiUrl = 'http://localhost:4000/api/videos';
export const loadVideos = async () => {
  try {
    const res = await axios.get(videosApiUrl);
    return res.data.data;
  } catch (e) {
    return { error: e };
    // if (e.response) return e.response;
    // if (e.request) return e.request;
    // return e;
  }
};
