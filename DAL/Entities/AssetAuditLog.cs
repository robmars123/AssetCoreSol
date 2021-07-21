namespace DAL.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    public class AssetAuditLog
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int Id {get;set;}
        public int AssetId {get;set;}
        public string LogMessage {get;set;}
        public DateTime? EntryDate {get;set;}
        public string ProcessName { get; set; }
        public int ActivityDoneBy_EmployeeId { get; set; }
    }
}