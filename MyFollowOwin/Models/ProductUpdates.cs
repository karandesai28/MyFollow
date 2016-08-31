using MyFollowOwin.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using static MyFolllowOwin.Models.ProductMedia;

namespace MyFolllowOwin.Models
{
    public class ProductUpdates : CommonProperty
    {
        [Required]
        [MaxLength(140)]
        public string Title { get; set; }

        [MaxLength(1000)]
        public string Details { get; set; }

        [Required]
        public Media ProductMedia { get; set; }

        public string Media { get; set; }  

        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public Products Product { get; set; }             

    }
}