namespace Business
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class AssetCategory
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int AssetCategoryId { get; set; }

        [Required]
        [StringLength(50)]
        public string AssetCategoryName { get; set; }
    }
}
