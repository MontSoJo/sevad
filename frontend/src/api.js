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

export const getProceedings = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${HOST}/proceedings`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  const proceedings = await response.json();
  return proceedings;
};

export const getAllPostcodes = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${HOST}/postcodes`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  const postcodes = await response.json();
  return postcodes;
};

export const getValuer = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${HOST}/valuer`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  const valuer = await response.json();
  return valuer;
};
