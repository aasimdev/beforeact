import instance from "./axiosInstance";

// TODO: Salman Done
const getTenants = async () => {
  return await instance.get("/tenant/get-tenants");
};

// TODO: Salman Done
const getUsers = async (tenantId) => {
  return await instance.get("/tenant/get-users?tenantId=" + tenantId);
};

// TODO: Salman Done
const createTenant = async (name, filterId, website) => {
  return await instance.post("/tenant/create-tenant", {
    name,
    filterId,
    website,
  });
};

const addUserToTenant = async (userName, tenantId) => {
  return await instance.post("/tenant/add-user", {
    userName,
    tenantId,
  });
};

const removeUserFromTenant = async (userId, tenantId) => {
  return await instance.post("/tenant/remove-user", {
    userId,
    tenantId,
  });
};

const tenantApi = {
  getTenants,
  createTenant,
  addUserToTenant,
  removeUserFromTenant,
  getUsers,
};

export default tenantApi;
