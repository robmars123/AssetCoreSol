using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DAL.Entities;
using DAL.Interfaces;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AssetCoreSol.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly DataContext _dal;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _dal = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserModel>> Register(RegisterModel _user)
        {
            if (await UserExists(_user.Username))
                return BadRequest("Username already exists.");

            HMACSHA512 hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = _user.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(_user.Password)),
                PasswordSalt = hmac.Key
            };

            _dal.AppUsers.Add(user);
            await _dal.SaveChangesAsync();
            return new UserModel
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserModel>> Login(LoginModel loginUser)
        {
            var user = await _dal.AppUsers.SingleOrDefaultAsync(x => x.UserName == loginUser.Username);

            if (user == null) return Unauthorized();

            var hmac = new HMACSHA512(user.PasswordSalt);

            var computerHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginUser.Password));

            for (int i = 0; i < computerHash.Length; i++)
            {
                if (computerHash[i] != user.PasswordHash[i])
                    return StatusCode(401, "Invalid password.");
            }

               return new UserModel
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string username)
        {
            return await _dal.AppUsers.AnyAsync(x=>x.UserName == username.ToLower());
        }
    }
}