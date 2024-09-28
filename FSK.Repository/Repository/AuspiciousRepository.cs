using FSK.Repository.Base;
using FSK.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSK.Repository.Repository
{
    public class AuspiciousRepository : GenericRepository<Auspiciou>
    {

        public AuspiciousRepository(SWP391FengShuiKoiSystemContext context) => _context = context;

    }
}
