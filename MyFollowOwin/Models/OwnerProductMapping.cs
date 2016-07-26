using MyFollowOwin.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MyFolllowOwin.Models
{
    public class OwnerProductMapping:CommonProperty
    {
        public int OwnerId { get; set; }
        [ForeignKey("OwnerId")]
        public ProductOwners Owners { get; set; }

        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public Products Products { get; set; }

    }
}