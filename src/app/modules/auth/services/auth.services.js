export const authentication = async ({ email, password }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email === 'admin@gmail.com' && password === '1234') {
        return resolve({ statusResponse: 200 });
      } else {
        return resolve({ statusResponse: 401, message: 'Credenciales incorrectas' });
      }
    }, 2000);
  });
};
