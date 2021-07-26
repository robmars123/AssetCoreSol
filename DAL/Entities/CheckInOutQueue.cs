using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Entities
{
    [Table("CheckInOutQueue")]
    public class CheckInOutQueue
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int AssetId { get; set; }
        public DateTime EntryDate { get; set; }
        public int StatusId { get; set; }
        public string CheckedInBy { get; set; }
        public string OperationPerformedBy { get; set; }
        public string Comments { get; set; }
    }
}
