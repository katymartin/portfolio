import { app } from "../services/flamelink";

export const FETCH_POSTS = "fetch_posts";
export const FETCH_POST = "fetch_post";

export function fetchPosts() {
  const request = app.content.get("blogPost", {
    populate: ["featuredImage"]
  });
  return {
    type: FETCH_POSTS,
    payload: request
  };
}

export function fetchPost(id) {
  const request = app.content.get("blogPost", id, {
    populate: ["featuredImage"]
  });
  return {
    type: FETCH_POST,
    payload: request
  };
}
