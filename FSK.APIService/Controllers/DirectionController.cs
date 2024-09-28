using FSK.Repository;
using FSK.Repository.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace FSK.APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DirectionController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;

        public DirectionController(UnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Direction>>> GetPageDir(int pageIndex = 0, int pageSize = 10)
        {

            BaseResponseModel response = new BaseResponseModel();

            try
            {
                response.Status = true;
                response.Message = "Success";
                var test = await _unitOfWork.DirectionRepository.GetPageAsync(pageIndex, pageSize);
                //response.Data = await _unitOfWork.DirectionRepository.GetPageAsync(pageIndex, pageSize);
                foreach (var direction in test) { 

                direction.Group = await _unitOfWork.DirectionGroupRepository.GetByIdAsync(direction.GroupId);

                }
                response.Data = test;
                return Ok(response);
            }
            catch (Exception err)
            {
                response.Status = false;
                response.Message = err.Message;
                return BadRequest(response);
            }




        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Direction>> GetDir(int id)
        {
            BaseResponseModel response = new BaseResponseModel();

            response.Status = true;
            response.Message = "Success";
            //response.Data = await _unitOfWork.DirectionRepository.GetByIdAsync(id);
            var test = await _unitOfWork.DirectionRepository.GetByIdAsync(id);
            //test.Group = await _unitOfWork.DirectionGroupRepository.GetByIdAsync(test.GroupId);
            var test2 = await _unitOfWork.DirectionGroupRepository.GetByIdAsync(test.GroupId);
            response.Data = test;

            if (response.Data == null)
            {
                response.Status = false;
                response.Message = "User not found";
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpGet("GetShape")]
        public async Task<ActionResult<Element>> GetPondShape(int id)
        {
            BaseResponseModel response = new BaseResponseModel();

            response.Status = true;
            response.Message = "Success";
            
            var element = await _unitOfWork.ElementRepository.GetByIdAsync(id);
            var pond = await _unitOfWork.PondRepository.GetAllAsync();
            var shape = await _unitOfWork.ShapeRepository.GetAllAsync();
            foreach(Shape item in shape)
            {
                item.Ponds = null;
            }
            response.Data = element;


            if (response.Data == null)
            {
                response.Status = false;
                response.Message = "User not found";
                return BadRequest(response);
            }

            return Ok(response);
        }





    }
}
