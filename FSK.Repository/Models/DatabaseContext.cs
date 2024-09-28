using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSK.Repository.Models
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) { }

        public  DbSet<Advertisement> Advertisements { get; set; }

        public  DbSet<Auspiciou> Auspicious { get; set; }

        public  DbSet<Color> Colors { get; set; }

        public  DbSet<Direction> Directions { get; set; }

        public  DbSet<DirectionGroup> DirectionGroups { get; set; }

        public  DbSet<Element> Elements { get; set; }

        public  DbSet<ElementColor> ElementColors { get; set; }

        public  DbSet<ElementQuantity> ElementQuantities { get; set; }

        public  DbSet<General> Generals { get; set; }

        public  DbSet<Inauspiciou> Inauspicious { get; set; }

        public  DbSet<Kua> Kuas { get; set; }

        public  DbSet<Package> Packages { get; set; }

        public  DbSet<Pattern> Patterns { get; set; }

        public  DbSet<PatternColor> PatternColors { get; set; }

        public  DbSet<Pond> Ponds { get; set; }

        public  DbSet<Shape> Shapes { get; set; }

        public  DbSet<Transaction> Transactions { get; set; }

        public  DbSet<User> Users { get; set; }

        public  DbSet<Variety> Varieties { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

    }
}
