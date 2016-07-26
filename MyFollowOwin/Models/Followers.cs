using MyFollowOwin.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MyFolllowOwin.Models
{
    public class Followers:CommonProperty
    {
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser Users { get; set; }

        
        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public Products Products { get; set; }

    }
}