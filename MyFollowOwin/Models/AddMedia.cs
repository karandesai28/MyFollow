using MyFolllowOwin.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using static MyFolllowOwin.Models.ProductMedia;

namespace MyFollowOwin.Models
{
    public class AddMedia:CommonProperty
    {
        
        [Required]
        public Media ProductMedia { get; set; }

        [Required]
        public string Path { get; set; }

        public int UpdateId { get; set; }
        [ForeignKey("UpdateId")]
        public ProductUpdates Updates { get; set; }
    }
}