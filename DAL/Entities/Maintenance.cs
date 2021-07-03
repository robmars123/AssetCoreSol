namespace Business
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Maintenance")]
    public partial class Maintenance
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int MaintenanceId { get; set; }

        public int? AssetId { get; set; }

        public DateTime? MaintenanceDate { get; set; }

        [StringLength(150)]
        public string Description { get; set; }

        [StringLength(50)]
        public string MaintenancePerformedBy { get; set; }
    }
}
