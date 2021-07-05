using Business;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface IAssetService
    {
        Task<IEnumerable<Asset>> GetAssets();
        Task<int> AddAssetAsync(Asset newAssetModel);
    }
}
