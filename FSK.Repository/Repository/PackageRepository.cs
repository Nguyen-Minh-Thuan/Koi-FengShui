using FSK.Repository.Base;
using FSK.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSK.Repository.Repository
{
    public class PackageRepository : GenericRepository<Package>
    {

        public PackageRepository(SWP391FengShuiKoiSystemContext context) => _context = context;

    }
}
