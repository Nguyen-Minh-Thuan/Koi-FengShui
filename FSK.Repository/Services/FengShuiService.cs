using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSK.Repository.Services
{
    public class FengShuiService
    {
        private static readonly Dictionary<string, int> CanValues = new Dictionary<string, int>
        {
            { "Giap", 1 }, { "Ất", 1 },
            { "Bính", 2 }, { "Đinh", 2 },
            { "Mậu", 3 }, { "Kỷ", 3 },
            { "Canh", 4 }, { "Tân", 4 },
            { "Nhâm", 5 }, { "Quý", 5 }
        };

        private static readonly Dictionary<string, int> ChiValues = new Dictionary<string, int>
        {
            { "Tý", 0 }, { "Sửu", 0 }, { "Ngọ", 0 }, { "Mùi", 0 },
            { "Dần", 1 }, { "Mão", 1 }, { "Than", 1 }, { "Dậu", 1 },
            { "Thìn", 2 }, { "Tỵ", 2 }, { "Tuất", 2 }, { "Hợi", 2 }
        };

        private static readonly Dictionary<int, string> ElementValues = new Dictionary<int, string>
        {
            { 1, "Kim" },
            { 2, "Thủy" },
            { 3, "Hỏa" },
            { 4, "Thổ" },
            { 5, "Mộc" }
        };

        public string CalculateFengShui(string can, string chi)
        {
            if (string.IsNullOrWhiteSpace(can) || string.IsNullOrWhiteSpace(chi))
            {
                throw new ArgumentException("Can or Chi cannot be null or empty.");
            }

            if (!CanValues.ContainsKey(can) || !ChiValues.ContainsKey(chi))
            {
                throw new ArgumentException("Invalid Can or Chi provided.");
            }

            int canValue = CanValues[can];
            int chiValue = ChiValues[chi];

            // Calculate the sum of Can + Chi
            int sum = canValue + chiValue;

            // Normalize the result if it's greater than 5
            if (sum > 5)
            {
                sum -= 5;
            }

            // Determine the Element based on the sum
            string element = ElementValues[sum];

            return $"The element is {element}.";
        }
    }
}
