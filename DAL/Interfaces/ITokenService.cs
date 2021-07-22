using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
