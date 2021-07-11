using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net;
using Business;
using Business.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace AssetCoreSol.Controllers
{
    [EnableCors("CORS")]
    //[Produces(MediaTypeNames.Application.Json)]
    [Route("api/[controller]")]
    [ApiController]
    public class AssetsController : ControllerBase
    {
        private readonly AssetDataAccess _dal;
        readonly ILogger<AssetsController> _log;

        public AssetsController(AssetDataAccess dal)
        {
              _dal = dal;
        }

        // GET api/assets
        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Asset>>> Index()
        {
            var assets = await _dal.Assets.ToListAsync();

            foreach (var asset in assets)
            {
                asset.CategoryList = _dal.AssetCategories.ToList();
            }
             return assets;
        }

        [HttpGet("{id}")]
        [Consumes("application/json")]
        public async Task<ActionResult<Asset>> GetAssetById(string id)
        {
            var assetId = Convert.ToInt32(id);
            var asset = await _dal.Assets.FindAsync(assetId);
            asset.CategoryList = _dal.AssetCategories.ToList();

            return asset;
        }

        
        [HttpPost]
        [Consumes("application/json")]
        public async Task<IActionResult> AddAsset([FromBody] Asset newAssetModel)
        {
            try
            {
                if (newAssetModel == null)
                {
                    _log.LogError("model parameter passed is null.");
                }
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
                _dal.Assets.Add(_asset);
                await _dal.SaveChangesAsync();
                return  CreatedAtAction(nameof(GetAssetById), new { id = _asset.Id, controller = "assets" }, newAssetModel);
            }
            catch (Exception e)
            {
                _log.LogError($"Error message: { e.Message}");
                throw;
            }
        }

        [HttpPut("{id}")]
        [Consumes("application/json")]
        public async Task<IActionResult> EditAsset([FromBody] Asset editedModel)
        {
            try
            {
                if (editedModel == null)
                {
                    _log.LogError("model parameter passed is null.");
                }
                Asset _asset = _dal.Assets.Find(editedModel.Id);

                    _asset.AssetCategoryId = editedModel.AssetCategoryId;
                    _asset.DateAcquired = DateTime.Today;
                    _asset.ComputerName = editedModel.ComputerName;
                    _asset.DepartmentID = editedModel.DepartmentID;
                    _asset.Description = editedModel.Description;
                    _asset.EmployeeId = editedModel.EmployeeId;
                    _asset.Make = editedModel.Make;
                    _asset.ModelNumber = editedModel.ModelNumber;
                    _asset.StatusId = editedModel.StatusId;

                await _dal.SaveChangesAsync();
                return CreatedAtAction(nameof(GetAssetById), new { id = _asset.Id, controller = "assets" }, editedModel);
            }
            catch (Exception e)
            {
                _log.LogError($"Error message: { e.Message}");
                throw;
            }
            
            
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        [Consumes("application/json")]
        public void Delete(int id)
        {
            if (id <= 0)
            _log.LogError("Invalid Id parameter value.");

            Asset asset = _dal.Assets.Find(id);
            if(asset == null)
                _log.LogError("model parameter passed is null.");

           _dal.Remove(asset);
            _dal.SaveChangesAsync();
        }
    }
}
