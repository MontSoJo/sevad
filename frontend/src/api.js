const HOST = `http://localhost:8080`

export const login = async ({ valuer_id, password }) => {
  const response = await fetch(`${HOST}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
    },
    body: JSON.stringify({ valuer_id, password }),
  });
  const json = await response.json();
  return json;
}