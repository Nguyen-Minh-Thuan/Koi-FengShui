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
        private AdvertisementRepository _advertisementRepository;
        private PackageRepository _packageRepository;
        private TransactionRepository _transactionRepository;

        public UnitOfWork() => _context ??= new SWP391FengShuiKoiSystemContext();




        public UserRepository UserRepository 
        {
            get { return _userRepository ??= new UserRepository(_context); }
        }

        public AdvertisementRepository AdvertisementRepository
        {
            get { return _advertisementRepository ??= new AdvertisementRepository(_context);}
        }

        public PackageRepository PackageRepository
        {
            get { return _packageRepository ??= new PackageRepository(_context); }
        }

        public TransactionRepository TransactionRepository
        {
            get { return _transactionRepository ??= new TransactionRepository(_context); }
        }

    }
}
