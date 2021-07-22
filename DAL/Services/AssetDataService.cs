using DAL;
using DAL.Data;
using DAL.Entities;
using DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services
{
    public class AssetDataService : BaseContext, IAssetService
    {
        public AssetDataService(DataContext _db) : base(_db)
        {
            
        }  

        public async Task<IEnumerable<Asset>> GetAssets()
        {
            return await db.Assets.ToListAsync();
        }


        public async Task<int> AddAssetAsync(Asset newAssetModel)
        {
            Asset _asset = new Asset()
            {
                AssetCategoryId = newAssetModel.AssetCategoryId,
                DateAcquired = DateTime.Today,
                ComputerName = newAssetModel.ComputerName,
                DepartmentID = newAssetModel.DepartmentID,
                Description = newAssetModel.Description,
                EmployeeId = newAssetModel.EmployeeId,
                Make = newAssetModel.Make,
                ModelNumber = newAssetModel.ModelNumber,
                StatusId = newAssetModel.StatusId
            };

            db.Assets.Add(_asset);
            await db.SaveChangesAsync();
            return _asset.Id;
        }
    }
}
