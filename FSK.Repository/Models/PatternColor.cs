﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace FSK.Repository.Models;

public partial class PatternColor
{
    public int PcolorId { get; set; }

    public int PatternId { get; set; }

    public int ColorId { get; set; }

    public double Values { get; set; }

    public virtual Color Color { get; set; }

    public virtual Pattern Pattern { get; set; }
}