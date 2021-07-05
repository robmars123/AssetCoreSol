using Business.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Data
{
    public abstract class BaseContext: DbContext
    {
        public static AssetDataAccess db;

        public BaseContext(AssetDataAccess _db)
        {
            db = new AssetDataAccess();
        }
    }
}
