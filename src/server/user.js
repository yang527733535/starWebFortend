import request from '@/utils/request';
// http://localhost:8080/api/auth/me
const BASE_URL = 'http://localhost:8080'
// export async function reqMuenList () {
//   return request('/api/menu/permissions/');
// }




export async function login (params) {
  return request(`${BASE_URL}+'api/auth/me'`, {
    method: 'POST',
    data: params,
  });
}

export async function reqUploadToken (params) {
  return request(`${BASE_URL}/api/auth/createVideo'`, {
    method: 'POST',
    data: params,
  });
}



// reqUploadToken