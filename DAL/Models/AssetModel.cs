using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class AssetModel
    {
        public Asset Asset { get; set; }
        public IEnumerable<AssetCategory> CategoryList { get; set; }
        public IEnumerable<Asset> AssetList { get; set; }
        public IEnumerable<Status> StatusList { get; set; }
        public IEnumerable<Department> DepartmentList { get; set; }
        public IEnumerable<Employee> EmployeeList { get; set; }
    }
}
