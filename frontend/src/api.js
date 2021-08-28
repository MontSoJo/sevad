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

export const getAllCases = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${HOST}/cases`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  const caseList = await response.json();
  return caseList
};
