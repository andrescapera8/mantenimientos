export const authentication = async ({ email, password }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email === 'admin@gmail.com' && password === '1234') {
        return resolve({ status: 200 });
      } else {
        return resolve({ status: 401, message: 'Credenciales incorrectas' });
      }
    }, 2000);
  });
};
