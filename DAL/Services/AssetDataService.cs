using Business.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services
{
    public class AssetDataService : BaseContext
    {

        public List<Asset> GetAssets()
        {
            List<Asset> assets = db.Assets.ToList();

            return assets;
        }
    }
}
