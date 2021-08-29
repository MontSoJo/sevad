const HOST = `http://localhost:8080`;

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
};

export const getAllProceedings = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${HOST}/proceedings`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  const proceedingList = await response.json();
  return proceedingList;
};
