import { clientIpify, clientIpinfo, clientIpinfoDetail } from "./client";

const getDataIpinfo = (enpoint) => clientIpinfo.get(enpoint);
const getDataIpinfoDetail = (enpoint) => clientIpinfoDetail.get(enpoint);
const getDataIpify = () => clientIpify.get();


export { getDataIpinfo, getDataIpify, getDataIpinfoDetail };