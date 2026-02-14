const CONFIG = {
  SOCKET_IO_ENDPOINT: import.meta.env.VITE_SOCKET_IO_ENDPOINT as string,
  PROD: import.meta.env.PROD as boolean,
};
export default CONFIG;
