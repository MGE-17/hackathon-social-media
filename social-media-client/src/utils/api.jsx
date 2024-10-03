import axios from "axios";

const base_url = "https://unit-3-project-api-0a5620414506.herokuapp.com/";

export default class brainflixAPI {
  async getKey() {
    let apiKey = sessionStorage.getItem("apiKey");
    if (!apiKey) {
      try {
        const response = await axios.get(
          "https://unit-3-project-api-0a5620414506.herokuapp.com/" + "register"
        );
        sessionStorage.setItem("apiKey", response.data.api_key);

        return response.data.api_key;
      } catch (error) {
        console.error("Error getting api key");
        return;
      }
    }

    return apiKey;
  }

  constructor() {
    this.api_key = this.getKey();
    this.base_url = base_url;
  }

  async getVideos() {
    const response = await axios.get(
      this.base_url + "videos?api_key=" + this.api_key
    );

    return response.data;
  }

  async getVideoDetails(id) {
    const response = await axios.get(
      this.base_url + `videos/${id}?api_key=` + this.api_key
    );

    return response.data;
  }

  async postComment(id, body) {
    const response = await axios.post(
      this.base_url + `videos/${id}/comments?api_key=` + this.api_key,
      body
    );
    return response.data;
  }

  async deleteComment(commentId, videoId) {
    const response = await axios.delete(
      this.base_url +
        `videos/${videoId}/comments/${commentId}?api_key=` +
        this.api_key
    );
    return response.data;
  }
}
