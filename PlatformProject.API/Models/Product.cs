﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PlatformProject.API.Models
{
    public class Product:ITenant
    {
        public int ID { get; set; }
        public String Name { get; set; }
        public String Category { get; set; }
        public float Price { get; set; }
        public string TenantID { get; set; }

    }
}