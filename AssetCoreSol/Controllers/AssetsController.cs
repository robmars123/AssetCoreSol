using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
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

        // GET api/values
        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Asset>>> Index()
        {
             return await _dal.Assets.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Asset>> GetAssetById([FromRoute]int id)
        {
           return await _dal.Assets.FindAsync(id);
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
                return CreatedAtAction(nameof(GetAssetById), new { id = _asset.Id, controller = "assets" }, newAssetModel);
            }
            catch (Exception e)
            {
                _log.LogError($"Error message: { e.Message}");
                throw;
            }
            
            
        }



        // GET api/values/5
        //[HttpGet("{id}")]
        //public ActionResult<string> Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/values
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
