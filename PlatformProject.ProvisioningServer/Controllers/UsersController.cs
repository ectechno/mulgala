using PlatformProject.Data;
using PlatformProject.DTO;
using PlatformProject.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PlatformProject.ProvisioningServer.Controllers
{
    public class UsersController : ApiController
    {
        private UnitOfWork unitOfWork;
        private IRepository<User> userRepository;
        private IRepository<Tenant> tenantRepository;
        private IRepository<Role> roleRepository;

        protected UsersController()
        {
            unitOfWork = new UnitOfWork();
            userRepository = unitOfWork.GetRepository<User>();
            tenantRepository = unitOfWork.GetRepository<Tenant>();
            roleRepository = unitOfWork.GetRepository<Role>();
        }

        // GET api/users
        public IList<UserDTO> Get()
        {
            IQueryable<User> userList = userRepository.Get();
            return userList.Select(user => new UserDTO
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                LogoUrl = user.LogoUrl,
                Enable = user.Enable,
                Role = user.Role.Name,
                Tenant = user.Tenant.Name,
                UserName=user.UserName,
                Password=user.Password
            }).ToList();
        }

        // GET api/users/5
        public HttpResponseMessage Get(int id)
        {
            User user = userRepository.GetByID(id);

            HttpResponseMessage response;
            if (user == null)
            {
                response = Request.CreateResponse(HttpStatusCode.NotFound);
                return response;
            }

            response = Request.CreateResponse(HttpStatusCode.OK, new UserDTO
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                LogoUrl = user.LogoUrl,
                Enable = user.Enable,
                Role = user.Role.Name,
                Tenant = user.Tenant.Name,
                RoleId=user.RoleId,
                TenantId=user.TenantId,
                UserName=user.UserName,
                Password=user.Password
            });
            return response;
        }

        // POST api/users
        public HttpResponseMessage Post([FromBody]UserUpdateDTO userDTO)
        {
            HttpResponseMessage response;
            if (ModelState.IsValid)
            {
                User user = userRepository.Insert(new User
                {
                    Id = 0,
                    Name = userDTO.Name,
                    UserName = userDTO.UserName,
                    Email = userDTO.Email,
                    Password = userDTO.Password,
                    LogoUrl = userDTO.LogoUrl,
                    Enable = userDTO.Enable,
                    RoleId = userDTO.RoleId,
                    TenantId = userDTO.TenantId,
                    CreatedDateTime = DateTime.Now,
                    UpdatedDateTime = DateTime.Now

                    //, Note: Creator and Updater should be the current logged in user, It will be taken from the token
                    //CreatorId = 0,
                    //UpdaterId = 0
                });
                unitOfWork.Save();

                response = Request.CreateResponse(HttpStatusCode.Created, new UserDTO
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    LogoUrl = user.LogoUrl,
                    Enable = user.Enable,
                    Role = roleRepository.GetByID(user.RoleId).Name,
                    Tenant = tenantRepository.GetByID(user.TenantId).Name
                });
                return response;
            }
            else
            {
                response = Request.CreateResponse(HttpStatusCode.BadRequest);
                return response;
            }
        }

        // PUT api/users/5
        public HttpResponseMessage Put(int id, [FromBody]UserUpdateDTO userDTO)
        {
            HttpResponseMessage response;
            if (ModelState.IsValid)
            {
                User exUser = userRepository.GetByID(id);
                exUser.Name = userDTO.Name;
                exUser.Email = userDTO.Email;
                exUser.LogoUrl = userDTO.LogoUrl;
                exUser.Enable = userDTO.Enable;
                exUser.RoleId = userDTO.RoleId;
                exUser.TenantId = userDTO.TenantId;
                exUser.UpdatedDateTime = DateTime.Now;

                //, Note: Updater should be the current logged in user, It will be taken from the token
                //UpdaterId = 0

                User user = userRepository.Update(exUser);
                unitOfWork.Save();

                response = Request.CreateResponse(HttpStatusCode.OK, new UserDTO
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    LogoUrl = user.LogoUrl,
                    Enable = user.Enable,
                    Role = roleRepository.GetByID(user.RoleId).Name,
                    Tenant = tenantRepository.GetByID(user.TenantId).Name
                });
                return response;
            }
            else
            {
                response = Request.CreateResponse(HttpStatusCode.BadRequest);
                return response;
            }
        }

        // DELETE api/users/5
        public HttpResponseMessage Delete(int id)
        {
            User user = userRepository.GetByID(id);
            HttpResponseMessage response;
            if (user == null)
            {
                response = Request.CreateResponse(HttpStatusCode.NotFound);
                return response;
            }

            userRepository.Delete(id);
            unitOfWork.Save();
            response = Request.CreateResponse(HttpStatusCode.NoContent);
            return response;
        }

        [Route("~/api/tenants/{tenantString}/users/{userName}")]
        public HttpResponseMessage GetTenantUser(string tenantString, string userName) 
        {
            Tenant tenantData;
            User userData;

            tenantData = tenantRepository.Find(tenant => tenant.TenantString == tenantString).FirstOrDefault();
            if (tenantData == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Invalid Tenant String.");
            }
            else
            {
                userData = userRepository.Find(user => user.UserName == userName && user.TenantId == tenantData.Id).FirstOrDefault();
                if (userData == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Invalid User Name.");
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new TenantUserDTO 
                    {
                        TenantString = tenantData.TenantString,
                        TenantName = tenantData.Name,
                        TenantLogoUrl = tenantData.LogoUrl,
                        UserName = userData.Name,
                        UserEmail = userData.Email,
                        UserLogoUrl = userData.LogoUrl,
                        UserRole = roleRepository.Find(role => role.Id == userData.RoleId).FirstOrDefault().Name
                    });
                }
            }
        }

        protected override void Dispose(bool disposing)
        {
            unitOfWork.Dispose();
            base.Dispose(disposing);
        }
    }
}
