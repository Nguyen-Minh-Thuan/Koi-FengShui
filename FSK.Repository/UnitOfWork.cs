using FSK.Repository.Models;
using FSK.Repository.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSK.Repository
{
    public class UnitOfWork
    {
        private readonly SWP391FengShuiKoiSystemContext _context;
        private UserRepository _userRepository;

        public UnitOfWork() => _context ??= new SWP391FengShuiKoiSystemContext();


        public UserRepository UserRepository 
        {
            get { return _userRepository ??= new UserRepository(_context); }
        }

    }
}
