using FSK.Repository.Base;
using FSK.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSK.Repository.Repository
{
    public class ShapeRepository : GenericRepository<Shape>
    {

        public ShapeRepository(SWP391FengShuiKoiSystemContext context) => _context = context;

    }
}
