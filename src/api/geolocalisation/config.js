const configEnv = {
  ipinfo: {
    apiBase: import.meta.env.VITE_IPINFO_API_BASE,
    apiToken: import.meta.env.VITE_IPINFO_API_TOKEN,
  },
  ipify: {
    apiBase: import.meta.env.VITE_IPIFY_API_BASE,
  },
  ipinfoDetail: {
    apiBase: import.meta.env.VITE_IP_API_BASE,
  },
};

export default configEnv;
