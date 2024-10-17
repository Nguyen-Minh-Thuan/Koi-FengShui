import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { TextField, MenuItem } from '@mui/material';

const FengshuiPoint = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fishColor: '',
    fishType: '',
    fishDirection: '',
    pondDir: '',
    pondShape: '',
    quantity: '',
  });

  const [pondShapes, setPondShapes] = useState([]);
  const [pondDirs, setPondDirs] = useState([]);
  const [fishVarieties, setFishVarieties] = useState([]);
  const [selectedFishVarieties, setSelectedFishVarieties] = useState([]);
  const [gender, setGender] = useState('');
  const [quantity, setQuantity] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [fishPatterns, setFishPatterns] = useState([]);
  const [selectedPatternList, setSelectedPatternList] = useState([]); // New state for selected pattern list
  const [errors, setErrors] = useState({});

  const toggleFishVariety = (varietyId) => {
    setSelectedFishVarieties(prevSelected => {
      if (prevSelected.some(variety => variety.patternId === varietyId)) {
        return prevSelected.filter(variety => variety.patternId !== varietyId);
      } else {
        return [...prevSelected, { patternId: varietyId }];
      }
    });
  };

  useEffect(() => {
    const fetchPondShapes = async () => {
      try {
        const response = await fetch('https://localhost:7275/api/FengShui/GetPondShape');
        const pondShapeData = await response.json();
        setPondShapes(pondShapeData.data);
      } catch (error) {
        console.error('Error fetching pond shapes:', error);
      }
    };

    const fetchPondDirs = async () => {
      try {
        const response = await fetch('https://localhost:7275/api/FengShui/GetPondDir');
        const pondDirData = await response.json();
        setPondDirs(pondDirData.data);
      } catch (error) {
        console.error('Error fetching pond directions:', error);
      }
    };

    const fetchFishVarieties = async () => {
      try {
        const response = await fetch('https://localhost:7275/api/FengShui/GetKois');
        const fishVarietyData = await response.json();
        setFishVarieties(fishVarietyData.data);
      } catch (error) {
        console.error('Error fetching fish varieties:', error);
      }
    };

    fetchPondShapes();
    fetchPondDirs();
    fetchFishVarieties();
  }, []);

  const handleQuantityChange = (quan) => {
    setQuantity(quan.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleDateChange = (date) => {
    setBirthDate(date);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };
  

  const handleFishVarietyChange = async (selectedOption) => {
    if (selectedOption) {
      const varietyId = selectedOption.value;
      const response = await fetch(`https://localhost:7275/api/FengShui/GetKois`);
      const varietyData = await response.json();
      const selectedVariety = varietyData.data.find(v => v.varietyId === varietyId);

      if (selectedVariety) {
        setFishPatterns(selectedVariety.patterns || []);
      } else {
        setFishPatterns([]);
      }

      setSelectedFishVarieties([{ patternId: varietyId }]);
    } else {
      setFishPatterns([]);
      setSelectedFishVarieties([]);
    }
  };

  const handleAddPattern = () => {
    const selectedPattern = fishPatterns.find(p => p.patternId === formData.fishType);
    if (selectedPattern) {
      setSelectedPatternList(prevList => [
        ...prevList,
        {
          patternId: selectedPattern.patternId, // Ensure patternId is included
          name: selectedPattern.patternName,
          quantity: formData.quantity, // Use quantity from formData
        }
      ]);
      console.log("day la ca da chon",quantity);
    }
  };

  const handleRemovePattern = (index) => {
    setSelectedPatternList(prevList => prevList.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { pondShape, pondDir } = formData;
    const formattedBirthday = birthDate ? `${birthDate.getMonth() + 1}/${birthDate.getDate()}/${birthDate.getFullYear()}` : '';

    // Ensure quantity is a valid number
    const validQuantity = Number.isFinite(formData.quantity) ? formData.quantity : quantity;

    const selectedPatterns = selectedPatternList.map(pattern => ({
        patternId: pattern.patternId,
        quantity: validQuantity // Use valid quantity
    }));
    console.log(selectedPatterns);

    const result = await sendPointingData(formattedBirthday, gender, pondShape, pondDir, selectedPatterns);

    if (result && result.status) {
      navigate('/fengshui/point/result', { state: { koiPoint: result.data.koiPoint, totalPoint: result.data.totalPoint, element: result.data.element, direction: result.data.direction } });
    }
  };

  const apiUrl = 'https://localhost:7275/api/FengShui/Pointing';

  async function sendPointingData(birthday, gender, shapeId, dirId, selectedPatterns) {
    const data = selectedPatterns.map(pattern => ({
        patternId: pattern.patternId,
        quantity: quantity
    }));
    console.log("day ",data);
    const [month, day, year] = birthday.split('/');
    const birthMonth = month;
    const birthDay = day;
    const birthYear = year;

    try {
      const response = await fetch(`${apiUrl}?birthday=${birthMonth}%2F${birthDay}%2F${birthYear}&gender=${gender}&shapeId=${shapeId}&dirId=${dirId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fishColor) newErrors.fishColor = 'Fish color is required';
    if (!formData.fishType) newErrors.fishType = 'Fish type is required';
    if (!formData.fishDirection) newErrors.fishDirection = 'Fish direction is required';
    if (!formData.pondDir) newErrors.pondDir = 'Pond direction is required';
    if (!formData.pondShape) newErrors.pondShape = 'Pond shape is required';
    if (!formData.quantity) newErrors.quantity = 'Quantity is required';
    if (!gender) newErrors.gender = 'Gender is required';
    if (!birthDate) newErrors.birthDate = 'Birth date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-center p-4" style={{ backgroundImage: "url('path/to/your/background-image.jpg')" }}>
      <h1 className="text-4xl font-bold mb-4">TRA CỨU ĐỘ TƯỢNG THÍCH</h1>
      <p className="max-w-2xl mb-8">
        Mỗi con người sinh ra đều có vận mệnh khác nhau. Để chọn lựa được giống cá và hướng
        hồ phù hợp hãy điền thông tin vào bảng dưới đây. Fengshui Koi sẽ giúp bạn giải mã.
        Fengshui Koi sẽ sử dụng ngày sinh theo Dương lịch để tra cứu mệnh cho bạn.
      </p>

      <form onSubmit={handleSubmit} className="bg-white bg-opacity-10 p-8 rounded-lg w-full max-w-2xl">
        {/* Display validation errors */}
        {Object.keys(errors).map((key) => (
          <div key={key} className="text-red-500 mb-2">
            {errors[key]}
          </div>
        ))}

        <div className="mb-4 flex justify-between">
          <div className="w-1/3 pr-2">
            <label htmlFor="fishVariety" className="block text-left mb-2">Loại cá Koi *</label>
            <Select
              id="fishVariety"
              isMulti={false}
              options={fishVarieties.map(variety => ({
                value: variety.varietyId,
                label: variety.varietyName
              }))}
              className={`basic-multi-select ${errors.fishType ? 'border-red-500' : ''}`}
              classNamePrefix="select"
              styles={{
                control: (provided) => ({
                  ...provided,
                  color: 'black',
                }),
                option: (provided, state) => ({
                  ...provided,
                  color: 'black',
                  backgroundColor: state.isFocused ? 'rgba(0, 0, 0, 0.1)' : 'white',
                }),
              }}
              onChange={handleFishVarietyChange}
            />
          </div>

          <div className="w-1/3 px-2">
            <label htmlFor="fishPattern" className="block text-left mb-2">Họa tiết cá Koi *</label>
            <Select
              id="fishPattern"
              isMulti={false}
              options={fishPatterns.map(pattern => ({
                value: pattern.patternId,
                label: pattern.patternName
              }))}
              className={`basic-multi-select ${errors.fishType ? 'border-red-500' : ''}`}
              classNamePrefix="select"
              styles={{
                control: (provided) => ({
                  ...provided,
                  color: 'black',
                }),
                option: (provided, state) => ({
                  ...provided,
                  color: 'black',
                  backgroundColor: state.isFocused ? 'rgba(0, 0, 0, 0.1)' : 'white',
                }),
              }}
              onChange={(selectedOption) => setFormData(prevData => ({
                ...prevData,
                fishType: selectedOption ? selectedOption.value : ''
              }))}
            />
          </div>

          <div className="w-1/3 pl-2">
            <label htmlFor="quantity" className="block text-left mb-2">Số lượng *</label>
            <select
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className={`w-full p-2 rounded bg-white text-black ${errors.quantity ? 'border-red-500' : ''}`}
            >
              <option value="">Chọn số lượng</option>
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className="ml-2 mt-[32px] bg-fuchsia-500 text-white h-[38px] px-4 rounded hover:bg-fuchsia-600 transition-colors flex items-center justify-center"
            onClick={handleAddPattern} // Update button logic
          >
            Thêm
          </button>
        </div>

        <div className="mb-4 flex justify-between">
          <div className="w-1/2 pr-2">
            <label htmlFor="gender" className="block text-left mb-2">Giới tính</label>
            <select
              id="gender"
              value={gender}
              onChange={handleGenderChange}
              className="w-full p-2 rounded bg-white text-black"
              style={{ height: '38px' }}
            >
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>

          <div className="w-1/2 pl-2">
            <label htmlFor="birthDate" className="block text-left mb-2">Ngày sinh</label>
            <TextField
              id="birthDate"
              type="date"
              value={birthDate ? birthDate.toISOString().split('T')[0] : ''}
              onChange={(e) => handleDateChange(new Date(e.target.value))}
              InputProps={{
                style: { backgroundColor: 'white', height: '38px' },
              }}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div className="w-[48%]">
            <label htmlFor="pondDir" className="block text-left mb-2">Hướng hồ</label>
            <select id="pondDir" onChange={handleInputChange} className="w-full p-2 rounded bg-white text-black">
              <option value="">Chọn hướng hồ cá</option>
              {pondDirs.map(dir => (
                <option key={dir.directionId} value={dir.directionId}>{dir.directionName}</option>
              ))}
            </select>
          </div>
          <div className="w-[48%]">
            <label htmlFor="pondShape" className="block text-left mb-2">Hình dáng hồ</label>
            <select id="pondShape" onChange={handleInputChange} className="w-full p-2 rounded bg-white text-black">
              <option value="">Select Value</option>
              {pondShapes.map(shape => (
                <option key={shape.shapeId} value={shape.shapeId}>{shape.shape1}</option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="bg-fuchsia-500 text-white border-none py-3 px-8 rounded-full cursor-pointer text-lg mt-4 hover:bg-fuchsia-600 transition-colors">
          Xem điểm
        </button>
      </form>


    </div>
  );
};

export default FengshuiPoint;
