namespace Business
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class Asset
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        //[DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        [StringLength(50)]
        public string Description { get; set; }

        public int? EmployeeId { get; set; }

        public int? AssetCategoryId { get; set; }

        public int? StatusId { get; set; }

        public int? DepartmentID { get; set; }

        [StringLength(50)]
        public string Make { get; set; }

        [StringLength(15)]
        public string ModelNumber { get; set; }

        [StringLength(50)]
        public string ComputerName { get; set; }

        public DateTime? DateAcquired { get; set; }
    }
}
