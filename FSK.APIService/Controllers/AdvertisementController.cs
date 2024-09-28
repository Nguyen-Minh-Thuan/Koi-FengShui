using FSK.Repository;
using FSK.Repository.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FSK.APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdvertisementController : ControllerBase
    {

        private readonly UnitOfWork _unitOfWork;
        //private readonly DatabaseContext _Dbcontext;

        public AdvertisementController(UnitOfWork unitOfWork) => _unitOfWork = unitOfWork;
        //public AdvertisementController(DatabaseContext Dbcontext) => _Dbcontext = Dbcontext;


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Advertisement>>> GetPageAds(int pageIndex = 0, int pageSize = 10)
        {

            BaseResponseModel response = new BaseResponseModel();

            try
            {
                response.Status = true;
                response.Message = "Success";
                response.Data = await _unitOfWork.AdvertisementRepository.GetPageAsync(pageIndex, pageSize);
                return Ok(response);
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Message = err.Message;
                return BadRequest(response);
            }




        }









    }
}
