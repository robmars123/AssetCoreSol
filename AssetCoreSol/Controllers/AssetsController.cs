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
using DAL.Entities;
using DAL.Models;
using DAL;

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
        public async Task<ActionResult<AssetModel>> Index()
        {
            var assets = await _dal.Assets.ToListAsync();
            AssetModel assetPage = new AssetModel {
                AssetList = assets,
                CategoryList = GetCategoryList(),
                StatusList = GetStatusList(),
                DepartmentList = GetDepartmentList(),
                EmployeeList = GetEmployeeList(),
                AssetAuditLogList = GetLogActivityList()
            };
            return assetPage;
        }

        //Get Category list once every controller call
        private IEnumerable<AssetCategory> GetCategoryList()
        {
           return _dal.AssetCategories.ToList();
        }

        //Get Status list once every controller call
        private IEnumerable<Status> GetStatusList()
        {
            return _dal.Status.ToList();
        }
        //Get department list once every controller call
        private IEnumerable<Department> GetDepartmentList()
        {
            return _dal.Departments.ToList();
        }

        //Get employee list once every controller call
        private IEnumerable<Employee> GetEmployeeList()
        {
            return _dal.Employees.ToList();
        }

        private IEnumerable<AssetAuditLog> GetLogActivityList()
        {
            return _dal.AssetAuditLogs.OrderByDescending(x=>x).ToList();
        }

        //Get single record
        [HttpGet("{id}")]
        [Consumes("application/json")]
        public async Task<ActionResult<AssetModel>> GetAssetById(string id)
        {
            var assetId = Convert.ToInt32(id);
            var asset = await _dal.Assets.FindAsync(assetId);
            AssetModel assetPage = new AssetModel() {
                Asset = asset,
                CategoryList = GetCategoryList(),
                StatusList = GetStatusList(),
                DepartmentList = GetDepartmentList(),
                EmployeeList = GetEmployeeList(),
                AssetAuditLogList = GetLogActivityList()
            };
            return assetPage;
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

                //save the last asset record added in the system to AssetAuditLog
                saveLatestRecordToAuditLog(_asset);




                return  CreatedAtAction(nameof(GetAssetById), new { id = _asset.Id, controller = "assets" }, newAssetModel);
            }
            catch (Exception e)
            {
                _log.LogError($"Error message: { e.Message}");
                throw;
            }
        }

        private void saveLatestRecordToAuditLog(Asset latest)
        {
            var latestAdded = _dal.Assets.Find(latest.Id);
            AssetAuditLog _assetAuditLog = new AssetAuditLog();
            _assetAuditLog.AssetId = latestAdded.Id;
            _assetAuditLog.LogMessage = "Successfully added Asset: " + latestAdded.Id + " " + _assetAuditLog.LogMessage;
            _assetAuditLog.EntryDate = DateTime.Now;
            _assetAuditLog.ProcessName = "Added";
            _dal.AssetAuditLogs.Add(_assetAuditLog);

            _dal.SaveChangesAsync();
        }
        [HttpPut("{id}")]
        [Consumes("application/json")]
        public async Task<IActionResult> EditAsset([FromBody] Asset editedModel)
        {
            try
            {
                string changeLog = "";
                if (editedModel == null)
                {
                    _log.LogError("model parameter passed is null.");
                }
                Asset _asset = _dal.Assets.Find(editedModel.Id);
                AssetAuditLog _assetAuditLog = new AssetAuditLog();
                //assigned the new changes to a found asset record
                    _asset.AssetCategoryId = editedModel.AssetCategoryId;
                    if(_asset.ComputerName.Equals(editedModel.ComputerName))
                            _asset.ComputerName = _asset.ComputerName;
                       else
                       {
                        concatChangeLog(nameof(editedModel.ComputerName), editedModel.ComputerName, _asset.ComputerName, _assetAuditLog);
                        _asset.ComputerName = editedModel.ComputerName;
                       }

                    if (_asset.DepartmentID.Equals(editedModel.DepartmentID))
                        _asset.DepartmentID = _asset.DepartmentID;
                    else
                    {
                    concatChangeLog(nameof(editedModel.DepartmentID), editedModel.DepartmentID.ToString(), _asset.DepartmentID.ToString(), _assetAuditLog);
                    _asset.DepartmentID = editedModel.DepartmentID;

                    }
                    if (_asset.Description.Equals(editedModel.Description))
                        _asset.Description = _asset.Description;
                    else
                    {
                    concatChangeLog(nameof(editedModel.Description), editedModel.Description.ToString(), _asset.Description, _assetAuditLog);
                    _asset.Description = editedModel.Description;

                    }
                    if (_asset.EmployeeId.Equals(editedModel.EmployeeId))
                        _asset.EmployeeId = _asset.EmployeeId;
                    else
                    {
                    concatChangeLog(nameof(editedModel.EmployeeId), editedModel.EmployeeId.ToString(), _asset.EmployeeId.ToString(), _assetAuditLog);
                    _asset.EmployeeId = editedModel.EmployeeId;

                    }
                    if (_asset.Make.Equals(editedModel.Make))
                        _asset.Make = _asset.Make;
                    else
                    {
                    concatChangeLog(nameof(editedModel.Make), editedModel.Make.ToString(), _asset.Make, _assetAuditLog);
                    _asset.Make = editedModel.Make;

                    }
                    if (_asset.ModelNumber.Equals(editedModel.ModelNumber))
                        _asset.ModelNumber = _asset.ModelNumber;
                    else
                    {
                    concatChangeLog(nameof(editedModel.ModelNumber), editedModel.ModelNumber.ToString(), _asset.ModelNumber, _assetAuditLog);
                    _asset.ModelNumber = editedModel.ModelNumber;

                    }
                    if (_asset.StatusId.Equals(editedModel.StatusId))
                        _asset.StatusId = _asset.StatusId;
                    else
                    {
                    concatChangeLog(nameof(editedModel.StatusId), editedModel.StatusId.ToString(), _asset.StatusId.ToString(), _assetAuditLog);
                    _asset.StatusId = editedModel.StatusId;
                    }

                    _asset.DateModified = DateTime.Now;

                _assetAuditLog.AssetId = _asset.Id;
                _assetAuditLog.LogMessage = "Successfully updated Asset: " + _asset.Id + " " + _assetAuditLog.LogMessage;
                _assetAuditLog.EntryDate = DateTime.Now;
                _assetAuditLog.ProcessName = "Modified";

                _dal.AssetAuditLogs.Add(_assetAuditLog);
                await _dal.SaveChangesAsync();
                return CreatedAtAction(nameof(GetAssetById), new { id = _asset.Id, controller = "assets" }, editedModel);
            }
            catch (Exception e)
            {
                _log.LogError($"Error message: { e.Message}");
                throw;
            }
            
            
        }

        private void concatChangeLog(string changedProperty, string changedPropertyValueNew, string changedPropertyValueOld, AssetAuditLog log)
        {
            log.LogMessage = log.LogMessage + changedProperty + ": " + changedPropertyValueOld + " to " + changedPropertyValueNew + ", ";
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

            AssetAuditLog _assetAuditLog = new AssetAuditLog();
            _assetAuditLog.AssetId = asset.Id;
            _assetAuditLog.LogMessage = "Successfully deleted Asset: " + asset.Id + " " + _assetAuditLog.LogMessage;
            _assetAuditLog.EntryDate = DateTime.Today;
            _assetAuditLog.ProcessName = "Removed";
            _dal.AssetAuditLogs.Add(_assetAuditLog);

            _dal.Remove(asset);
            _dal.SaveChangesAsync();
        }
    }
}
