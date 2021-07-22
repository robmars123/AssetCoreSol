using Business.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Data
{
    public abstract class BaseContext: DbContext
    {
        public static DataContext db;

        public BaseContext(DataContext _db)
        {
            db = new DataContext();
        }
    }
}
